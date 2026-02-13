/**
 * Google Apps Script — Dental Clinic Automation
 * 
 * SETUP:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this entire file into Code.gs
 * 4. Deploy > New Deployment > Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL into your .env as VITE_SHEETS_API_URL
 * 
 * TRIGGERS (set up in Apps Script > Triggers):
 * - sendReminders: Time-driven, every hour
 * - processFollowUps: Time-driven, every hour
 */

const SHEET_NAME = 'Appointments';
const CONFIG_SHEET = 'Config';
const TEMPLATES_SHEET = 'Templates';

// ── Web App Entry Points ──

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    
    if (body.action === 'addAppointment') {
      return jsonResponse(addAppointment(body.data));
    }
    
    if (body.action === 'updateStatus') {
      return jsonResponse(updateStatus(body.data));
    }
    
    return jsonResponse({ success: false, error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getAppointments') {
      const date = e.parameter.date || '';
      return jsonResponse({ success: true, data: getAppointments(date) });
    }
    
    return jsonResponse({ success: false, error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// ── CRUD Operations ──

function addAppointment(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  sheet.appendRow([
    data.id,
    data.patientName,
    data.phoneNumber,
    data.appointmentDate,
    data.appointmentTime,
    data.serviceType,
    data.status || 'Booked',
    data.followUpStage || 'None',
    '',  // lastMessageSent
    data.notes || '',
    new Date().toISOString(),
  ]);
  return { success: true, data };
}

function getAppointments(dateFilter) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  let appointments = rows.map(row => ({
    id: row[0],
    patientName: row[1],
    phoneNumber: row[2],
    appointmentDate: row[3],
    appointmentTime: row[4],
    serviceType: row[5],
    status: row[6],
    followUpStage: row[7],
    lastMessageSent: row[8],
    notes: row[9],
    createdAt: row[10],
  }));
  
  if (dateFilter) {
    appointments = appointments.filter(a => a.appointmentDate === dateFilter);
  }
  
  return appointments;
}

function updateStatus(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.id) {
      if (data.status) sheet.getRange(i + 1, 7).setValue(data.status);
      if (data.followUpStage) sheet.getRange(i + 1, 8).setValue(data.followUpStage);
      return { success: true };
    }
  }
  
  return { success: false, error: 'Appointment not found' };
}

// ── Reminder Automation ──

function sendReminders() {
  const config = getConfig();
  if (!config.REMINDER_24HR && !config.REMINDER_2HR) return;
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  const now = new Date();
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][6] !== 'Booked') continue;
    
    const aptDate = new Date(rows[i][3] + ' ' + rows[i][4]);
    const hoursUntil = (aptDate - now) / (1000 * 60 * 60);
    const lastMsg = rows[i][8] ? new Date(rows[i][8]) : null;
    
    // Skip if message sent in last 2 hours (idempotency)
    if (lastMsg && (now - lastMsg) < 2 * 60 * 60 * 1000) continue;
    
    if (config.REMINDER_24HR && hoursUntil > 23 && hoursUntil < 25) {
      sendWhatsApp(rows[i][2], buildMessage('REMINDER_24HR', rows[i]));
      sheet.getRange(i + 1, 9).setValue(now.toISOString());
    }
    
    if (config.REMINDER_2HR && hoursUntil > 1.5 && hoursUntil < 2.5) {
      sendWhatsApp(rows[i][2], buildMessage('REMINDER_2HR', rows[i]));
      sheet.getRange(i + 1, 9).setValue(now.toISOString());
    }
  }
}

// ── Follow-Up Automation ──

function processFollowUps() {
  const config = getConfig();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  const now = new Date();
  
  for (let i = 1; i < rows.length; i++) {
    const status = rows[i][6];
    const followUpStage = rows[i][7];
    const aptDate = new Date(rows[i][3]);
    const daysSince = Math.floor((now - aptDate) / (1000 * 60 * 60 * 24));
    const lastMsg = rows[i][8] ? new Date(rows[i][8]) : null;
    
    // Skip if message sent in last 12 hours (idempotency)
    if (lastMsg && (now - lastMsg) < 12 * 60 * 60 * 1000) continue;
    
    // Visited patients — follow-up sequence
    if (status === 'Visited') {
      if (daysSince >= 1 && daysSince < 3 && followUpStage === 'None' && config.FOLLOWUP_DAY1) {
        sendWhatsApp(rows[i][2], buildMessage('FOLLOWUP_DAY1', rows[i]));
        sheet.getRange(i + 1, 8).setValue('Day-1');
        sheet.getRange(i + 1, 9).setValue(now.toISOString());
      } else if (daysSince >= 3 && daysSince < 7 && followUpStage === 'Day-1' && config.FOLLOWUP_DAY3) {
        sendWhatsApp(rows[i][2], buildMessage('FOLLOWUP_DAY3', rows[i]));
        sheet.getRange(i + 1, 8).setValue('Day-3');
        sheet.getRange(i + 1, 9).setValue(now.toISOString());
      } else if (daysSince >= 7 && followUpStage === 'Day-3' && config.FOLLOWUP_DAY7) {
        sendWhatsApp(rows[i][2], buildMessage('FOLLOWUP_DAY7', rows[i]));
        sheet.getRange(i + 1, 8).setValue('Completed');
        sheet.getRange(i + 1, 9).setValue(now.toISOString());
      }
    }
    
    // No-show — reschedule
    if (status === 'No-Show' && followUpStage === 'None' && config.NOSHOW_RESCHEDULE) {
      sendWhatsApp(rows[i][2], buildMessage('NOSHOW_RESCHEDULE', rows[i]));
      sheet.getRange(i + 1, 8).setValue('Day-1');
      sheet.getRange(i + 1, 9).setValue(now.toISOString());
    }
  }
}

// ── Helpers ──

function getConfig() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG_SHEET);
    const data = sheet.getDataRange().getValues();
    const config = {};
    data.slice(1).forEach(row => {
      config[row[0]] = row[1] === true || row[1] === 'true' || row[1] === 'TRUE';
    });
    return config;
  } catch (e) {
    // Default config if sheet doesn't exist
    return {
      REMINDER_24HR: true, REMINDER_2HR: true,
      FOLLOWUP_DAY1: true, FOLLOWUP_DAY3: true, FOLLOWUP_DAY7: true,
      NOSHOW_RESCHEDULE: true,
    };
  }
}

function buildMessage(templateId, row) {
  const templates = getTemplates();
  let msg = templates[templateId] || '';
  msg = msg.replace(/{name}/g, row[1]);
  msg = msg.replace(/{service}/g, row[5]);
  msg = msg.replace(/{date}/g, row[3]);
  msg = msg.replace(/{time}/g, row[4]);
  msg = msg.replace(/{clinic}/g, getConfigValue('CLINIC_NAME') || 'SmileCare Dental');
  msg = msg.replace(/{phone}/g, getConfigValue('CLINIC_PHONE') || '9110443004');
  return msg;
}

function getTemplates() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TEMPLATES_SHEET);
    const data = sheet.getDataRange().getValues();
    const templates = {};
    data.slice(1).forEach(row => { templates[row[0]] = row[1]; });
    return templates;
  } catch (e) {
    return {};
  }
}

function getConfigValue(key) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG_SHEET);
    const data = sheet.getDataRange().getValues();
    const row = data.find(r => r[0] === key);
    return row ? row[1] : null;
  } catch (e) {
    return null;
  }
}

function sendWhatsApp(phone, message) {
  // In Phase 1, we log the message. 
  // For actual WhatsApp Business API, replace with HTTP request.
  // Example with a WhatsApp API provider:
  // UrlFetchApp.fetch('https://api.whatsapp.provider.com/send', {
  //   method: 'post',
  //   contentType: 'application/json',
  //   payload: JSON.stringify({ phone: '91' + phone, message }),
  // });
  Logger.log('WhatsApp to ' + phone + ': ' + message);
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

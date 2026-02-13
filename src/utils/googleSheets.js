import { CLINIC_INFO } from '../config/constants';

/**
 * Google Sheets API integration via published Google Apps Script Web App.
 *
 * HOW TO SET UP:
 * 1. Create a Google Sheet with the schema (see docs/GOOGLE_SHEETS_SCHEMA.md)
 * 2. Go to Extensions > Apps Script
 * 3. Paste the code from automation/google-apps-script/Code.gs
 * 4. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 5. Copy the Web App URL below
 */

// Replace this with your actual Google Apps Script Web App URL after deployment
const SHEET_API_URL = import.meta.env.VITE_SHEETS_API_URL || '';

/**
 * Append a new appointment row to Google Sheets
 */
export async function addAppointment(appointment) {
  if (!SHEET_API_URL) {
    console.warn('Google Sheets API URL not configured. Saving locally.');
    return saveToLocalStorage(appointment);
  }

  try {
    const response = await fetch(SHEET_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'addAppointment',
        data: {
          id: generateId(),
          patientName: appointment.patientName,
          phoneNumber: appointment.phoneNumber,
          appointmentDate: appointment.appointmentDate,
          appointmentTime: appointment.appointmentTime,
          serviceType: appointment.serviceType,
          status: 'Booked',
          followUpStage: 'None',
          lastMessageSent: '',
          notes: appointment.notes || '',
          createdAt: new Date().toISOString(),
        },
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error adding appointment to Sheets:', error);
    // Fallback to localStorage
    return saveToLocalStorage(appointment);
  }
}

/**
 * Get all appointments (optionally filtered by date)
 */
export async function getAppointments(date = '') {
  if (!SHEET_API_URL) {
    return getFromLocalStorage(date);
  }

  try {
    const url = new URL(SHEET_API_URL);
    url.searchParams.append('action', 'getAppointments');
    if (date) url.searchParams.append('date', date);

    const response = await fetch(url.toString());
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return getFromLocalStorage(date);
  }
}

/**
 * Update appointment status
 */
export async function updateAppointmentStatus(id, status, followUpStage = '') {
  if (!SHEET_API_URL) {
    return updateLocalStorage(id, { status, followUpStage });
  }

  try {
    const response = await fetch(SHEET_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'updateStatus',
        data: { id, status, followUpStage },
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating appointment:', error);
    return updateLocalStorage(id, { status, followUpStage });
  }
}

// ── Local Storage Fallback ──

const STORAGE_KEY = 'dentalclinic_appointments';

function generateId() {
  return 'APT-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
}

function saveToLocalStorage(appointment) {
  const appointments = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const newAppointment = {
    id: generateId(),
    patientName: appointment.patientName,
    phoneNumber: appointment.phoneNumber,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTime,
    serviceType: appointment.serviceType,
    status: 'Booked',
    followUpStage: 'None',
    lastMessageSent: '',
    notes: appointment.notes || '',
    createdAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  return { success: true, data: newAppointment };
}

function getFromLocalStorage(date = '') {
  const appointments = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (!date) return appointments;
  return appointments.filter((a) => a.appointmentDate === date);
}

function updateLocalStorage(id, updates) {
  const appointments = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const index = appointments.findIndex((a) => a.id === id);
  if (index === -1) return { success: false, error: 'Not found' };

  appointments[index] = { ...appointments[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  return { success: true, data: appointments[index] };
}

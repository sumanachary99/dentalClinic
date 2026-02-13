import { CLINIC_INFO } from '../config/constants';
import { fillTemplate } from '../config/messageTemplates';

/**
 * Generate a WhatsApp deep link for sending a message
 * Uses wa.me URL scheme that works on both mobile and desktop
 */
export function generateWhatsAppLink(phone, message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp with a pre-filled message
 */
export function sendWhatsAppMessage(phone, message) {
  const link = generateWhatsAppLink(phone, message);
  window.open(link, '_blank');
}

/**
 * Send booking confirmation via WhatsApp
 */
export function sendBookingConfirmation(appointment) {
  const message = fillTemplate('BOOKING_CONFIRM', {
    name: appointment.patientName,
    clinic: CLINIC_INFO.name,
    date: appointment.appointmentDate,
    time: appointment.appointmentTime,
    service: appointment.serviceType,
    address: CLINIC_INFO.address,
    phone: CLINIC_INFO.phone,
  });

  sendWhatsAppMessage(CLINIC_INFO.whatsappNumber, message);
}

/**
 * Send a follow-up message via WhatsApp
 */
export function sendFollowUpMessage(templateId, appointment) {
  const message = fillTemplate(templateId, {
    name: appointment.patientName,
    clinic: CLINIC_INFO.name,
    service: appointment.serviceType,
    phone: CLINIC_INFO.phone,
    date: appointment.appointmentDate,
    time: appointment.appointmentTime,
  });

  // Generate link for the patient's phone number
  const patientPhone = `91${appointment.phoneNumber}`;
  sendWhatsAppMessage(patientPhone, message);
}

/**
 * Generate WhatsApp link to contact clinic directly (for patients)
 */
export function getClinicWhatsAppLink(message = '') {
  const defaultMsg = message || `Hi! I'd like to book an appointment at ${CLINIC_INFO.name}. 🦷`;
  return generateWhatsAppLink(CLINIC_INFO.whatsappNumber, defaultMsg);
}

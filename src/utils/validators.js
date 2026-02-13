/**
 * Validate phone number (Indian 10-digit)
 */
export function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) return { valid: false, error: 'Phone number must be 10 digits' };
  if (!/^[6-9]/.test(cleaned)) return { valid: false, error: 'Invalid Indian phone number' };
  return { valid: true, cleaned };
}

/**
 * Validate patient name
 */
export function validateName(name) {
  if (!name || name.trim().length < 2) return { valid: false, error: 'Name must be at least 2 characters' };
  if (name.trim().length > 100) return { valid: false, error: 'Name is too long' };
  return { valid: true, cleaned: name.trim() };
}

/**
 * Validate appointment date (not in the past)
 */
export function validateDate(dateStr) {
  if (!dateStr) return { valid: false, error: 'Please select a date' };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(dateStr);
  if (selected < today) return { valid: false, error: 'Cannot book in the past' };
  return { valid: true };
}

/**
 * Validate time slot
 */
export function validateTime(time) {
  if (!time) return { valid: false, error: 'Please select a time slot' };
  return { valid: true };
}

/**
 * Validate service selection
 */
export function validateService(service) {
  if (!service) return { valid: false, error: 'Please select a service' };
  return { valid: true };
}

/**
 * Validate entire booking form
 */
export function validateBookingForm(formData) {
  const errors = {};
  
  const nameResult = validateName(formData.patientName);
  if (!nameResult.valid) errors.patientName = nameResult.error;

  const phoneResult = validatePhone(formData.phoneNumber);
  if (!phoneResult.valid) errors.phoneNumber = phoneResult.error;

  const dateResult = validateDate(formData.appointmentDate);
  if (!dateResult.valid) errors.appointmentDate = dateResult.error;

  const timeResult = validateTime(formData.appointmentTime);
  if (!timeResult.valid) errors.appointmentTime = timeResult.error;

  const serviceResult = validateService(formData.serviceType);
  if (!serviceResult.valid) errors.serviceType = serviceResult.error;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

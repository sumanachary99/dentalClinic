import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICES, TIME_SLOTS } from '../config/services';
import { CLINIC_INFO } from '../config/constants';
import { getNextDays, formatDate } from '../utils/dateUtils';
import { validateBookingForm } from '../utils/validators';
import { addAppointment } from '../utils/googleSheets';
import { sendBookingConfirmation } from '../utils/whatsapp';

const STEPS = ['Service', 'Date & Time', 'Details', 'Confirmation'];

export default function BookAppointmentPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);

  const [formData, setFormData] = useState({
    serviceType: '',
    appointmentDate: '',
    appointmentTime: '',
    patientName: '',
    phoneNumber: '',
    notes: '',
  });

  const dates = getNextDays(14);

  // Pre-select service from URL param
  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      const service = SERVICES.find(s => s.id === serviceId);
      if (service) {
        setFormData(prev => ({ ...prev, serviceType: service.name }));
        setStep(1);
      }
    }
  }, [searchParams]);

  const selectedService = SERVICES.find(s => s.name === formData.serviceType);

  const handleNext = () => {
    if (step === 0 && !formData.serviceType) {
      setErrors({ serviceType: 'Please select a service' });
      return;
    }
    if (step === 1) {
      if (!formData.appointmentDate) return setErrors({ appointmentDate: 'Please select a date' });
      if (!formData.appointmentTime) return setErrors({ appointmentTime: 'Please select a time' });
    }
    if (step === 2) {
      const result = validateBookingForm(formData);
      if (!result.valid) return setErrors(result.errors);
    }
    setErrors({});
    setStep(step + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep(Math.max(0, step - 1));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await addAppointment(formData);
      setBooked(true);
      setStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppConfirm = () => {
    sendBookingConfirmation({
      patientName: formData.patientName,
      phoneNumber: formData.phoneNumber,
      appointmentDate: formatDate(formData.appointmentDate),
      appointmentTime: formData.appointmentTime,
      serviceType: formData.serviceType,
    });
  };

  return (
    <main className="booking-page">
      <div className="container">
        <div className="booking-container">
          {/* Steps indicator */}
          <div className="booking-steps">
            {STEPS.map((label, i) => (
              <div
                key={i}
                className={`booking-step ${i === step ? 'active' : ''} ${i < step ? 'completed' : ''}`}
              >
                <span className="booking-step-number">
                  {i < step ? '✓' : i + 1}
                </span>
                <span className="booking-step-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="booking-card">
            {/* Step 1: Select Service */}
            {step === 0 && (
              <div className="animate-fade-in">
                <h2>Select a Service</h2>
                <p className="subtitle">What treatment do you need?</p>
                {errors.serviceType && <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-md)' }}>{errors.serviceType}</p>}
                <div className="service-selector-grid">
                  {SERVICES.map((service) => (
                    <div
                      key={service.id}
                      className={`service-option ${formData.serviceType === service.name ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, serviceType: service.name })}
                    >
                      <div className="icon">{service.icon}</div>
                      <div className="name">{service.shortName}</div>
                      <div className="price">{service.price}</div>
                    </div>
                  ))}
                </div>
                <div className="booking-actions">
                  <div></div>
                  <button className="btn btn-primary" onClick={handleNext}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2>Pick Date & Time</h2>
                <p className="subtitle">
                  {selectedService ? `${selectedService.icon} ${selectedService.name} — ${selectedService.duration}` : 'Choose your preferred slot'}
                </p>

                {/* Date picker */}
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <label className="form-label">Select Date</label>
                  {errors.appointmentDate && <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)' }}>{errors.appointmentDate}</p>}
                </div>
                <div className="date-picker-scroll">
                  {dates.map((d) => (
                    <div
                      key={d.dateStr}
                      className={`date-option ${formData.appointmentDate === d.dateStr ? 'selected' : ''} ${d.isToday ? 'today' : ''}`}
                      onClick={() => setFormData({ ...formData, appointmentDate: d.dateStr })}
                    >
                      <div className="day-name">{d.isToday ? 'Today' : d.day}</div>
                      <div className="day-num">{d.date}</div>
                      <div className="month">{d.month}</div>
                    </div>
                  ))}
                </div>

                {/* Time slots */}
                <div style={{ marginBottom: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
                  <label className="form-label">Select Time</label>
                  {errors.appointmentTime && <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)' }}>{errors.appointmentTime}</p>}
                </div>
                <div className="time-slots-grid">
                  {TIME_SLOTS.map((time) => (
                    <div
                      key={time}
                      className={`time-slot ${formData.appointmentTime === time ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, appointmentTime: time })}
                    >
                      {time}
                    </div>
                  ))}
                </div>

                <div className="booking-actions">
                  <button className="btn btn-outline" onClick={handleBack}>← Back</button>
                  <button className="btn btn-primary" onClick={handleNext}>Continue →</button>
                </div>
              </div>
            )}

            {/* Step 3: Patient Details */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2>Your Details</h2>
                <p className="subtitle">Please fill in your information to complete the booking.</p>

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  />
                  {errors.patientName && <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>{errors.patientName}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '') })}
                  />
                  {errors.phoneNumber && <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>{errors.phoneNumber}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Notes (optional)</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Any specific concerns or requests?"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <div className="booking-actions">
                  <button className="btn btn-outline" onClick={handleBack}>← Back</button>
                  <button className="btn btn-accent" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? '⏳ Booking...' : '✅ Confirm Booking'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 3 && booked && (
              <div className="confirmation-card animate-fade-in">
                <div className="confirmation-icon">🎉</div>
                <h2>Appointment Booked!</h2>
                <p style={{ color: 'var(--color-gray)', marginBottom: 'var(--space-lg)' }}>
                  Your appointment has been confirmed. We look forward to seeing you!
                </p>

                <div className="confirmation-details">
                  <div className="confirmation-detail-row">
                    <span className="label">Patient</span>
                    <span className="value">{formData.patientName}</span>
                  </div>
                  <div className="confirmation-detail-row">
                    <span className="label">Phone</span>
                    <span className="value">{formData.phoneNumber}</span>
                  </div>
                  <div className="confirmation-detail-row">
                    <span className="label">Service</span>
                    <span className="value">{formData.serviceType}</span>
                  </div>
                  <div className="confirmation-detail-row">
                    <span className="label">Date</span>
                    <span className="value">{formatDate(formData.appointmentDate)}</span>
                  </div>
                  <div className="confirmation-detail-row">
                    <span className="label">Time</span>
                    <span className="value">{formData.appointmentTime}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--space-xl)' }}>
                  <button className="btn btn-primary" onClick={handleWhatsAppConfirm}>
                    💬 Send WhatsApp Confirmation
                  </button>
                  <a href={`tel:${CLINIC_INFO.phone}`} className="btn btn-outline">
                    📞 Call Clinic
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

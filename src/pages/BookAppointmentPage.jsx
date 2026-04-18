import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICES, SERVICE_CATEGORIES, TIME_SLOTS } from '../config/services';
import { getNextDays, formatDate } from '../utils/dateUtils';
import { validateBookingForm } from '../utils/validators';
import { sendBookingConfirmation } from '../utils/whatsapp';
import { addAppointment } from '../utils/googleSheets';

const STEPS = ['Service', 'Date & Time', 'Details'];

export default function BookAppointmentPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [activeCategory, setActiveCategory] = useState('all');

  const dates = getNextDays(14);
  const defaultDate = dates.length > 0 ? dates[0].dateStr : '';

  const [formData, setFormData] = useState({
    serviceType: '',
    appointmentDate: defaultDate,
    appointmentTime: '',
    patientName: '',
    phoneNumber: '',
    notes: '',
  });

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      const service = SERVICES.find((s) => s.id === serviceId);
      if (service && formData.serviceType !== service.name) {
        setFormData((prev) => ({ ...prev, serviceType: service.name }));
        setStep(1);
      }
    }
  }, [searchParams, formData.serviceType]);

  const selectedService = SERVICES.find((s) => s.name === formData.serviceType);

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  const handleNext = () => {
    if (step === 0 && !formData.serviceType) {
      setErrors({ serviceType: 'Please select a service' });
      return;
    }
    if (step === 1) {
      if (!formData.appointmentDate) {
        return setErrors({ appointmentDate: 'Please select a date' });
      }
      if (!formData.appointmentTime) {
        return setErrors({ appointmentTime: 'Please select a time' });
      }
    }
    setErrors({});
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setErrors({});
    setSubmitStatus({ type: '', message: '' });
    setStep(Math.max(0, step - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = validateBookingForm(formData);
    if (!result.valid) return setErrors(result.errors);

    setSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    sendBookingConfirmation({
      patientName: formData.patientName,
      phoneNumber: formData.phoneNumber,
      appointmentDate: formatDate(formData.appointmentDate),
      appointmentTime: formData.appointmentTime,
      serviceType: formData.serviceType,
    });

    try {
      const syncResult = await addAppointment({
        patientName: formData.patientName,
        phoneNumber: formData.phoneNumber,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        serviceType: formData.serviceType,
        notes: formData.notes,
      });

      if (syncResult?.success === false) {
        setSubmitStatus({
          type: 'error',
          message:
            'WhatsApp opened, but dashboard sync failed. Please call the clinic to confirm.',
        });
      } else {
        setSubmitStatus({
          type: 'success',
          message:
            'WhatsApp opened and your request was logged for reception follow-up.',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message:
          'WhatsApp opened, but we could not sync your request. Please call the clinic to confirm.',
      });
    } finally {
      setSubmitting(false);
    }
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
                {errors.serviceType && (
                  <p className="booking-error">{errors.serviceType}</p>
                )}

                {/* Category chips — help narrow down */}
                <div className="booking-category-tabs">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      className={`booking-category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <div className="service-selector-grid">
                  {filteredServices.map((service) => (
                    <button
                      type="button"
                      key={service.id}
                      className={`service-option ${formData.serviceType === service.name ? 'selected' : ''}`}
                      onClick={() =>
                        setFormData({ ...formData, serviceType: service.name })
                      }
                    >
                      <span className="icon">{service.icon}</span>
                      <span className="name">{service.shortName}</span>
                      <span className="duration">📅 {service.duration}</span>
                    </button>
                  ))}
                </div>

                <div className="booking-actions">
                  <button
                    className="btn btn-primary booking-next"
                    onClick={handleNext}
                  >
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
                  {selectedService
                    ? `${selectedService.icon} ${selectedService.name} — ${selectedService.duration}`
                    : 'Choose your preferred slot'}
                </p>

                <div className="booking-field-head">
                  <label className="form-label">Select Date</label>
                  {errors.appointmentDate && (
                    <p className="booking-error-inline">
                      {errors.appointmentDate}
                    </p>
                  )}
                </div>
                <div className="date-picker-grid">
                  {dates.map((d) => {
                    const selected = formData.appointmentDate === d.dateStr;
                    return (
                      <button
                        type="button"
                        key={d.dateStr}
                        className={`date-option ${selected ? 'selected' : ''} ${d.isToday ? 'today' : ''}`}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            appointmentDate: d.dateStr,
                          })
                        }
                      >
                        <span className="day-name">
                          {d.isToday ? 'Today' : d.day}
                        </span>
                        <span className="day-num">{d.date}</span>
                        <span className="month">{d.month}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="booking-field-head booking-field-head--mt">
                  <label className="form-label">Select Time</label>
                  {errors.appointmentTime && (
                    <p className="booking-error-inline">
                      {errors.appointmentTime}
                    </p>
                  )}
                </div>
                <div className="time-slots-grid">
                  {TIME_SLOTS.map((time) => (
                    <button
                      type="button"
                      key={time}
                      className={`time-slot ${formData.appointmentTime === time ? 'selected' : ''}`}
                      onClick={() =>
                        setFormData({ ...formData, appointmentTime: time })
                      }
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <div className="booking-actions booking-actions--stack">
                  <button className="btn btn-primary" onClick={handleNext}>
                    Continue →
                  </button>
                  <button className="btn btn-outline" onClick={handleBack}>
                    ← Back
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Patient Details */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2>Your Details</h2>
                <p className="subtitle">
                  Please fill in your information to connect via WhatsApp.
                </p>
                {submitStatus.message && (
                  <p
                    className={`booking-status ${submitStatus.type === 'success' ? 'success' : 'error'}`}
                  >
                    {submitStatus.message}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="booking-form">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your full name"
                      value={formData.patientName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          patientName: e.target.value,
                        })
                      }
                    />
                    {errors.patientName && (
                      <p className="booking-error-inline">
                        {errors.patientName}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value.replace(/\D/g, ''),
                        })
                      }
                    />
                    {errors.phoneNumber && (
                      <p className="booking-error-inline">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Notes (optional)</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Any specific concerns or requests?"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>

                  <div className="booking-actions booking-actions--stack">
                    <button
                      type="submit"
                      className="btn btn-accent booking-submit"
                      disabled={submitting}
                    >
                      {submitting ? '⏳ Redirecting...' : '💬 Send via WhatsApp'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleBack}
                    >
                      ← Back
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

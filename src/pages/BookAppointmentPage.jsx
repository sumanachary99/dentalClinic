import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICES, TIME_SLOTS } from "../config/services";
import { getNextDays, formatDate } from '../utils/dateUtils';
import { validateBookingForm } from "../utils/validators";
import { sendBookingConfirmation } from '../utils/whatsapp';

const STEPS = ["Service", "Date & Time", "Details"];

export default function BookAppointmentPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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
    const serviceId = searchParams.get("service");
    if (serviceId) {
      const service = SERVICES.find((s) => s.id === serviceId);
      if (service && formData.serviceType !== service.name) {
        setFormData((prev) => ({ ...prev, serviceType: service.name }));
        setStep(1);
      }
    }
  }, [searchParams, formData.serviceType]);

  const selectedService = SERVICES.find(s => s.name === formData.serviceType);

  const handleNext = () => {
    if (step === 0 && !formData.serviceType) {
      setErrors({ serviceType: 'Please select a service' });
      return;
    }
    if (step === 1) {
      if (!formData.appointmentDate)
        return setErrors({ appointmentDate: "Please select a date" });
      if (!formData.appointmentTime)
        return setErrors({ appointmentTime: "Please select a time" });
    }
    setErrors({});
    setStep(step + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep(Math.max(0, step - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateBookingForm(formData);
    if (!result.valid) return setErrors(result.errors);

    setSubmitting(true);
    // Directly go to WhatsApp
    sendBookingConfirmation({
      patientName: formData.patientName,
      phoneNumber: formData.phoneNumber,
      appointmentDate: formatDate(formData.appointmentDate),
      appointmentTime: formData.appointmentTime,
      serviceType: formData.serviceType,
    });
    setSubmitting(false);
  };

  return (
    <main className="booking-page">
      <div className="container">
        <div className="booking-container">
          {/* Steps indicator */}
          <div
            className="booking-steps"
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              paddingBottom: "10px",
            }}
          >
            {STEPS.map((label, i) => (
              <div
                key={i}
                className={`booking-step ${i === step ? "active" : ""} ${i < step ? "completed" : ""}`}
                style={{ flexShrink: 0 }}
              >
                <span className="booking-step-number">
                  {i < step ? "✓" : i + 1}
                </span>
                <span className="booking-step-label">{label}</span>
              </div>
            ))}
          </div>

          <div
            className="booking-card"
            style={{
              padding: "var(--space-2xl)",
              background: "linear-gradient(to bottom right, #ffffff, #f8fafc)",
              border: "1px solid rgba(14, 165, 233, 0.2)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            }}
          >
            {/* Step 1: Select Service */}
            {step === 0 && (
              <div className="animate-fade-in">
                <h2>Select a Service</h2>
                <p className="subtitle">What treatment do you need?</p>
                {errors.serviceType && (
                  <p
                    style={{
                      color: "var(--color-danger)",
                      fontSize: "var(--text-sm)",
                      marginBottom: "var(--space-md)",
                    }}
                  >
                    {errors.serviceType}
                  </p>
                )}
                <div
                  className="service-selector-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: "var(--space-md)",
                  }}
                >
                  {SERVICES.map((service) => (
                    <div
                      key={service.id}
                      className={`service-option ${formData.serviceType === service.name ? "selected" : ""}`}
                      onClick={() =>
                        setFormData({ ...formData, serviceType: service.name })
                      }
                      style={{
                        padding: "var(--space-lg)",
                        textAlign: "center",
                        cursor: "pointer",
                        border: "2px solid transparent",
                        borderRadius: "var(--radius-xl)",
                        background:
                          formData.serviceType === service.name
                            ? "var(--color-primary-50)"
                            : "var(--color-bg)",
                        boxShadow:
                          formData.serviceType === service.name
                            ? "0 0 0 2px var(--color-primary)"
                            : "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        className="icon"
                        style={{
                          fontSize: "2rem",
                          marginBottom: "var(--space-xs)",
                        }}
                      >
                        {service.icon}
                      </div>
                      <div
                        className="name"
                        style={{
                          fontWeight: "700",
                          fontSize: "var(--text-base)",
                          color: "var(--color-dark)",
                        }}
                      >
                        {service.shortName}
                      </div>
                      <div
                        className="price"
                        style={{
                          color: "var(--color-primary)",
                          fontSize: "var(--text-sm)",
                          marginTop: "var(--space-xs)",
                          fontWeight: "600",
                        }}
                      >
                        {service.price}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="booking-actions"
                  style={{
                    marginTop: "var(--space-xl)",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    style={{ width: "100%", maxWidth: "200px" }}
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
                    : "Choose your preferred slot"}
                </p>

                {/* Date picker */}
                <div style={{ marginBottom: "var(--space-md)" }}>
                  <label className="form-label">Select Date</label>
                  {errors.appointmentDate && (
                    <p
                      style={{
                        color: "var(--color-danger)",
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      {errors.appointmentDate}
                    </p>
                  )}
                </div>
                <div
                  className="date-picker-scroll"
                  style={{
                    display: "flex",
                    gap: "var(--space-sm)",
                    overflowX: "auto",
                    paddingBottom: "var(--space-md)",
                    scrollbarWidth: "none",
                  }}
                >
                  {dates.map((d) => (
                    <div
                      key={d.dateStr}
                      className={`date-option ${formData.appointmentDate === d.dateStr ? "selected" : ""} ${d.isToday ? "today" : ""}`}
                      onClick={() =>
                        setFormData({ ...formData, appointmentDate: d.dateStr })
                      }
                      style={{
                        minWidth: "90px",
                        flexShrink: 0,
                        border:
                          formData.appointmentDate === d.dateStr
                            ? "none"
                            : "2px solid var(--color-gray-100)",
                        background:
                          formData.appointmentDate === d.dateStr
                            ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))"
                            : "var(--color-white)",
                        color:
                          formData.appointmentDate === d.dateStr
                            ? "white"
                            : "inherit",
                        borderRadius: "var(--radius-xl)",
                        textAlign: "center",
                        padding: "var(--space-md)",
                        cursor: "pointer",
                        boxShadow:
                          formData.appointmentDate === d.dateStr
                            ? "0 10px 15px -3px rgba(14, 165, 233, 0.3)"
                            : "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        className="day-name"
                        style={{
                          fontSize: "var(--text-xs)",
                          color:
                            formData.appointmentDate === d.dateStr
                              ? "rgba(255,255,255,0.8)"
                              : "var(--color-gray)",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        {d.isToday ? "Today" : d.day}
                      </div>
                      <div
                        className="day-num"
                        style={{
                          fontSize: "var(--text-2xl)",
                          fontWeight: "800",
                          margin: "8px 0",
                          color:
                            formData.appointmentDate === d.dateStr
                              ? "white"
                              : "var(--color-dark)",
                        }}
                      >
                        {d.date}
                      </div>
                      <div
                        className="month"
                        style={{
                          fontSize: "var(--text-xs)",
                          textTransform: "uppercase",
                          fontWeight: "600",
                          color:
                            formData.appointmentDate === d.dateStr
                              ? "rgba(255,255,255,0.8)"
                              : "var(--color-gray)",
                        }}
                      >
                        {d.month}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time slots */}
                <div
                  style={{
                    marginBottom: "var(--space-md)",
                    marginTop: "var(--space-lg)",
                  }}
                >
                  <label className="form-label">Select Time</label>
                  {errors.appointmentTime && (
                    <p
                      style={{
                        color: "var(--color-danger)",
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      {errors.appointmentTime}
                    </p>
                  )}
                </div>
                <div
                  className="time-slots-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                    gap: "var(--space-sm)",
                  }}
                >
                  {TIME_SLOTS.map((time) => (
                    <div
                      key={time}
                      className={`time-slot ${formData.appointmentTime === time ? "selected" : ""}`}
                      onClick={() =>
                        setFormData({ ...formData, appointmentTime: time })
                      }
                      style={{
                        border:
                          formData.appointmentTime === time
                            ? "none"
                            : "2px solid var(--color-gray-100)",
                        background:
                          formData.appointmentTime === time
                            ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))"
                            : "var(--color-white)",
                        color:
                          formData.appointmentTime === time
                            ? "white"
                            : "var(--color-dark)",
                        borderRadius: "var(--radius-lg)",
                        padding: "var(--space-md) var(--space-sm)",
                        textAlign: "center",
                        cursor: "pointer",
                        fontSize: "var(--text-sm)",
                        fontWeight: "600",
                        boxShadow:
                          formData.appointmentTime === time
                            ? "0 8px 15px -3px rgba(14, 165, 233, 0.3)"
                            : "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {time}
                    </div>
                  ))}
                </div>

                <div
                  className="booking-actions"
                  style={{
                    marginTop: "var(--space-xl)",
                    display: "flex",
                    gap: "var(--space-md)",
                    flexDirection: "column",
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    style={{ width: "100%" }}
                  >
                    Continue →
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={handleBack}
                    style={{ width: "100%" }}
                  >
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

                <form onSubmit={handleSubmit}>
                  <div
                    className="form-group"
                    style={{ marginBottom: "var(--space-md)" }}
                  >
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
                      style={{
                        width: "100%",
                        padding: "16px",
                        borderRadius: "var(--radius-lg)",
                        border: "2px solid var(--color-gray-200)",
                        fontSize: "var(--text-base)",
                        transition: "border-color 0.2s",
                      }}
                    />
                    {errors.patientName && (
                      <p
                        style={{
                          color: "var(--color-danger)",
                          fontSize: "var(--text-sm)",
                          marginTop: "4px",
                        }}
                      >
                        {errors.patientName}
                      </p>
                    )}
                  </div>

                  <div
                    className="form-group"
                    style={{ marginBottom: "var(--space-md)" }}
                  >
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
                          phoneNumber: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--color-gray-300)",
                      }}
                    />
                    {errors.phoneNumber && (
                      <p
                        style={{
                          color: "var(--color-danger)",
                          fontSize: "var(--text-sm)",
                          marginTop: "4px",
                        }}
                      >
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div
                    className="form-group"
                    style={{ marginBottom: "var(--space-xl)" }}
                  >
                    <label
                      className="form-label"
                      style={{
                        fontWeight: "600",
                        color: "var(--color-dark)",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      Notes (optional)
                    </label>
                    <textarea
                      className="form-textarea"
                      placeholder="Any specific concerns or requests?"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "16px",
                        borderRadius: "var(--radius-lg)",
                        border: "2px solid var(--color-gray-200)",
                        fontSize: "var(--text-base)",
                        minHeight: "120px",
                        transition: "border-color 0.2s",
                      }}
                    />
                  </div>

                  <div
                    className="booking-actions"
                    style={{
                      display: "flex",
                      gap: "var(--space-md)",
                      flexDirection: "column",
                    }}
                  >
                    <button
                      type="submit"
                      className="btn btn-accent"
                      disabled={submitting}
                      style={{
                        width: "100%",
                        fontSize: "1.2rem",
                        padding: "16px",
                        borderRadius: "var(--radius-lg)",
                        fontWeight: "700",
                        boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
                      }}
                    >
                      {submitting
                        ? "⏳ Redirecting..."
                        : "💬 Send via WhatsApp"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleBack}
                      style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "var(--radius-lg)",
                        fontWeight: "600",
                      }}
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

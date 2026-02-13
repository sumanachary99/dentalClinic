import { useState } from 'react';
import { CLINIC_INFO } from '../config/constants';
import { getClinicWhatsAppLink } from '../utils/whatsapp';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Open WhatsApp with the message
    const whatsappMsg = `Hi! I'm ${formData.name}.\n\n${formData.message}\n\nMy number: ${formData.phone}`;
    window.open(getClinicWhatsAppLink(whatsappMsg), '_blank');
    setSent(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact <span className="gradient-text">Us</span></h1>
          <p>We'd love to hear from you. Reach out for appointments, queries, or feedback.</p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info Cards */}
            <div className="contact-info-cards">
              <div className="contact-info-card">
                <div className="icon">📍</div>
                <div>
                  <h4>Visit Us</h4>
                  <p>{CLINIC_INFO.address}</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="icon">📞</div>
                <div>
                  <h4>Call Us</h4>
                  <p>
                    <a href={`tel:${CLINIC_INFO.phone}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                      {CLINIC_INFO.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="icon">💬</div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>
                    <a href={getClinicWhatsAppLink()} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 600 }}>
                      Message us on WhatsApp
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p>
                    <a href={`mailto:${CLINIC_INFO.email}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                      {CLINIC_INFO.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="icon">🕐</div>
                <div>
                  <h4>Clinic Hours</h4>
                  <p>
                    Mon–Sat: {CLINIC_INFO.timings.weekdays}<br />
                    Sunday: {CLINIC_INFO.timings.sunday}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-card">
              <h3>Send us a Message</h3>
              {sent ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
                  <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>✅</div>
                  <h3>Message Sent!</h3>
                  <p style={{ color: 'var(--color-gray)', marginTop: 'var(--space-sm)' }}>
                    We'll get back to you shortly on WhatsApp.
                  </p>
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: 'var(--space-xl)' }}
                    onClick={() => { setSent(false); setFormData({ name: '', phone: '', message: '' }); }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="10-digit number"
                      maxLength={10}
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-textarea"
                      placeholder="How can we help you?"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-accent" style={{ width: '100%' }}>
                    💬 Send via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{
            background: 'var(--color-gray-100)',
            borderRadius: 'var(--radius-2xl)',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 'var(--space-md)',
            color: 'var(--color-gray)',
            border: '1px solid var(--color-gray-200)',
          }}>
            <span style={{ fontSize: '3rem' }}>🗺️</span>
            <p>Google Maps embed can be added here</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(CLINIC_INFO.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CLINIC_INFO, STATS, TESTIMONIALS, FAQ_DATA } from '../config/constants';
import { SERVICES } from '../config/services';
import { getClinicWhatsAppLink } from '../utils/whatsapp';

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{faq.q}</span>
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-answer">
        <div className="faq-answer-inner">{faq.a}</div>
      </div>
    </div>
  );
}

function StatItem({ stat }) {
  const { count, ref } = useCountUp(stat.value);
  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-value">
        {Number.isInteger(stat.value) ? Math.floor(count) : count.toFixed(1)}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function HomePage() {
  const popularServices = SERVICES.filter(s => s.popular).slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">✨ Trusted by 5000+ patients</div>
              <h1 className="hero-title">
                Your Perfect Smile <br />
                <span className="highlight">Starts Here</span>
              </h1>
              <p className="hero-description">
                Experience world-class dental care with gentle hands and modern technology. 
                From routine check-ups to advanced treatments — we make every visit comfortable.
              </p>
              <div className="hero-buttons">
                <Link to="/book" className="btn btn-accent btn-lg">
                  📅 Book Appointment
                </Link>
                <a href={getClinicWhatsAppLink()} className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                  💬 WhatsApp Us
                </a>
              </div>
              <div className="hero-stats">
                {STATS.slice(0, 3).map((stat, i) => (
                  <div className="hero-stat" key={i}>
                    <div className="hero-stat-value">{stat.value}{stat.suffix}</div>
                    <div className="hero-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-card">
                <div style={{
                  width: '100%',
                  height: '400px',
                  borderRadius: 'var(--radius-xl)',
                  background: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 50%, #a5f3fc 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '8rem',
                }}>
                  😁
                </div>
                <div className="hero-float-card top-right">
                  <div className="icon">⭐</div>
                  <div className="text">
                    <strong>4.8/5 Rating</strong>
                    <span>Google Reviews</span>
                  </div>
                </div>
                <div className="hero-float-card bottom-left">
                  <div className="icon">🏥</div>
                  <div className="text">
                    <strong>Modern Clinic</strong>
                    <span>Latest Equipment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <h2 className="section-title">Our <span className="gradient-text">Services</span></h2>
          <p className="section-subtitle">
            Comprehensive dental care under one roof — from preventive to advanced treatments.
          </p>
          <div className="services-grid">
            {popularServices.map((service) => (
              <div className="service-card" key={service.id}>
                {service.popular && <span className="popular-badge">Popular</span>}
                <div className="service-card-icon">{service.icon}</div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-card-meta">
                  <span className="service-card-price">{service.price}</span>
                  <span className="service-card-duration">🕐 {service.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
            <Link to="/services" className="btn btn-outline">View All Services →</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((stat, i) => (
              <StatItem key={i} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose <span className="gradient-text">{CLINIC_INFO.name}</span></h2>
          <p className="section-subtitle">
            We combine expertise, technology, and compassion for the best dental experience.
          </p>
          <div className="about-features">
            <div className="about-feature card">
              <div className="icon">🛡️</div>
              <h3>Strict Sterilization</h3>
              <p>Multi-step sterilization process following international standards for your complete safety.</p>
            </div>
            <div className="about-feature card">
              <div className="icon">💡</div>
              <h3>Latest Technology</h3>
              <p>Digital X-rays, laser dentistry, and advanced equipment for precise, painless treatments.</p>
            </div>
            <div className="about-feature card">
              <div className="icon">👨‍⚕️</div>
              <h3>Expert Doctors</h3>
              <p>Highly qualified dentists with years of experience in specialized dental procedures.</p>
            </div>
            <div className="about-feature card">
              <div className="icon">💰</div>
              <h3>Affordable Pricing</h3>
              <p>Quality dental care at transparent prices. EMI options available for major treatments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <h2 className="section-title">Patient <span className="gradient-text">Testimonials</span></h2>
          <p className="section-subtitle">
            Don't just take our word for it — hear from our happy patients.
          </p>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div className="testimonial-author-info">
                    <h4>{t.name}</h4>
                    <span>{t.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p className="section-subtitle">Got questions? We've got answers.</p>
          <div className="faq-list">
            {FAQ_DATA.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready for Your Perfect Smile?</h2>
            <p>Book your appointment today and take the first step towards better dental health.</p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/book" className="btn btn-white btn-lg">📅 Book Appointment</Link>
              <a href={`tel:${CLINIC_INFO.phone}`} className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
                📞 Call {CLINIC_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CLINIC_INFO, TESTIMONIALS } from '../config/constants';
import { SERVICES } from '../config/services';
import {
  BRAND_ASSETS,
  CARE_PROTOCOLS,
  CLINIC_GALLERY,
  EXPERIENCE_POINTS,
  SPECIALTY_PILLARS,
  TEAM_MEMBERS,
} from '../config/landingContent';
import { getClinicWhatsAppLink } from '../utils/whatsapp';

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStarted(true);
    }, { threshold: 0.35 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return undefined;

    const startTime = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(target * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration, started, target]);

  return { count, ref };
}

function MetricCard({ item }) {
  const numericValue = Number.parseFloat(item.value.replace(/[^0-9.]/g, ''));
  const { count, ref } = useCountUp(Number.isNaN(numericValue) ? 0 : numericValue);
  const formatted = item.value.includes('/') ? count.toFixed(1) : Math.round(count).toString();

  return (
    <article className="nuface-metric-card" ref={ref}>
      <div className="nuface-metric-value">
        {formatted}
        {item.value.includes('+') ? '+' : item.value.includes('/5') ? '/5' : ''}
      </div>
      <p className="nuface-metric-label">{item.label}</p>
      <p className="nuface-metric-note">{item.note}</p>
    </article>
  );
}

function ProtocolCard({ protocol }) {
  return (
    <article className="nuface-protocol-card">
      <div className="nuface-protocol-header">
        <span className="nuface-protocol-dept">{protocol.department}</span>
        <h3>{protocol.title}</h3>
      </div>

      <div className="nuface-protocol-columns">
        <div>
          <h4>Pre-Procedure</h4>
          <ul>
            {protocol.pre.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Post-Procedure</h4>
          <ul>
            {protocol.post.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="nuface-protocol-caution">{protocol.caution}</p>
      <div className="nuface-protocol-sources">
        {protocol.sources.map((source) => (
          <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
            {source.label}
          </a>
        ))}
      </div>
    </article>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('dental');
  const categoryServices = SERVICES.filter((service) => service.category === activeCategory);

  return (
    <main className="nuface-home">
      <section className="nuface-hero">
        <div className="container">
          <div className="nuface-hero-grid">
            <div className="nuface-hero-copy">
              <p className="nuface-hero-badge">{CLINIC_INFO.shortName}</p>
              <h1>
                Face. Hair. Smile.
                <span> One Clinic, Structured Care.</span>
              </h1>
              <p className="nuface-hero-description">
                {CLINIC_INFO.shortName} brings dental precision, hair restoration planning, and laser skin protocols
                into one coordinated experience with transparent pre and post procedural guidance.
              </p>

              <div className="nuface-hero-actions">
                <Link to="/book" className="btn btn-accent btn-lg">
                  Book Appointment
                </Link>
                <a href={getClinicWhatsAppLink()} className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
                <a href="#pre-post-guides" className="btn btn-primary btn-lg">
                  View Pre/Post Guides
                </a>
              </div>

              <p className="nuface-hero-contact">
                Call us at <a href={`tel:${CLINIC_INFO.phone}`}>{CLINIC_INFO.phone}</a> | Open till 9:00 PM
              </p>

              <div className="nuface-metrics-grid">
                {EXPERIENCE_POINTS.map((item) => (
                  <MetricCard key={item.label} item={item} />
                ))}
              </div>
            </div>

            <div className="nuface-hero-visual">
              <article className="nuface-brand-panel">
                <img src={BRAND_ASSETS.logo} alt="NUFACE clinic mark" />
                <h2>{CLINIC_INFO.shortName}</h2>
                <p>{CLINIC_INFO.slogan || CLINIC_INFO.tagline}</p>
                <div className="nuface-brand-tags">
                  {SPECIALTY_PILLARS.map((pillar) => (
                    <span key={pillar.id}>
                      {pillar.icon} {pillar.title}
                    </span>
                  ))}
                </div>
              </article>
              <article className="nuface-note-card">
                <h3>Before You Book</h3>
                <p>
                  Every major treatment page includes what to do before and after your procedure so patients and
                  families can prepare confidently.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section nuface-specialties">
        <div className="container">
          <h2 className="section-title">
            Multi-Specialty <span className="gradient-text">Clinical Tracks</span>
          </h2>
          <p className="section-subtitle">
            Select the care track that matches your concern. Our team aligns diagnosis, procedure planning, and
            follow-up within one system.
          </p>
          <div className="nuface-specialty-grid">
            {SPECIALTY_PILLARS.map((pillar) => (
              <article className="nuface-specialty-card" key={pillar.id}>
                <div className="nuface-specialty-icon">{pillar.icon}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.subtitle}</p>
                <ul>
                  {pillar.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="nuface-specialty-actions">
                  <a
                    href="#category-treatments"
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveCategory(pillar.id)}
                  >
                    View All {pillar.title}
                  </a>
                  <Link to={`/book?service=${pillar.bookingServiceId}`} className="btn btn-outline btn-sm">
                    Quick Book
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section nuface-services-preview" id="category-treatments">
        <div className="container">
          <h2 className="section-title">
            Category <span className="gradient-text">Treatment Explorer</span>
          </h2>
          <p className="section-subtitle">
            Click a treatment category and see all services for that department instantly.
          </p>
          <div className="nuface-category-tabs">
            {SPECIALTY_PILLARS.map((pillar) => (
              <button
                key={pillar.id}
                className={`nuface-category-tab ${activeCategory === pillar.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(pillar.id)}
                aria-pressed={activeCategory === pillar.id}
              >
                <span>{pillar.icon}</span>
                {pillar.title}
              </button>
            ))}
          </div>
          <div className="nuface-featured-grid">
            {categoryServices.map((service) => (
              <article className="nuface-featured-card" key={service.id}>
                <span className="nuface-featured-icon">{service.icon}</span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="nuface-featured-meta">
                  <span>{service.price}</span>
                  <span>{service.duration}</span>
                </div>
                <Link to={`/book?service=${service.id}`} className="btn btn-primary btn-sm">
                  Book This Service
                </Link>
              </article>
            ))}
          </div>
          <div className="nuface-section-action">
            <Link to="/services" className="btn btn-outline">
              Explore Full Service List
            </Link>
          </div>
        </div>
      </section>

      <section className="section nuface-protocols" id="pre-post-guides">
        <div className="container">
          <h2 className="section-title">
            Pre-Procedure &amp; Post-Procedure <span className="gradient-text">Guidance</span>
          </h2>
          <p className="section-subtitle">
            These are patient-friendly preparation and recovery notes. Final instructions always come from your treating doctor after
            consultation and examination.
          </p>
          <div className="nuface-protocol-grid">
            {CARE_PROTOCOLS.map((protocol) => (
              <ProtocolCard key={protocol.id} protocol={protocol} />
            ))}
          </div>
        </div>
      </section>

      <section className="section nuface-booking-flow">
        <div className="container">
          <h2 className="section-title">
            Smart Appointment <span className="gradient-text">Flow</span>
          </h2>
          <div className="nuface-flow-grid">
            <article>
              <span>01</span>
              <h3>Choose Service & Slot</h3>
              <p>Patients select treatment type, date, and preferred time directly on the booking page.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Submit Details</h3>
              <p>Contact details and notes are captured for clinic team review and scheduling context.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Sync + WhatsApp</h3>
              <p>Request is synced to the appointment log and WhatsApp opens for immediate confirmation with reception.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section nuface-team">
        <div className="container">
          <h2 className="section-title">
            Meet The <span className="gradient-text">Doctors</span>
          </h2>
          <p className="section-subtitle">
            Team cards are ready for your final doctor write-up and photos. Current images are placeholders so we can ship layout now.
          </p>
          <div className="nuface-team-grid">
            {TEAM_MEMBERS.map((member) => (
              <article className="nuface-team-card" key={member.id}>
                <img src={member.image} alt={member.name} />
                <div className="nuface-team-body">
                  <h3>{member.name}</h3>
                  <p className="nuface-team-role">{member.role}</p>
                  <p className="nuface-team-creds">{member.credentials}</p>
                  <ul>
                    {member.expertise.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section nuface-gallery">
        <div className="container">
          <h2 className="section-title">
            Clinic <span className="gradient-text">Look & Feel</span>
          </h2>
          <p className="section-subtitle">Replace these placeholders with your real clinic photos. Live location link opens on Google Maps.</p>
          <div className="nuface-gallery-grid">
            {CLINIC_GALLERY.map((item) => (
              <article className="nuface-gallery-card" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="nuface-gallery-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="nuface-section-action">
            <a href={BRAND_ASSETS.galleryLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Open Google Maps Location
            </a>
          </div>
        </div>
      </section>

      <section className="section nuface-testimonials">
        <div className="container">
          <h2 className="section-title">
            Patient <span className="gradient-text">Stories</span>
          </h2>
          <div className="nuface-testimonial-grid">
            {TESTIMONIALS.map((testimonial) => (
              <article className="nuface-testimonial-card" key={testimonial.id}>
                <div className="nuface-stars">{Array.from({ length: testimonial.rating }).map((_, i) => <span key={i}>★</span>)}</div>
                <p>"{testimonial.text}"</p>
                <h3>{testimonial.name}</h3>
                <span>{testimonial.service}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="nuface-cta">
            <h2>Ready To Plan Your Visit?</h2>
            <p>Book a slot now and our reception team will confirm your treatment pathway and preparation checklist.</p>
            <div className="nuface-cta-actions">
              <Link to="/book" className="btn btn-white btn-lg">
                Book Appointment
              </Link>
              <a href={`tel:${CLINIC_INFO.phone}`} className="btn btn-outline btn-lg">
                Call {CLINIC_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

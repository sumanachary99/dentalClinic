import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CLINIC_INFO } from '../config/constants';
import GoogleReviewsMarquee from '../components/GoogleReviewsMarquee';
import {
  BRAND_ASSETS,
  CLINIC_GALLERY,
  EXPERIENCE_POINTS,
  SPECIALTY_PILLARS,
  TEAM_MEMBERS,
} from '../config/landingContent';
import { CATEGORY_IMAGES } from '../config/cardImages';
import ServiceDetailModal from '../components/ServiceDetailModal';
import { getClinicWhatsAppLink } from '../utils/whatsapp';

function CardArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

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
  // parseFloat stops at the first non-numeric char, so "4.9/5" → 4.9 and "17+" → 17
  const numericValue = Number.parseFloat(item.value);
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

export default function HomePage() {
  const [activeTrack, setActiveTrack] = useState(null);

  const openTrack = (pillar, e) => {
    e.currentTarget.focus();
    setActiveTrack({
      image: CATEGORY_IMAGES[pillar.id],
      icon: pillar.icon,
      title: pillar.title,
      subtitle: pillar.subtitle,
      lead: pillar.lead,
      chips: pillar.points,
      chipsLabel: 'What this track includes',
      bookServiceId: pillar.bookingServiceId,
      category: pillar.id,
    });
  };

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
                {CLINIC_INFO.shortName} brings basic and advanced dentistry, hair
                restoration planning, and laser skin protocols into one
                coordinated experience with transparent pre and post procedural
                guidance.
              </p>

              <div className="nuface-hero-actions">
                <Link to="/services" className="btn btn-accent btn-lg">
                  Book Appointment
                </Link>
                <a
                  href={getClinicWhatsAppLink()}
                  className="btn btn-outline btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <p className="nuface-hero-contact">
                Call us at{" "}
                <a href={`tel:${CLINIC_INFO.phone}`}>{CLINIC_INFO.phone}</a> ·{' '}
                Mon–Sat {CLINIC_INFO.timings.weekdays} · Sundays Closed
              </p>

              <div className="nuface-metrics-grid">
                {EXPERIENCE_POINTS.map((item) => (
                  <MetricCard key={item.label} item={item} />
                ))}
              </div>
            </div>

            <div className="nuface-hero-visual">
              <article className="nuface-brand-panel">
                <img
                  src={BRAND_ASSETS.logo}
                  alt={`${CLINIC_INFO.shortName} clinic mark`}
                  fetchPriority="high"
                />
                <h2>{CLINIC_INFO.shortName}</h2>
                <p>{CLINIC_INFO.slogan || CLINIC_INFO.tagline}</p>
                <div className="nuface-brand-tags">
                  {SPECIALTY_PILLARS.map((pillar) => (
                    <Link key={pillar.id} to={`/services?category=${pillar.id}`} className="nuface-brand-tag-link">
                      {pillar.title}
                    </Link>
                  ))}
                </div>
              </article>
              <article className="nuface-note-card">
                <h3>Before You Book</h3>
                <p>
                  Every major treatment page includes what to do before and
                  after your procedure so patients and families can prepare
                  confidently.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <GoogleReviewsMarquee />

      <section className="section nuface-specialties">
        <div className="container">
          <h2 className="section-title">
            Multi-Specialty{" "}
            <span className="gradient-text">Clinical Tracks</span>
          </h2>
          <p className="section-subtitle">
            Select the care track that matches your concern. Our team aligns
            diagnosis, procedure planning, and follow-up within one system.
          </p>
          <div className="nuface-specialty-grid">
            {SPECIALTY_PILLARS.map((pillar) => (
              <article
                className={`nuface-specialty-card ${pillar.colorClass}`}
                key={pillar.id}
                role="button"
                tabIndex={0}
                aria-label={`${pillar.title} — view details`}
                onClick={(e) => openTrack(pillar, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openTrack(pillar, e);
                  }
                }}
              >
                <div className="nuface-card-media">
                  <img src={CATEGORY_IMAGES[pillar.id]} alt={pillar.title} loading="lazy" />
                  {pillar.popular && <span className="nuface-card-tag">Popular</span>}
                </div>
                <div className="nuface-card-content">
                  <h3>{pillar.title}</h3>
                  <p className="nuface-specialty-sub">{pillar.subtitle}</p>
                  <ul>
                    {pillar.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <span className="nuface-card-cta">
                    View details <CardArrow />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Procedure Spotlight */}
      <section className="section nuface-procedure-spotlight">
        <div className="container">
          <h2 className="section-title">
            Dental Procedures,{' '}
            <span className="gradient-text">Explained Simply</span>
          </h2>
          <p className="section-subtitle">
            Understanding your treatment helps you walk in confident. Here's a
            quick look at three of our most common dental procedures.
          </p>

          <div className="procedure-cards-grid">

            {/* Root Canal */}
            <article className="procedure-card procedure-card--blue">
              <div className="procedure-card-header">
                <span className="procedure-icon">🦷</span>
                <span className="procedure-badge">Tooth Saving</span>
              </div>
              <h3>Root Canal Treatment</h3>
              <p className="procedure-tagline">
                When decay reaches the nerve, a root canal is the hero that
                saves your natural tooth! Root canals <strong>relieve pain</strong>, they don't cause it.
              </p>
              <ol className="procedure-steps">
                <li>
                  <span className="step-num">1</span>
                  <div>
                    <strong>Remove Decay</strong>
                    <p>Infected tissue and decay are carefully cleared from the tooth.</p>
                  </div>
                </li>
                <li>
                  <span className="step-num">2</span>
                  <div>
                    <strong>Seal the Canals</strong>
                    <p>Canals are sealed with a special material to block bacteria. 🛡️</p>
                  </div>
                </li>
                <li>
                  <span className="step-num">3</span>
                  <div>
                    <strong>Full Restoration</strong>
                    <p>A crown is placed to fully restore the tooth's strength. ✨</p>
                  </div>
                </li>
              </ol>
            </article>

            {/* Dental Implants */}
            <article className="procedure-card procedure-card--teal">
              <div className="procedure-card-header">
                <span className="procedure-icon">🔩</span>
                <span className="procedure-badge">Permanent Fix</span>
              </div>
              <h3>Dental Implant Process</h3>
              <p className="procedure-tagline">
                Missing a tooth? A titanium implant acts as a permanent
                artificial root — restoring function and your natural smile.
              </p>
              <ol className="procedure-steps">
                <li>
                  <span className="step-num">1</span>
                  <div>
                    <strong>Tooth Extraction</strong>
                    <p>The damaged or severely fractured tooth is carefully removed.</p>
                  </div>
                </li>
                <li>
                  <span className="step-num">2</span>
                  <div>
                    <strong>Bone Preparation</strong>
                    <p>A precise space is created in the jawbone for the implant.</p>
                  </div>
                </li>
                <li>
                  <span className="step-num">3</span>
                  <div>
                    <strong>Implant Placement</strong>
                    <p>A titanium implant is screwed into the prepared bone.</p>
                  </div>
                </li>
                <li>
                  <span className="step-num">4</span>
                  <div>
                    <strong>Securing the Implant</strong>
                    <p>A torque wrench securely tightens the implant and abutment.</p>
                  </div>
                </li>
                <li>
                  <span className="step-num">5</span>
                  <div>
                    <strong>Crown Placement</strong>
                    <p>A custom crown is attached — restoring full appearance and function.</p>
                  </div>
                </li>
              </ol>
            </article>

            {/* Extractions & Cavity Treatment */}
            <article className="procedure-card procedure-card--orange">
              <div className="procedure-card-header">
                <span className="procedure-icon">🪥</span>
                <span className="procedure-badge">Don't Wait!</span>
              </div>
              <h3>Extractions & Cavity Treatments</h3>
              <p className="procedure-tagline">
                We know you might be avoiding the dentist — but your teeth
                can't hide! Early treatment prevents pain and saves your smile.
              </p>
              <ol className="procedure-steps">
                <li>
                  <span className="step-num">1</span>
                  <div>
                    <strong>Diagnosis</strong>
                    <p>X-rays and examination identify decay and damage severity.</p>
                  </div>
                </li>
                <li>
                  <span className="step-num">2</span>
                  <div>
                    <strong>Cavity Filling</strong>
                    <p>Decay is removed and the tooth is filled to restore shape and function.</p>
                  </div>
                </li>
                <li>
                  <span className="step-num">3</span>
                  <div>
                    <strong>Extraction (if needed)</strong>
                    <p>Severely damaged teeth are gently extracted with minimal discomfort.</p>
                  </div>
                </li>
                <li>
                  <span className="step-num">4</span>
                  <div>
                    <strong>Wound Care</strong>
                    <p>Suturing and aftercare ensure clean, fast healing after extraction.</p>
                  </div>
                </li>
              </ol>
            </article>

          </div>

          <div className="nuface-section-action">
            <Link to="/before-after" className="btn btn-outline">
              See real before &amp; after cases
            </Link>
          </div>
        </div>
      </section>

      <section className="section nuface-team" id="meet-the-team">
        <div className="container">
          <h2 className="section-title">
            Meet The <span className="gradient-text">Doctors</span>
          </h2>
          <p className="section-subtitle">
            Our specialists bring together dental surgery, hair restoration, and
            aesthetic skin care under one roof for coordinated, evidence-based
            care.
          </p>
          <div className="nuface-team-grid">
            {TEAM_MEMBERS.map((member) => (
              <article className="nuface-team-card" key={member.id}>
                <img src={member.image} alt={member.name} loading="lazy" />
                <div className="nuface-team-body">
                  {member.highlight && (
                    <div className="member-highlight-badge">
                      ★ {member.highlight}
                    </div>
                  )}
                  <h3>{member.name}</h3>
                  <p className="nuface-team-role">{member.role}</p>
                  <p className="nuface-team-creds">{member.credentials}</p>
                  {member.description && (
                    <p className="nuface-team-description">{member.description}</p>
                  )}
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

      <section className="section nuface-booking-flow">
        <div className="container">
          <h2 className="section-title">
            Smart Appointment <span className="gradient-text">Flow</span>
          </h2>
          <div className="nuface-flow-grid">
            <article>
              <span>01</span>
              <h3>Choose Service & Slot</h3>
              <p>
                Patients select treatment type, date, and preferred time
                directly on the booking page.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Submit Details</h3>
              <p>
                Contact details and notes are captured for clinic team review
                and scheduling context.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Sync + WhatsApp</h3>
              <p>
                Request is synced to the appointment log and WhatsApp opens for
                immediate confirmation with reception.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section nuface-gallery">
        <div className="container">
          <h2 className="section-title">
            Clinic <span className="gradient-text">Look & Feel</span>
          </h2>
          <p className="section-subtitle">
            A continuous, auto-scrolling view of our space. Hover to pause and read each caption.
          </p>
        </div>

        <div className="nuface-gallery-marquee">
          <div className="nuface-gallery-track">
            {CLINIC_GALLERY.map((item) => (
              <article className="nuface-gallery-card" key={item.id}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="nuface-gallery-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </article>
            ))}
            {/* duplicate copy for a seamless loop — hidden from screen readers */}
            {CLINIC_GALLERY.map((item) => (
              <article className="nuface-gallery-card" key={`${item.id}-dupe`} aria-hidden="true">
                <img src={item.image} alt="" loading="lazy" />
                <div className="nuface-gallery-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="container">
          <p className="nuface-gallery-hint">
            Auto-scrolls continuously · <kbd>hover</kbd> to pause · respects reduced-motion
          </p>
          <div className="nuface-section-action">
            <a
              href={BRAND_ASSETS.galleryLink}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Google Maps Location
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="nuface-cta">
            <h2>Ready To Plan Your Visit?</h2>
            <p>
              Book a slot now and our reception team will confirm your treatment
              pathway and preparation checklist.
            </p>
            <div className="nuface-cta-actions">
              <Link to="/services" className="btn btn-white btn-lg">
                Book Appointment
              </Link>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="btn btn-outline btn-lg"
              >
                Call {CLINIC_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {activeTrack && (
        <ServiceDetailModal item={activeTrack} onClose={() => setActiveTrack(null)} />
      )}
    </main>
  );
}

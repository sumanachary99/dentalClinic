import { Link } from 'react-router-dom';
import { CLINIC_INFO, STATS } from '../config/constants';
import {
  BRAND_ASSETS,
  CONSULTANTS,
  TEAM_MEMBERS,
  CLINIC_GALLERY,
} from '../config/landingContent';

export default function AboutPage() {
  return (
    <main className="nuface-about">
      {/* Hero with clinic storefront */}
      <section className="nuface-about-hero about-hero-visual">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <p className="nuface-badge">Est. 2008 · Hassan</p>
            <h1>
              About <span className="gradient-text">{CLINIC_INFO.shortName}</span>
            </h1>
            <p className="description">
              Precision dentistry, oral & maxillofacial surgery, implantology,
              cosmetic dentistry, hair restoration, and aesthetic skin care —
              delivered with a patient-first philosophy in {CLINIC_INFO.city}.
            </p>
            <div className="about-hero-actions">
              <Link to="/book" className="btn btn-primary">
                Book Appointment
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Visit / Contact Us
              </Link>
            </div>
          </div>
          <figure className="about-hero-photo">
            <img
              src={BRAND_ASSETS.storefront}
              alt={`${CLINIC_INFO.shortName} clinic storefront in Hassan`}
            />
            <figcaption>Sampige Road · K R Puram · Hassan</figcaption>
          </figure>
        </div>
      </section>

      {/* Primary doctors / Owners */}
      <section className="section nuface-about-team">
        <div className="container">
          <h2 className="section-title">
            Meet The <span className="gradient-text">Lead Doctors</span>
          </h2>
          <p className="section-subtitle">
            Founders of Sumukha Nuface — leading every treatment plan personally
            with 18+ years of combined clinical excellence.
          </p>

          <div className="nuface-about-team-grid">
            {TEAM_MEMBERS.map((member) => (
              <article className="nuface-about-member-card" key={member.id}>
                <div className="member-image">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <div className="member-info">
                  <span className="member-creds">{member.credentials}</span>
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  {member.registration && (
                    <p className="member-registration">{member.registration}</p>
                  )}
                  <p className="member-description">{member.description}</p>
                  <div className="member-expertise">
                    <ul>
                      {member.expertise.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Consultants — Brigade-style compact grid */}
      <section className="section nuface-consultants">
        <div className="container">
          <h2 className="section-title">
            Our <span className="gradient-text">Expert Consultants</span>
          </h2>
          <p className="section-subtitle">
            A panel of visiting specialists — from UK-certified aesthetic
            surgeons to senior prosthodontists — extending the clinic's scope
            across every sub-speciality.
          </p>

          <div className="consultants-grid">
            {CONSULTANTS.map((doc) => (
              <article className="consultant-card" key={doc.id}>
                <div className="consultant-avatar">
                  <img src={doc.image} alt={doc.name} loading="lazy" />
                </div>
                <div className="consultant-body">
                  <h3>{doc.name}</h3>
                  <p className="consultant-creds">{doc.credentials}</p>
                  <p className="consultant-role">{doc.role}</p>
                  {doc.subRole && (
                    <p className="consultant-subrole">{doc.subRole}</p>
                  )}
                  <span className="consultant-avail">{doc.availability}</span>
                </div>
                <Link
                  to="/book?service=consultation"
                  className="btn btn-primary btn-sm consultant-book"
                >
                  Book Appointment
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities strip */}
      <section className="nuface-facilities">
        <div className="container">
          <div className="facilities-inner">
            <div className="facility-item">
              <span className="facility-icon">💊</span>
              <div>
                <h4>Pharmacy</h4>
                <p>In-house pharmacy with prescribed medicines ready at checkout.</p>
              </div>
            </div>
            <div className="facility-item">
              <span className="facility-icon">🩻</span>
              <div>
                <h4>Digital X-Ray</h4>
                <p>On-site OPG & IOPA digital radiography for same-visit diagnosis.</p>
              </div>
            </div>
            <div className="facility-item">
              <span className="facility-icon">🧪</span>
              <div>
                <h4>Lab Facilities</h4>
                <p>Diagnostic lab tie-up for pre-op workup and investigative reports.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="section nuface-about-story">
        <div className="container">
          <div className="nuface-story-grid">
            <div className="story-image">
              <img src={CLINIC_GALLERY[0].image} alt="Clinic Interior" />
            </div>
            <div className="story-content">
              <h2 className="section-title">
                Our <span className="gradient-text">Clinical Philosophy</span>
              </h2>
              <p>
                Founded in 2008, {CLINIC_INFO.shortName} was built on the
                intersection of medical precision and aesthetic balance. We
                don't just "treat" — we plan pathways. Every root canal,
                implant, hair transplant, or laser protocol is backed by
                standardized clinical guidelines.
              </p>
              <div className="story-values">
                <div className="value-item">
                  <h3>Clinical Excellence</h3>
                  <p>
                    Adherence to international sterilization and safety
                    protocols across every chair.
                  </p>
                </div>
                <div className="value-item">
                  <h3>Transparent Guidance</h3>
                  <p>
                    Clear pre and post procedure roadmaps for every major
                    treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section nuface-about-gallery">
        <div className="container">
          <h2 className="section-title">
            Facility <span className="gradient-text">Overview</span>
          </h2>
          <div className="nuface-about-gallery-grid">
            {CLINIC_GALLERY.map((item) => (
              <figure key={item.id} className="about-gallery-item">
                <img src={item.image} alt={item.title} />
                <figcaption>
                  <h4>{item.title}</h4>
                  <p>{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="nuface-about-stats">
        <div className="container">
          <div className="about-stats-grid">
            {STATS.map((stat, i) => (
              <div className="stat-card" key={i}>
                <span className="stat-value">
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="nuface-about-cta">
            <h2>Experience Structured Care</h2>
            <p>
              Ready to discuss your treatment pathway? Explore our services and
              book a consultation.
            </p>
            <div className="cta-actions">
              <Link to="/services" className="btn btn-primary btn-lg">
                Explore Services
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

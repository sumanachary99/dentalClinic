import { Link } from 'react-router-dom';
import { CLINIC_INFO, STATS } from '../config/constants';
import { TEAM_MEMBERS, CLINIC_GALLERY } from "../config/landingContent";

export default function AboutPage() {
  return (
    <main className="nuface-about">
      {/* Hero */}
      <section className="nuface-about-hero">
        <div className="container">
          <p className="nuface-badge">Est. 2008</p>
          <h1>
            About <span className="gradient-text">{CLINIC_INFO.name}</span>
          </h1>
          <p className="description">
            Precision dentistry, expert hair restoration, and protocol-led
            skincare delivered with a patient-first philosophy in{" "}
            {CLINIC_INFO.city}.
          </p>
        </div>
      </section>

      {/* Meet the Experts */}
      <section className="section nuface-about-team">
        <div className="container">
          <h2 className="section-title">
            The <span className="gradient-text">Medical Team</span>
          </h2>
          <p className="section-subtitle">
            Led by Board-Certified specialists with over 15 years of clinical
            excellence.
          </p>

          <div className="nuface-about-team-grid">
            {TEAM_MEMBERS.map((member) => (
              <article className="nuface-about-member-card" key={member.id}>
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <span className="member-creds">{member.credentials}</span>
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
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
                Founded in 2008, {CLINIC_INFO.name} was built on the
                intersection of medical precision and aesthetic balance. We
                don't just "treat" — we plan pathways. Every root canal, hair
                transplant, or laser protocol is backed by standardized clinical
                guidelines.
              </p>
              <div className="story-values">
                <div className="value-item">
                  <h3>Clinical Excellence</h3>
                  <p>
                    Adherence to international sterilization and safety
                    protocols.
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

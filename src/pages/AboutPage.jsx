import { Link } from 'react-router-dom';
import { CLINIC_INFO, STATS } from '../config/constants';

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>About <span className="gradient-text">{CLINIC_INFO.name}</span></h1>
          <p>
            We're on a mission to make quality dental care accessible, comfortable, 
            and affordable for every family in {CLINIC_INFO.city}.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="section-title">Our Story</h2>
            <p style={{ color: 'var(--color-gray)', lineHeight: 1.8, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xl)' }}>
              Founded with a vision to transform dental care in India, {CLINIC_INFO.name} brings together 
              experienced dentists, modern technology, and a warm, welcoming environment. We believe that 
              everyone deserves a healthy, beautiful smile — and we're committed to making that happen, 
              one patient at a time.
            </p>
            <p style={{ color: 'var(--color-gray)', lineHeight: 1.8, fontSize: 'var(--text-lg)' }}>
              Our team of specialists covers everything from routine check-ups to advanced treatments 
              like dental implants, orthodontics, and cosmetic dentistry. We use the latest digital tools, 
              painless techniques, and strict sterilization protocols to ensure every visit is safe, 
              comfortable, and effective.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What We <span className="gradient-text">Stand For</span></h2>
          <p className="section-subtitle">Our core values guide every patient interaction</p>
          <div className="about-features">
            <div className="about-feature card">
              <div className="icon">💝</div>
              <h3>Patient First</h3>
              <p>Every decision we make is centered around your comfort, safety, and well-being. Your health is our priority.</p>
            </div>
            <div className="about-feature card">
              <div className="icon">🔬</div>
              <h3>Clinical Excellence</h3>
              <p>Our doctors stay updated with the latest advancements in dentistry and follow evidence-based treatment protocols.</p>
            </div>
            <div className="about-feature card">
              <div className="icon">🤝</div>
              <h3>Transparency</h3>
              <p>No hidden costs, no unnecessary treatments. We explain everything clearly and let you make informed decisions.</p>
            </div>
            <div className="about-feature card">
              <div className="icon">🏠</div>
              <h3>Welcoming Environment</h3>
              <p>Our clinic is designed to feel comfortable and stress-free — especially for children and anxious patients.</p>
            </div>
            <div className="about-feature card">
              <div className="icon">🌱</div>
              <h3>Continuous Improvement</h3>
              <p>We constantly invest in better equipment, training, and processes to deliver the best care possible.</p>
            </div>
            <div className="about-feature card">
              <div className="icon">🌍</div>
              <h3>Community Care</h3>
              <p>We actively participate in dental health awareness camps and provide affordable care to underserved communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((stat, i) => (
              <div className="stat-item" key={i}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}{stat.suffix}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <h2 className="section-title">Our <span className="gradient-text">Technology</span></h2>
          <p className="section-subtitle">Investing in the best equipment for precise and comfortable treatments</p>
          <div className="services-grid">
            {[
              { icon: '📸', name: 'Digital X-Rays', desc: 'Low-radiation digital imaging for accurate diagnosis' },
              { icon: '⚡', name: 'Laser Dentistry', desc: 'Minimally invasive laser treatments for faster healing' },
              { icon: '🦷', name: 'CAD/CAM System', desc: 'Computer-designed crowns and bridges for perfect fit' },
              { icon: '💺', name: 'Ergonomic Chairs', desc: 'Comfortable dental chairs with built-in entertainment' },
              { icon: '🧪', name: 'Autoclave Sterilization', desc: 'Hospital-grade sterilization of all instruments' },
              { icon: '🖥️', name: 'Intraoral Camera', desc: 'See exactly what your dentist sees in real-time' },
            ].map((item, i) => (
              <div className="service-card" key={i}>
                <div className="service-card-icon">{item.icon}</div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Experience the Difference</h2>
            <p>Visit us and see why thousands of patients trust us with their smiles.</p>
            <Link to="/book" className="btn btn-white btn-lg">📅 Book Your Visit</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

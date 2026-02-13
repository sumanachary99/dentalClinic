import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, SERVICE_CATEGORIES } from '../config/services';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <main>
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>Our <span className="gradient-text">Services</span></h1>
          <p>
            Comprehensive dental care solutions for every need — from routine check-ups 
            to advanced cosmetic and restorative treatments.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          {/* Filter */}
          <div className="services-filter">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="services-grid">
            {filteredServices.map((service) => (
              <div className="service-card" key={service.id} style={{ animationDelay: '0.1s' }}>
                {service.popular && <span className="popular-badge">Popular</span>}
                <div className="service-card-icon">{service.icon}</div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-card-meta">
                  <span className="service-card-price">{service.price}</span>
                  <span className="service-card-duration">🕐 {service.duration}</span>
                </div>
                <Link
                  to={`/book?service=${service.id}`}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', marginTop: 'var(--space-lg)' }}
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="empty-state">
              <div className="icon">🔍</div>
              <h3>No services found</h3>
              <p>Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner">
            <h2>Not Sure What You Need?</h2>
            <p>Book a general consultation and our doctors will recommend the best treatment for you.</p>
            <Link to="/book?service=consultation" className="btn btn-white btn-lg">
              📅 Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

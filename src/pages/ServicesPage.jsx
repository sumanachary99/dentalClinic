import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SERVICES, SERVICE_CATEGORIES } from '../config/services';
import { cardImageFor } from '../config/cardImages';
import ServiceDetailModal from '../components/ServiceDetailModal';

function CardArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ServicesPage() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const validCategories = SERVICE_CATEGORIES.map((c) => c.id);
    if (categoryFromUrl && validCategories.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  const categoryName = (id) => SERVICE_CATEGORIES.find((c) => c.id === id)?.name;

  const openService = (service, e) => {
    e.currentTarget.focus();
    setActiveService({
      image: cardImageFor(service.category),
      icon: service.icon,
      title: service.name,
      subtitle: categoryName(service.category),
      lead: service.description,
      chips: [`🕐 ${service.duration}`],
      chipsLabel: 'Typical duration',
      bookServiceId: service.id,
      category: service.category,
    });
  };

  return (
    <main>
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>Our <span className="gradient-text">Services</span></h1>
          <p>
            Dental, oral & maxillofacial surgery, implants, cosmetic dentistry,
            hair restoration, and aesthetic skin care — all under one roof.
            Choose a category to see sub-types and book.
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
              <article
                className="service-card"
                key={service.id}
                role="button"
                tabIndex={0}
                aria-label={`${service.name} — view details`}
                onClick={(e) => openService(service, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openService(service, e);
                  }
                }}
              >
                <div className="nuface-card-media">
                  <img src={cardImageFor(service.category)} alt={service.name} loading="lazy" />
                  {service.popular && <span className="nuface-card-tag">Popular</span>}
                </div>
                <div className="nuface-card-content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-card-meta">
                    <span className="service-card-duration">🕐 {service.duration}</span>
                    <span className="nuface-card-cta">
                      View details <CardArrow />
                    </span>
                  </div>
                </div>
              </article>
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

      {activeService && (
        <ServiceDetailModal item={activeService} onClose={() => setActiveService(null)} />
      )}
    </main>
  );
}

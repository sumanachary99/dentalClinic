import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CLINIC_INFO } from '../../config/constants';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="header-logo">
            <span className="header-logo-icon">🦷</span>
            <div className="header-logo-text">
              <h1>{CLINIC_INFO.name}</h1>
              <span>{CLINIC_INFO.tagline}</span>
            </div>
          </Link>

          <nav className="header-nav">
            <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
            <Link to="/services" className={isActive('/services') ? 'active' : ''}>Services</Link>
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
          </nav>

          <div className="header-actions">
            <a href={`tel:${CLINIC_INFO.phone}`} className="header-phone">
              📞 {CLINIC_INFO.phone}
            </a>
            <Link to="/book" className="btn btn-accent btn-sm">Book Appointment</Link>
          </div>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
        <Link to="/services" className={isActive('/services') ? 'active' : ''}>Services</Link>
        <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
        <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
        <Link to="/book" className="btn btn-accent" style={{ marginTop: '1.5rem' }}>
          Book Appointment
        </Link>
        <a href={`tel:${CLINIC_INFO.phone}`} style={{ marginTop: '0.5rem', textAlign: 'center', color: 'var(--color-primary)' }}>
          📞 {CLINIC_INFO.phone}
        </a>
      </div>
    </>
  );
}

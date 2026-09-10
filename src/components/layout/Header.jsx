import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CLINIC_INFO } from '../../config/constants';
import nufaceLogo from "../../assets/logo.webp";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/before-after", label: "Before & After" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <Link to="/" className="header-logo" onClick={closeMenu}>
            <img
              src={nufaceLogo}
              alt={CLINIC_INFO.shortName || CLINIC_INFO.name}
              className="header-logo-icon"
            />
            <div className="header-logo-text">
              <h1>{CLINIC_INFO.shortName || CLINIC_INFO.name}</h1>
              <span>{CLINIC_INFO.tagline}</span>
            </div>
          </Link>

          <nav className="header-nav">
            <Link
              to="/"
              className={isActive("/") ? "active" : ""}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={isActive("/services") ? "active" : ""}
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link
              to="/before-after"
              className={isActive("/before-after") ? "active" : ""}
              onClick={closeMenu}
            >
              Before &amp; After
            </Link>
            <Link
              to="/about"
              className={isActive("/about") ? "active" : ""}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={isActive("/contact") ? "active" : ""}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </nav>

          <div className="header-actions">
            <a href={`tel:${CLINIC_INFO.phone}`} className="header-phone">
              📞 {CLINIC_INFO.phone}
            </a>
            <Link
              to="/book"
              className="btn btn-accent btn-sm header-book-desktop"
              onClick={closeMenu}
            >
              Book Appointment
            </Link>
          </div>

          <Link
            to="/book"
            className="header-book-mobile"
            onClick={closeMenu}
            aria-label="Book appointment"
          >
            Book
          </Link>

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
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
        className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}
        onClick={closeMenu}
      />

      {/* Mobile menu */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-head">
          <img src={nufaceLogo} alt="" className="mobile-menu-logo" />
          <div className="mobile-menu-brand">
            <strong>{CLINIC_INFO.shortName}</strong>
            <span>{CLINIC_INFO.tagline}</span>
          </div>
          <button
            type="button"
            className="mobile-menu-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="mobile-menu-links">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={isActive(to) ? "active" : ""}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-actions">
          <Link to="/book" className="btn btn-accent" onClick={closeMenu}>
            Book Appointment
          </Link>
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="btn btn-outline"
            onClick={closeMenu}
          >
            📞 {CLINIC_INFO.phone}
          </a>
        </div>

        <p className="mobile-menu-hours">
          {CLINIC_INFO.timings.display}
          <span>{CLINIC_INFO.timings.note}</span>
        </p>
      </div>
    </>
  );
}

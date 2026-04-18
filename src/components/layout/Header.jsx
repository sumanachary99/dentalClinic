import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CLINIC_INFO } from '../../config/constants';
import nufaceLogo from "../../assets/logo.jpg";

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
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
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
        <Link
          to="/book"
          className="btn btn-accent"
          style={{ marginTop: "1.5rem" }}
          onClick={closeMenu}
        >
          Book Appointment
        </Link>
        <a
          href={`tel:${CLINIC_INFO.phone}`}
          style={{
            marginTop: "0.5rem",
            textAlign: "center",
            color: "var(--color-primary)",
          }}
          onClick={closeMenu}
        >
          📞 {CLINIC_INFO.phone}
        </a>
      </div>
    </>
  );
}

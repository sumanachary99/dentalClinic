import { Link } from 'react-router-dom';
import { CLINIC_INFO } from '../../config/constants';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>🦷 {CLINIC_INFO.shortName || CLINIC_INFO.name}</h3>
            <p>
              Integrated care across dental treatment, skincare and laser procedures, hair restoration,
              and cosmetic planning with clear patient guidance.
            </p>
            <div className="footer-social">
              <a href={CLINIC_INFO.socialLinks.instagram} aria-label="Instagram">📸</a>
              <a href={CLINIC_INFO.socialLinks.facebook} aria-label="Facebook">👥</a>
              <a href={CLINIC_INFO.socialLinks.youtube} aria-label="YouTube">🎥</a>
              <a href={CLINIC_INFO.socialLinks.google} aria-label="Google">🔍</a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/book">Book Appointment</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Dental Treatment</Link></li>
              <li><Link to="/services">Skincare & Laser</Link></li>
              <li><Link to="/services">Acne & Pigmentation Care</Link></li>
              <li><Link to="/services">Hair Transplant</Link></li>
              <li><Link to="/services">PRP Hair Therapy</Link></li>
              <li><Link to="/services">Cosmetic Consultation</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <span>📍</span>
              <span>{CLINIC_INFO.address}</span>
            </div>
            <div className="footer-contact-item">
              <span>📞</span>
              <span><a href={`tel:${CLINIC_INFO.phone}`} style={{color: 'var(--color-gray-light)'}}>{CLINIC_INFO.phone}</a></span>
            </div>
            <div className="footer-contact-item">
              <span>✉️</span>
              <span><a href={`mailto:${CLINIC_INFO.email}`} style={{color: 'var(--color-gray-light)'}}>{CLINIC_INFO.email}</a></span>
            </div>
            <div className="footer-contact-item">
              <span>🕐</span>
              <span>Mon-Sat: {CLINIC_INFO.timings.weekdays}<br/>Sun: {CLINIC_INFO.timings.sunday}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {CLINIC_INFO.shortName || CLINIC_INFO.name}. All rights reserved.</span>
          <span>Made with ❤️ for healthier smiles</span>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { CLINIC_INFO } from '../../config/constants';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>🦷 {CLINIC_INFO.name}</h3>
            <p>
              Your trusted dental care partner. We provide world-class dental treatments 
              with a gentle touch, modern technology, and a commitment to your beautiful smile.
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
              <li><Link to="/services">Dental Consultation</Link></li>
              <li><Link to="/services">Teeth Cleaning</Link></li>
              <li><Link to="/services">Root Canal (RCT)</Link></li>
              <li><Link to="/services">Dental Implants</Link></li>
              <li><Link to="/services">Braces & Aligners</Link></li>
              <li><Link to="/services">Teeth Whitening</Link></li>
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
          <span>© {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</span>
          <span>Made with ❤️ for healthier smiles</span>
        </div>
      </div>
    </footer>
  );
}

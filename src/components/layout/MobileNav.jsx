import { Link, useLocation } from 'react-router-dom';

export default function MobileNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-bottom-nav-inner">
        <Link to="/" className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}>
          <span className="nav-icon">🏠</span>
          <span>Home</span>
        </Link>
        <Link to="/services" className={`mobile-nav-item ${isActive('/services') ? 'active' : ''}`}>
          <span className="nav-icon">🦷</span>
          <span>Services</span>
        </Link>
        <Link to="/book" className={`mobile-nav-item ${isActive('/book') ? 'active' : ''}`}>
          <span className="nav-icon">📅</span>
          <span>Book</span>
        </Link>
        <Link to="/contact" className={`mobile-nav-item ${isActive('/contact') ? 'active' : ''}`}>
          <span className="nav-icon">📞</span>
          <span>Contact</span>
        </Link>
        <Link to="/dashboard" className={`mobile-nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </Link>
      </div>
    </nav>
  );
}

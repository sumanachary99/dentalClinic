import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

/**
 * Accessible detail dialog opened when a service / specialty card is clicked.
 *
 * `item` is a normalized shape built by the page:
 *   { image, icon, title, subtitle, lead, chips: string[], chipsLabel, bookServiceId, category }
 */
export default function ServiceDetailModal({ item, onClose }) {
  const closeRef = useRef(null);
  const modalRef = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const raf = requestAnimationFrame(() => setShown(true)); // trigger enter transition
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  if (!item) return null;

  const {
    image,
    icon,
    title,
    subtitle,
    lead,
    chips = [],
    chipsLabel = 'What this includes',
    bookServiceId,
    category,
  } = item;

  return createPortal(
    <div
      className={`sdm-backdrop ${shown ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sdm-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sdm-modal" ref={modalRef}>
        <div className="sdm-head">
          {image && (
            <div className="sdm-head-media">
              <img src={image} alt="" aria-hidden="true" />
            </div>
          )}
          <button className="sdm-close" ref={closeRef} aria-label="Close" onClick={onClose}>
            &times;
          </button>
          <div className="sdm-head-text">
            {icon && <span className="sdm-icon" aria-hidden="true">{icon}</span>}
            <h2 id="sdm-title">{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>

        <div className="sdm-body">
          {lead && <p className="sdm-lead">{lead}</p>}
          {chips.length > 0 && (
            <>
              <h4>{chipsLabel}</h4>
              <div className="sdm-chips">
                {chips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </>
          )}
          <div className="sdm-actions">
            <Link
              to={`/book?service=${bookServiceId}`}
              className="btn btn-accent sdm-btn"
              onClick={onClose}
            >
              📅 Book Now
            </Link>
            {category && (
              <Link
                to={`/services?category=${category}`}
                className="btn btn-outline sdm-btn"
                onClick={onClose}
              >
                View all services
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

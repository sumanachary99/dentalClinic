import { useEffect, useRef, useState } from 'react';
import '../styles/google-reviews.css';
import {
  GOOGLE_RATING,
  MARQUEE_REVIEWS,
  REVIEW_TRAVEL_CITIES,
} from '../config/googleReviews';

/**
 * "Top-rated on Google" — a rating panel on the left, with a single row of
 * review cards drifting past it on the right that the reader can also scroll
 * by hand.
 *
 * Data comes straight from src/config/googleReviews.js; takes no props.
 * Renders nothing when there are no reviews.
 */

const STAR_PATH =
  'M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.31l-5.8 3.05 1.1-6.46-4.69-4.58 6.48-.94L12 2.5z';

/* One <svg> holds all five stars: a 24-unit glyph box plus a 3-unit gutter.
   Total viewBox is 132×24, so the rendered width is always height × 5.5. */
const STAR_PITCH = 27;
const STAR_VIEWBOX = '0 0 132 24';
const STAR_OFFSETS = [0, 1, 2, 3, 4].map((i) => i * STAR_PITCH);

/* Seconds for one full pass of the row. Ten reviewers rendered twice = 20
   cards; the duplicate half is what makes the wrap invisible, so it cannot be
   dropped. 97s is unhurried enough to read a review as it goes by. */
const ROW_LOOP_SECONDS = 97;

/* Without an observer we can never learn that the rows are on-screen, so
   they must start running rather than start paused. */
const HAS_OBSERVER = typeof IntersectionObserver === 'function';

/* One node per star instead of one <svg> per star: a card carries 6 star
   nodes rather than 11. */
function StarRow({ count = 5, className }) {
  const stars = Math.max(1, Math.min(STAR_OFFSETS.length, count));

  return (
    <svg
      className={className}
      viewBox={STAR_VIEWBOX}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {STAR_OFFSETS.slice(0, stars).map((x) => (
        <path key={x} d={STAR_PATH} transform={`translate(${x} 0)`} />
      ))}
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      className="gr-pin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="gr-card">
      <StarRow count={review.rating || 5} className="gr-card-stars" />
      <p className="gr-card-text">{review.text}</p>
      <div className="gr-card-tags">
        {review.treatment ? (
          <span className="gr-chip gr-chip-treatment">{review.treatment}</span>
        ) : null}
        {review.from ? (
          <span className="gr-chip gr-chip-travel">
            <PinIcon />
            Travelled from {review.from}
          </span>
        ) : null}
      </div>
      <footer className="gr-card-foot">
        {review.avatar ? (
          <img
            className="gr-card-avatar"
            src={review.avatar}
            alt=""
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="gr-card-avatar gr-card-avatar-fallback" aria-hidden="true">
            {(review.name || '?').trim().charAt(0).toUpperCase()}
          </span>
        )}
        <span className="gr-card-who">
          <span className="gr-card-name">{review.name}</span>
          <span className="gr-card-when">{review.when}</span>
        </span>
      </footer>
    </article>
  );
}

function ChevronIcon({ back }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={back ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  );
}

/**
 * One seamless row the reader can also drive by hand.
 *
 * The row is a real horizontal scroll container rather than a CSS transform,
 * which is what lets a trackpad, a touch swipe, a mouse drag and the arrow
 * keys all move it. Ambient motion is a rAF loop writing scrollLeft; it steps
 * back by exactly half the track when it passes the seam, so the duplicated
 * second copy makes the wrap invisible.
 *
 * The loop yields to the reader: it stops while the pointer is over the cards,
 * while anything inside has focus, and while a drag is in progress, then picks
 * up from wherever it was left. It never runs off-screen, and under
 * prefers-reduced-motion it never runs at all — the row is still fully
 * scrollable by hand.
 */
function MarqueeRow({ reviews, loopSeconds, offscreen }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [held, setHeld] = useState(false);
  const dragRef = useRef(null);
  const resumeRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || offscreen || held) return undefined;

    const stillPreferred =
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (stillPreferred) return undefined;

    let frame = 0;
    let last = 0;
    /* Kept alongside scrollLeft because a sub-pixel-per-frame delta would be
       lost to rounding if it were written and re-read every frame. */
    let pos = viewport.scrollLeft;

    const step = (now) => {
      const half = track.scrollWidth / 2;

      if (last && half > 0) {
        // Someone scrolled by hand while the loop was running — take their position.
        if (Math.abs(pos - viewport.scrollLeft) > 2) pos = viewport.scrollLeft;

        pos += (half / loopSeconds) * ((now - last) / 1000);
        if (pos >= half) pos -= half;
        viewport.scrollLeft = pos;
      }

      last = now;
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [held, loopSeconds, offscreen]);

  useEffect(() => () => clearTimeout(resumeRef.current), []);

  /* A touch swipe has no pointerleave to resume on, so hand control back a
     beat after the finger lifts. */
  const releaseAfterIdle = () => {
    clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setHeld(false), 2500);
  };

  const hold = () => {
    clearTimeout(resumeRef.current);
    setHeld(true);
  };

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    hold();
    dragRef.current = { x: event.clientX, from: viewport.scrollLeft, moved: false };
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag || !viewport) return;

    const travelled = event.clientX - drag.x;
    if (!drag.moved && Math.abs(travelled) < 3) return;

    // Claim the gesture only once it is clearly a drag, so a tap still selects text.
    if (!drag.moved) {
      drag.moved = true;
      viewport.setPointerCapture?.(event.pointerId);
      /* Toggled on the node rather than through state: a re-render on every
         drag frame would be wasted work, and nothing else depends on it. */
      viewport.classList.add('is-dragging');
    }
    viewport.scrollLeft = drag.from - travelled;
  };

  const endDrag = (event) => {
    const viewport = viewportRef.current;
    if (dragRef.current?.moved) {
      viewport?.releasePointerCapture?.(event.pointerId);
      viewport?.classList.remove('is-dragging');
    }
    dragRef.current = null;
    if (event.pointerType !== 'mouse') releaseAfterIdle();
  };

  const nudge = (direction) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const card = viewport.querySelector('.gr-card');
    const stride = card ? card.getBoundingClientRect().width + 18 : 320;
    viewport.scrollBy({ left: direction * stride, behavior: 'smooth' });
    releaseAfterIdle();
  };

  if (!reviews.length) return null;

  return (
    <div className="gr-row">
      <div
        className="gr-marquee"
        ref={viewportRef}
        /* Focusable so the arrow keys scroll it, and labelled because a
           scrollable region is meaningless to a screen reader otherwise. */
        tabIndex={0}
        role="group"
        aria-label="Patient reviews from Google — scroll to read more"
        onPointerEnter={hold}
        onPointerLeave={() => setHeld(false)}
        onFocus={hold}
        onBlur={() => setHeld(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="gr-track" ref={trackRef}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          <div className="gr-track-copy" aria-hidden="true">
            {reviews.map((review) => (
              <ReviewCard key={`dup-${review.id}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      <div className="gr-nav">
        <button
          type="button"
          className="gr-nav-btn"
          onClick={() => nudge(-1)}
          aria-label="Previous reviews"
        >
          <ChevronIcon back />
        </button>
        <button
          type="button"
          className="gr-nav-btn"
          onClick={() => nudge(1)}
          aria-label="Next reviews"
        >
          <ChevronIcon />
        </button>
      </div>
    </div>
  );
}

export default function GoogleReviewsMarquee() {
  const rowsRef = useRef(null);
  /* Off until proven on-screen: this section sits far down a very tall page,
     so the tracks should not burn compositor time before anyone sees them. */
  const [rowsPaused, setRowsPaused] = useState(HAS_OBSERVER);

  useEffect(() => {
    const node = rowsRef.current;
    if (!node || !HAS_OBSERVER) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        setRowsPaused(!entries.some((entry) => entry.isIntersecting));
      },
      { rootMargin: '200px 0px', threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const reviews = Array.isArray(MARQUEE_REVIEWS) ? MARQUEE_REVIEWS : [];
  if (reviews.length === 0) return null;

  const rating = GOOGLE_RATING || {};
  const scale = rating.scale ?? 5;
  const cities = Array.isArray(REVIEW_TRAVEL_CITIES) ? REVIEW_TRAVEL_CITIES : [];

  return (
    <section className="gr-section" aria-labelledby="gr-heading">
      <h2 id="gr-heading" className="gr-sr-only">
        Top-rated on Google
      </h2>

      <div className="container">
        <div className="gr-layout">
          <aside className="gr-panel">
            <div className="gr-panel-head">
              <p className="gr-eyebrow">{rating.sourceLabel || 'Google Reviews'}</p>
              {rating.score ? (
                <p className="gr-score">
                  {rating.score}
                  <span className="gr-score-scale">/{scale}</span>
                </p>
              ) : null}
              <div className="gr-panel-rating">
                <StarRow className="gr-panel-stars" />
                <p className="gr-panel-meta">
                  {rating.total ? `${rating.total} reviews · ` : ''}verified on Google
                </p>
              </div>
            </div>

            {cities.length > 0 ? (
              <div className="gr-travel">
                <p className="gr-travel-label">Patients travel in from</p>
                <ul className="gr-travel-list">
                  {cities.map((city) => (
                    <li key={city} className="gr-travel-pill">
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {rating.profileUrl ? (
              <a
                className="gr-link"
                href={rating.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read all reviews on Google →
              </a>
            ) : null}
          </aside>

          <div
            className={rowsPaused ? 'gr-rows gr-rows--paused' : 'gr-rows'}
            ref={rowsRef}
          >
            <MarqueeRow
              reviews={reviews}
              loopSeconds={ROW_LOOP_SECONDS}
              offscreen={rowsPaused}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

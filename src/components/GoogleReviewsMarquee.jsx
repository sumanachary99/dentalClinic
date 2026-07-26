import { useEffect, useRef, useState } from 'react';
import '../styles/google-reviews.css';
import {
  GOOGLE_RATING,
  MARQUEE_REVIEWS,
  REVIEW_TRAVEL_CITIES,
} from '../config/googleReviews';

/**
 * "Top-rated on Google" — a tall rating panel on the left with two rows of
 * review cards streaming past it on the right.
 *
 * Both rows travel the same way; only their speeds differ, so they never
 * look locked together. Data comes straight from src/config/googleReviews.js;
 * takes no props. Renders nothing when there are no reviews.
 */

const STAR_PATH =
  'M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.31l-5.8 3.05 1.1-6.46-4.69-4.58 6.48-.94L12 2.5z';

/* One <svg> holds all five stars: a 24-unit glyph box plus a 3-unit gutter.
   Total viewBox is 132×24, so the rendered width is always height × 5.5. */
const STAR_PITCH = 27;
const STAR_VIEWBOX = '0 0 132 24';
const STAR_OFFSETS = [0, 1, 2, 3, 4].map((i) => i * STAR_PITCH);

/* One row of the eight reviewers who have a real profile photograph,
   rendered twice for the seamless loop = 16 cards. The duplicate half is what
   makes the -50% translate wrap invisibly, so it cannot be dropped.
   78s is unhurried enough that a review is readable as it passes, and one
   slow row costs the compositor far less than two quick ones. */
const ROW_DURATION = '78s';

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

/**
 * One seamless row. The subset is rendered twice — the second copy is
 * aria-hidden and only exists so the -50% translate loops invisibly.
 */
function MarqueeRow({ reviews, duration }) {
  if (!reviews.length) return null;

  return (
    <div className="gr-marquee">
      <div className="gr-track" style={{ '--gr-duration': duration }}>
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
            <MarqueeRow reviews={reviews} duration={ROW_DURATION} />
          </div>
        </div>
      </div>
    </section>
  );
}

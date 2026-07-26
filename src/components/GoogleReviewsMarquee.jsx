import '../styles/google-reviews.css';
import {
  GOOGLE_RATING,
  GOOGLE_REVIEWS,
  REVIEW_TRAVEL_CITIES,
} from '../config/googleReviews';

/**
 * "Top-rated on Google" — a solid rating anchor panel with two rows of
 * review cards streaming past it in opposite directions.
 *
 * Data comes straight from src/config/googleReviews.js; takes no props.
 * Renders nothing when there are no reviews.
 */

const STAR_PATH =
  'M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.31l-5.8 3.05 1.1-6.46-4.69-4.58 6.48-.94L12 2.5z';

function StarRow({ count = 5, className }) {
  return (
    <span className={className} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" focusable="false">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
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
function MarqueeRow({ reviews, duration, reverse }) {
  if (!reviews.length) return null;

  return (
    <div className="gr-marquee">
      <div
        className={reverse ? 'gr-track gr-track-reverse' : 'gr-track'}
        style={{ '--gr-duration': duration }}
      >
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
  const reviews = Array.isArray(GOOGLE_REVIEWS) ? GOOGLE_REVIEWS : [];
  if (reviews.length === 0) return null;

  const rating = GOOGLE_RATING || {};
  const scale = rating.scale ?? 5;
  const cities = Array.isArray(REVIEW_TRAVEL_CITIES) ? REVIEW_TRAVEL_CITIES : [];

  const half = Math.ceil(reviews.length / 2);
  const rowOne = reviews.slice(0, half);
  const rowTwo = reviews.slice(half);

  return (
    <section className="gr-section" aria-labelledby="gr-heading">
      <h2 id="gr-heading" className="gr-sr-only">
        Top-rated on Google
      </h2>

      <div className="container">
        <div className="gr-bar">
          <div className="gr-bar-score">
            {rating.score ? (
              <p className="gr-score">
                {rating.score}
                <span className="gr-score-scale">/{scale}</span>
              </p>
            ) : null}
            <div className="gr-bar-score-meta">
              <StarRow className="gr-anchor-stars" />
              <p className="gr-anchor-meta">
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
        </div>
      </div>

      <div className="gr-rows">
        <MarqueeRow reviews={rowOne} duration="58s" />
        <MarqueeRow reviews={rowTwo} duration="72s" reverse />
      </div>
    </section>
  );
}

import '../styles/mp-visit.css';
import { MP_VISIT } from '../config/landingContent';

/* Grid areas: two landscape consultation shots stack on the left ("a" over "b"),
   the portrait treatment shot fills a taller cell on the right ("c"). */
const AREA_CLASSES = ['mpv-fig-a', 'mpv-fig-b', 'mpv-fig-c'];
const SHAPE_CLASSES = ['mpv-fig-wide', 'mpv-fig-wide', 'mpv-fig-tall'];

export default function MPVisitBand() {
  const data = MP_VISIT;

  if (!data || !Array.isArray(data.photos) || data.photos.length === 0) {
    return null;
  }

  const { personName, personRole, eyebrow, heading, body, photos, storyUrl } = data;

  return (
    <section className="mpv-band" aria-labelledby="mpv-heading">
      <div className="container mpv-grid">
        <div className="mpv-copy">
          {eyebrow ? <p className="mpv-eyebrow">{eyebrow}</p> : null}

          <h2 className="mpv-heading" id="mpv-heading">
            {heading}
          </h2>

          {body ? <p className="mpv-body">{body}</p> : null}

          {personName ? (
            <p className="mpv-attribution">
              <span className="mpv-name">{personName}</span>
              {personRole ? <span className="mpv-role">{personRole}</span> : null}
            </p>
          ) : null}

          {storyUrl ? (
            <a
              className="mpv-link"
              href={storyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              About the constituency MP
              <span aria-hidden="true"> &rarr;</span>
            </a>
          ) : null}
        </div>

        <div className="mpv-photos">
          {photos.map((photo, index) => (
            <figure
              className={[
                'mpv-fig',
                SHAPE_CLASSES[index] || 'mpv-fig-wide',
                AREA_CLASSES[index] || '',
              ]
                .filter(Boolean)
                .join(' ')}
              key={photo.id || photo.image || index}
            >
              <span className="mpv-frame">
                <img src={photo.image} alt={photo.alt || ''} loading="lazy" />
              </span>
              {photo.caption ? (
                <figcaption className="mpv-caption">{photo.caption}</figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

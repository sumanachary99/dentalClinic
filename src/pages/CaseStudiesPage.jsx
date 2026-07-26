import { Link } from 'react-router-dom';
import '../styles/case-studies.css';
import { CASE_STUDIES, CASE_DISCIPLINES } from '../config/caseStudies';
import { CLINIC_INFO } from '../config/constants';

const caseNumber = (index) => String(index + 1).padStart(2, '0');

export default function CaseStudiesPage() {
  return (
    <main className="cs-page">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="cs-hero">
        <div className="container">
          <p className="cs-eyebrow">Case records</p>
          <h1 className="cs-hero-title">
            Before and after, from{' '}
            <span className="gradient-text">our own operatory</span>.
          </h1>
          <p className="cs-lead">
            Every photograph on this page was taken at {CLINIC_INFO.shortName} in{' '}
            {CLINIC_INFO.city}, of a patient treated by the clinic&rsquo;s own
            team. No stock images, no illustrations.
          </p>

          <ul className="cs-meta">
            <li className="cs-meta-item">
              <span className="cs-meta-value">{CASE_STUDIES.length}</span>
              <span className="cs-meta-label">Documented cases</span>
            </li>
            <li className="cs-meta-item">
              <span className="cs-meta-value">{CASE_DISCIPLINES.length}</span>
              <span className="cs-meta-label">Clinical disciplines</span>
            </li>
            <li className="cs-meta-item">
              <span className="cs-meta-value">{CLINIC_INFO.city}</span>
              <span className="cs-meta-label">Photographed on site</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── The records ────────────────────────────────────── */}
      <section className="cs-records">
        <div className="container">
          <ol className="cs-list">
            {CASE_STUDIES.map((record, index) => {
              const number = caseNumber(index);

              return (
                <li className="cs-case" key={record.id}>
                  <figure className="cs-figure">
                    <img
                      src={record.image}
                      alt={record.imageAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>

                  <div className="cs-record">
                    <div className="cs-record-tab">
                      <span className="cs-ghost-number" aria-hidden="true">
                        {number}
                      </span>
                      <p className="cs-record-head">
                        <span className="cs-case-no">Case {number}</span>
                        <span className="cs-discipline">
                          {record.discipline}
                        </span>
                      </p>
                    </div>

                    <h2 className="cs-title">{record.title}</h2>
                    <p className="cs-note">{record.note}</p>

                    <dl className="cs-facts">
                      {record.facts.map((fact) => (
                        <div className="cs-fact" key={fact.label}>
                          <dt className="cs-fact-label">{fact.label}</dt>
                          <dd className="cs-fact-value">{fact.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Closing ────────────────────────────────────────── */}
      <section className="cs-closing">
        <div className="container">
          <p className="cs-disclaimer">
            These are individual cases. Teeth, gums, bone and healing differ
            from person to person, so results shown here are not a promise of
            the same outcome — every treatment plan is decided after an
            examination.
          </p>

          <div className="cs-cta">
            <h2 className="cs-cta-title">Want your own case looked at?</h2>
            <p className="cs-cta-copy">
              Bring your question and we will examine, explain the options and
              tell you plainly what is realistic.
            </p>
            <div className="cs-cta-actions">
              <Link to="/book" className="btn btn-primary btn-lg">
                Book a consultation
              </Link>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="btn btn-outline btn-lg"
              >
                Call {CLINIC_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

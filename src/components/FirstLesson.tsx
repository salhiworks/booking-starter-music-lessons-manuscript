import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import { durationLabel, durationSpoken, priceTerms } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionMark } from './SectionMark';

interface FirstLessonProps {
  values: SiteValues;
  ownerFields: string[];
  /** The first lesson from the engine (by name), or null when the owner lists none. */
  first: Service | null;
  business: Business | null;
  onBook: StartBooking;
}

/**
 * Your first lesson, on the warm band: what it is (a real, single lesson —
 * not a sign-up), its length and price straight from the engine, who it suits,
 * what to bring, the honest note that the first-lesson price is checked by the
 * teacher (not by the booking system), and the five things that happen in it —
 * numbered 1 to 5 like the finger numbers written over a beginner's notes.
 * Book opens the booking with the first lesson chosen. With no first lesson in
 * the engine, the figures are left out and Book opens the booking unchosen.
 */
export function FirstLesson({ values, ownerFields, first, business, onBook }: FirstLessonProps) {
  const locale = business?.locale ?? 'en-US';
  const facts = values['first.facts'];
  const steps = values['first.steps'];
  const photo = values['first.photo'];
  const policy = values['first.policy'].trim();
  const bring = values['first.bring'].trim();
  const price = first ? priceTerms(first, locale) : null;
  return (
    <section id="first-lesson" className="section band first" aria-labelledby="first-title">
      <div className="page">
        <div className={`first__grid ${photo ? '' : 'first__grid--text'}`}>
          <div className="first__body">
            <header className="section-head first__head">
              <SectionMark n={2} label="First lesson" />
              <h2 id="first-title">
                <Emphasis text={values['first.title']} />
              </h2>
              {values['first.intro'] && <p className="section-intro">{values['first.intro']}</p>}
            </header>

            {first && price && (
              <dl className="first__figures">
                <div>
                  <dt>Length</dt>
                  <dd>
                    <span aria-hidden="true">{durationLabel(first.durationMinutes)}</span>
                    <span className="sr-only">{durationSpoken(first.durationMinutes)}</span>
                  </dd>
                </div>
                <div>
                  <dt>{price.kind === 'fixed' ? 'Price' : price.label}</dt>
                  <dd>{price.amount}</dd>
                </div>
                <div>
                  <dt>Paid</dt>
                  <dd className="first__figure-words">{price.kind === 'free' ? 'Nothing to pay' : 'At the lesson'}</dd>
                </div>
              </dl>
            )}

            {facts.length > 0 && (
              <ul className="first__facts" role="list">
                {facts.map((f, i) => (
                  <li key={`${i}-${f.text}`}>{f.text}</li>
                ))}
              </ul>
            )}

            <div className="first__actions">
              <a className="button button--large" href="#book" onClick={bookLink(onBook, first?.id)}>
                {values['hero.cta']}
                <span className="button__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>

          {photo && (
            <figure className="first__visual">
              <Photo image={photo} sizes="(min-width: 960px) 44vw, 100vw" className="first__photo" />
              {!ownerFields.includes('first.photo') && <span className="tag tag--on-photo">Sample</span>}
            </figure>
          )}
        </div>

        {steps.length > 0 && (
          <div className="first__steps-wrap">
            <h3 className="first__label">What happens in your first lesson</h3>
            <ol className="fingers" role="list">
              {steps.map((s, i) => (
                <li className="finger" key={`${i}-${s.title}`}>
                  <span className="finger__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="staff finger__staff" aria-hidden="true" />
                  <span className="finger__title">{s.title}</span>
                  {s.text && <span className="finger__text">{s.text}</span>}
                </li>
              ))}
            </ol>
          </div>
        )}

        {(bring || policy) && (
          <div className="first__notes">
            {bring && (
              <div className="first__note">
                <h3 className="first__label">What to bring</h3>
                <p className="prewrap">{bring}</p>
              </div>
            )}
            {policy && (
              <div className="first__note">
                <h3 className="first__label">About the first-lesson price</h3>
                <p className="prewrap">{policy}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { OpenStatus } from '../lib/hours';
import { bookLink } from '../lib/bookLink';
import { durationLabel, durationSpoken, shortPrice } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

/** Keep in sync with the hero preload in index.html. */
export const HERO_SIZES = '(min-width: 960px) 40vw, 100vw';

interface HeroProps {
  values: SiteValues;
  status: OpenStatus | null;
  /** Fields the owner has set — the photo's "Sample" label disappears once they replace it. */
  ownerFields: string[];
  /** The first lesson from the engine (by name), when the owner lists one. */
  first: Service | null;
  business: Business | null;
  onBook: StartBooking;
}

/**
 * The first screen. Left: where and what (eyebrow), a warm serif headline with
 * one italic phrase in the brand colour, one paragraph, "Book a first lesson"
 * (the booking opens with the first lesson chosen) and a link to the lessons;
 * then the first lesson's real length and price from the engine, and today's
 * hours. Right: a lesson at the upright, from behind (no one is presented as
 * the teacher), upright 4:5, with the staff along its foot. Under the words,
 * who lessons are for and one honest line about how they're given.
 * Phones: the words and both actions first, inside the first screen, then the
 * photo at full width, then the list.
 */
export function Hero({ values, ownerFields, status, first, business, onBook }: HeroProps) {
  const sample = !ownerFields.includes('hero.photo');
  const photo = values['hero.photo'];
  const secondary = values['hero.secondary'].trim();
  const forTitle = values['hero.forTitle'].trim();
  const list = values['hero.forList'];
  const note = values['hero.note'].trim();
  const locale = business?.locale ?? 'en-US';
  return (
    <section className={`hero ${photo ? '' : 'hero--text-only'}`} id="top" aria-labelledby="hero-title">
      <div className="page hero__inner">
        <div className="hero__text">
          {values['hero.eyebrow'] && <p className="eyebrow hero__eyebrow hero__enter">{values['hero.eyebrow']}</p>}
          <h1 id="hero-title" className="hero__title hero__enter">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede hero__enter">{values['hero.lede']}</p>}
          <div className="hero__actions hero__enter">
            <a className="button button--large" href="#book" onClick={bookLink(onBook, first?.id)}>
              {values['hero.cta']}
              <span className="button__arrow" aria-hidden="true">
                →
              </span>
            </a>
            {secondary && (
              <a className="quiet-link hero__secondary" href="#lessons">
                {secondary}
              </a>
            )}
          </div>
          {first && (
            <p className="hero__first hero__enter">
              <span className="hero__first-name">{first.name}</span>
              <span className="hero__first-sep" aria-hidden="true">
                ·
              </span>
              <span>
                <span aria-hidden="true">{durationLabel(first.durationMinutes)}</span>
                <span className="sr-only">{durationSpoken(first.durationMinutes)}</span>
              </span>
              <span className="hero__first-sep" aria-hidden="true">
                ·
              </span>
              <span>{shortPrice(first, locale)}</span>
              <span className="hero__first-sep" aria-hidden="true">
                ·
              </span>
              <span>no commitment</span>
            </p>
          )}
          {status && (
            <p className="open-status hero__status hero__enter" data-open={status.open}>
              <span className="open-status__dot" aria-hidden="true" />
              {status.text}
            </p>
          )}
        </div>

        {photo && (
          <figure className="hero__visual">
            <Photo image={photo} sizes={HERO_SIZES} priority className="hero__photo" />
            {sample && <span className="tag tag--on-photo">Sample</span>}
            <span className="staff hero__staff" aria-hidden="true" />
          </figure>
        )}

        {((list.length > 0 && forTitle) || note) && (
          <div className="hero__for hero__enter">
            {list.length > 0 && forTitle && (
              <>
                <p className="hero__for-title">{forTitle}</p>
                <ul role="list">
                  {list.map((item, i) => (
                    <li key={`${i}-${item.text}`}>{item.text}</li>
                  ))}
                </ul>
              </>
            )}
            {note && <p className="hero__note">{note}</p>}
          </div>
        )}
      </div>
    </section>
  );
}

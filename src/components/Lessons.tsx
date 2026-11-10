import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationLabel, durationSpoken, kinds, priceTerms, splitDescription, timeTerms } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { SectionMark } from './SectionMark';

interface LessonsProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  /** The first lesson's engine id (by name), for the weekly-lessons band. */
  firstId: string | null;
  onRetry: () => void;
  onBook: StartBooking;
}

/**
 * Lessons & prices, straight from the engine: every name, length and price is
 * the one the booking uses. First, three plain facts the owner can edit — one
 * booking is one lesson, weekly lessons are arranged together, nothing is paid
 * online. Then the lessons in their kinds — Your first lesson, Piano lessons,
 * Theory & coaching — each row with what happens, who it suits, its length and
 * its price per lesson, and a Book button that opens the booking with it
 * chosen. The first lesson's kind is set apart as the place to start. Under the
 * list, the "weekly lessons?" band (opens the booking with the first lesson)
 * and the owner's note about prices.
 */
export function Lessons({ values, services, business, firstId, onRetry, onBook }: LessonsProps) {
  const locale = business?.locale ?? 'en-US';
  const all = services.status === 'ready' ? services.data : [];
  const groups = kinds(all);
  const terms = values['lessons.terms'];
  const weeklyTitle = values['lessons.weeklyTitle'].trim();

  return (
    <section id="lessons" className="section lessons" aria-labelledby="lessons-title">
      <div className="page">
        <header className="section-head lessons__head">
          <SectionMark n={1} label="Lessons & prices" />
          <h2 id="lessons-title">
            <Emphasis text={values['lessons.title']} />
          </h2>
          {values['lessons.intro'] && <p className="section-intro">{values['lessons.intro']}</p>}
        </header>

        {terms.length > 0 && (
          <ul className="terms" role="list">
            {terms.map((t, i) => (
              <li className="term" key={`${i}-${t.title}`}>
                <p className="term__title">{t.title}</p>
                {t.text && <p className="term__text">{t.text}</p>}
              </li>
            ))}
          </ul>
        )}

        {services.status === 'loading' && (
          <div className="lessons__loading" aria-busy="true">
            <p className="sr-only" role="status">
              Loading lessons…
            </p>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="skeleton skeleton--service" aria-hidden="true" />
            ))}
          </div>
        )}

        {services.status === 'error' &&
          (services.error.code === 'NOT_CONFIGURED' ? (
            <p className="quiet-state">Lessons and prices will be listed here soon.</p>
          ) : (
            <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
              <p>We couldn't load the lessons and prices just now.</p>
            </Notice>
          ))}

        {services.status === 'ready' && all.length === 0 && (
          <p className="quiet-state">Lessons will be listed here soon. Call or email the studio to book in the meantime.</p>
        )}

        {all.length > 0 && (
          <div className="menu">
            {groups.map((g) => {
              const note = g.note ? values[g.note] : '';
              return (
                <section className={`kind kind--${g.id}`} id={`lessons-${g.id}`} key={g.id} aria-labelledby={`lessons-${g.id}-title`}>
                  <div className="kind__head">
                    <h3 className="kind__title" id={`lessons-${g.id}-title`}>
                      {g.label}
                    </h3>
                    {note && <p className="kind__note">{note}</p>}
                  </div>
                  <ul className="menu-list" role="list">
                    {g.services.map((s) => {
                      const { lead, suits } = splitDescription(s.description);
                      const price = priceTerms(s, locale);
                      const time = timeTerms(s);
                      return (
                        <li className="item" key={s.id}>
                          <div className="item__main">
                            {s.image && (
                              <img
                                className="item__thumb"
                                src={s.image.url}
                                alt={s.image.alt}
                                width={s.image.width ?? 160}
                                height={s.image.height ?? 160}
                                loading="lazy"
                                decoding="async"
                              />
                            )}
                            <h4 className="item__name">{s.name}</h4>
                            {lead && <p className="item__lead">{lead}</p>}
                            {suits.length > 0 && (
                              <p className="item__for">
                                <span className="item__for-label">Suits</span> {suits.join(' · ')}
                              </p>
                            )}
                          </div>
                          <dl className="item__figures">
                            <div className={`item__figure item__figure--time item__figure--${time.kind}`}>
                              <dt>{time.label}</dt>
                              <dd>
                                <span className="item__amount">
                                  <span aria-hidden="true">{durationLabel(s.durationMinutes)}</span>
                                  <span className="sr-only">{durationSpoken(s.durationMinutes)}</span>
                                </span>
                                {time.note && <span className="item__fine">{time.note}</span>}
                              </dd>
                            </div>
                            <div className={`item__figure item__figure--price item__figure--${price.kind}`}>
                              <dt>{price.label}</dt>
                              <dd>
                                <span className="item__amount">{price.amount}</span>
                                {price.note && <span className="item__fine">{price.note}</span>}
                              </dd>
                            </div>
                          </dl>
                          <a
                            className={`button button--small ${g.id === 'first' ? '' : 'button--quiet'} item__book`}
                            href="#book"
                            onClick={bookLink(onBook, s.id)}
                          >
                            Book<span className="sr-only"> {s.name}</span>
                            <span className="button__arrow" aria-hidden="true">
                              →
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        )}

        {all.length > 0 && weeklyTitle && (
          <aside className="weekly" aria-labelledby="weekly-title">
            <span className="staff weekly__staff" aria-hidden="true" />
            <div className="weekly__text">
              <h3 id="weekly-title" className="weekly__title">
                {weeklyTitle}
              </h3>
              {values['lessons.weeklyText'] && <p className="weekly__body">{values['lessons.weeklyText']}</p>}
            </div>
            <a className="button weekly__book" href="#book" onClick={bookLink(onBook, firstId)}>
              {values['hero.cta']}
              <span className="button__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </aside>
        )}

        {all.length > 0 && values['lessons.priceNote'] && (
          <p className="price-note prewrap">{values['lessons.priceNote']}</p>
        )}
      </div>
    </section>
  );
}

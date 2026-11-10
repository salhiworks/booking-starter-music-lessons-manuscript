import type { SiteImage } from '@profitstudio/booking-engine';
import type { SiteValues } from '../lib/content';
import { engine } from '../lib/engine';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionMark } from './SectionMark';

/** The Live Demo and preview mode show a fictional studio: say so beside it. */
const SAMPLE_BUSINESS = __BOOKING_DEMO__ || engine.mode === 'preview';

const FRAMES = [
  { n: 1, shape: 'wide' },
  { n: 3, shape: 'upright' },
  { n: 4, shape: 'upright' },
  { n: 2, shape: 'wide' },
] as const;

/**
 * The music room, on the warm band: a few paragraphs and what the room has on
 * one side; on the other, the room in four frames set as two level rows (a wide
 * frame beside an upright one, then mirrored) so every photo keeps its shape.
 * The photographs are another music room's, from one stock series — the page
 * says so until the owner replaces them; in preview and the Live Demo it also
 * says the studio itself is fictional.
 */
export function Room({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const facts = values['room.facts'];
  const paragraphs = values['room.text'].split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const frames = FRAMES.map((f) => ({
    ...f,
    image: values[`room.photo${f.n}`] as SiteImage | null,
    caption: values[`room.caption${f.n}`].trim(),
    sample: !ownerFields.includes(`room.photo${f.n}`),
  })).filter((f) => f.image);
  const anySample = frames.some((f) => f.sample);
  return (
    <section id="room" className="section band room" aria-labelledby="room-title">
      <div className="page room__grid">
        <div className="room__side">
          <header className="section-head room__head">
            <SectionMark n={5} label="The music room" />
            <h2 id="room-title">
              <Emphasis text={values['room.title']} />
            </h2>
          </header>
          <div className="room__text">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'room__lead prewrap' : 'prewrap'}>
                {p}
              </p>
            ))}
          </div>
          {facts.length > 0 && (
            <dl className="room__facts">
              {facts.map((fact, i) => (
                <div key={`${i}-${fact.title}`}>
                  <dt>{fact.title}</dt>
                  {fact.text && <dd>{fact.text}</dd>}
                </div>
              ))}
            </dl>
          )}
          {(anySample || SAMPLE_BUSINESS) && (
            <p className="sample-note">
              <span className="tag">Sample</span>
              {SAMPLE_BUSINESS
                ? `${__BOOKING_DEMO__ ? 'This demo shows a fictional studio' : 'Preview shows a fictional studio'}: the room, the piano and the people in these photographs are licensed stock images from another music room — not its teacher, its students or its space.`
                : 'Example photography from another music room — not this studio’s teacher, students or space.'}
            </p>
          )}
        </div>
        {frames.length > 0 && (
          <div className={`room__photos room__photos--${frames.length}`}>
            {frames.map((f) => (
              <figure className={`room__frame room__frame--${f.shape}`} key={f.n}>
                <Photo
                  image={f.image!}
                  sizes={f.shape === 'wide' ? '(min-width: 960px) 32vw, 62vw' : '(min-width: 960px) 17vw, 34vw'}
                  className="room__photo"
                />
                {f.sample && <span className="tag tag--on-photo">Sample</span>}
                {f.caption && <figcaption className="room__caption">{f.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionMark } from './SectionMark';

/**
 * How I teach, on the dark band (the piano's ebony): a lesson in progress and
 * the teacher listening, a statement set large, a short paragraph and the
 * principles as a plain numbered list. Inspirational, but practical: no
 * promised results, no credentials the owner hasn't written themselves.
 */
export function Approach({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const photo = values['approach.photo'];
  const photo2 = values['approach.photo2'];
  const principles = values['approach.principles'];
  const sample = (id: string) => !ownerFields.includes(id);
  return (
    <section id="approach" className="section dark approach" aria-labelledby="approach-title">
      <div className="page approach__grid">
        <header className="section-head approach__head">
          <SectionMark n={3} label="How I teach" tone="on-dark" />
          <h2 id="approach-title">
            <Emphasis text={values['approach.title']} />
          </h2>
        </header>

        {values['approach.statement'] && (
          <p className="approach__statement">
            <span className="approach__quote" aria-hidden="true">
              “
            </span>
            {values['approach.statement']}
          </p>
        )}

        {(photo || photo2) && (
          <div className={`approach__photos ${photo && photo2 ? '' : 'approach__photos--single'}`}>
            {photo && (
              <figure className="approach__main">
                <Photo image={photo} sizes="(min-width: 960px) 36vw, 100vw" className="approach__photo" />
                {sample('approach.photo') && <span className="tag tag--on-photo">Sample</span>}
              </figure>
            )}
            {photo2 && (
              <figure className="approach__side">
                <Photo image={photo2} sizes="(min-width: 960px) 18vw, 50vw" className="approach__photo" />
                {sample('approach.photo2') && <span className="tag tag--on-photo">Sample</span>}
              </figure>
            )}
          </div>
        )}

        <div className="approach__body">
          {values['approach.text'] && <p className="approach__text prewrap">{values['approach.text']}</p>}
          {principles.length > 0 && (
            <ol className="principles" role="list">
              {principles.map((p, i) => (
                <li className="principle" key={`${i}-${p.title}`}>
                  <span className="principle__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="principle__title">{p.title}</span>
                  {p.text && <span className="principle__text">{p.text}</span>}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

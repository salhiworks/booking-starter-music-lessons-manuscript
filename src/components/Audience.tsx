import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { SectionMark } from './SectionMark';

/**
 * Who lessons are for: the students the studio really teaches, as a ruled list
 * beside the heading, how lessons for younger students are arranged (a parent
 * or guardian books with their own details — the booking system checks no
 * age or guardian status, and says nothing that suggests it does), and one
 * honest line on what the studio doesn't teach.
 */
export function Audience({ values }: { values: SiteValues }) {
  const items = values['audience.items'];
  const guardian = values['audience.guardian'].trim();
  const not = values['audience.not'].trim();
  if (items.length === 0 && !guardian) return null;
  return (
    <section id="for" className="section audience" aria-labelledby="audience-title">
      <div className="page audience__grid">
        <div className="audience__side">
          <header className="section-head audience__head">
            <SectionMark n={4} label="Who it’s for" />
            <h2 id="audience-title">
              <Emphasis text={values['audience.title']} />
            </h2>
            {values['audience.intro'] && <p className="section-intro">{values['audience.intro']}</p>}
          </header>
          {guardian && (
            <aside className="guardian" aria-labelledby="guardian-title">
              <h3 id="guardian-title" className="guardian__title">
                Younger students
              </h3>
              <p className="prewrap">{guardian}</p>
            </aside>
          )}
        </div>
        <div className="audience__list-wrap">
          {items.length > 0 && (
            <ul className="audience__list" role="list">
              {items.map((item, i) => (
                <li className="who" key={`${i}-${item.title}`}>
                  <span className="who__title">{item.title}</span>
                  {item.text && <span className="who__text">{item.text}</span>}
                </li>
              ))}
            </ul>
          )}
          {not && <p className="audience__not">{not}</p>}
        </div>
      </div>
    </section>
  );
}

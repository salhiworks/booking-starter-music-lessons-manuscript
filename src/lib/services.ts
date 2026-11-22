import { formatMoney } from '@profitstudio/booking-engine';
import type { Service } from '@profitstudio/booking-engine';

/**
 * The studio's lesson list: its kinds, honest price and length terms, the first
 * lesson, and who each lesson suits.
 *
 * The engine (2.0.0-beta.4) has no service categories and no per-service
 * metadata, and a service's id is a database UUID this site cannot know when it
 * is built — so everything here is read from the service's own engine data:
 *
 *   1. its KIND, from its NAME against the rules below — first match wins,
 *      strongest signal first ("First Piano Lesson" is the first lesson, not
 *      a piano lesson; "Music Theory & Reading" is theory); if the name has no
 *      lesson words, its DESCRIPTION; otherwise "More lessons":
 *        - first  Your first lesson   (first, trial, introductory, taster)
 *        - theory Theory & coaching   (theory, reading, ear, harmony, coaching, repertoire)
 *        - piano  Piano lessons       (piano, keyboard, lesson)
 *   2. what its LENGTH means (timeTerms): always the real length of one lesson;
 *   3. what its PRICE means (priceTerms): the price of that one lesson, paid at
 *      the studio; zero is free; a starting price (`priceFrom`) reads "from";
 *   4. who it suits: the part of its description after "For:" (or "Suits:"),
 *      split at "·" — written by the owner in Dashboard → Services.
 *
 * A stable category, a "first lesson only" rule, packages or weekly places need
 * an engine version — see docs/ENGINE-PROPOSAL-music-lessons.md in the Niche
 * Pack workspace.
 */
export type KindId = 'first' | 'piano' | 'theory' | 'more';

/** Content fields that belong to a kind (src/content/site.ts). */
export type KindNote = 'lessons.noteFirst' | 'lessons.notePiano' | 'lessons.noteTheory';

interface KindRule {
  id: KindId;
  label: string;
  note: KindNote | null;
  match: RegExp;
}

const RULES: KindRule[] = [
  {
    id: 'first',
    label: 'Your first lesson',
    note: 'lessons.noteFirst',
    match: /\b(first|trial|introductory|intro|taster|try-?out|meet (?:and|&) play)\b/i,
  },
  {
    id: 'theory',
    label: 'Theory & coaching',
    note: 'lessons.noteTheory',
    match: /\b(theory|reading|sight-?reading|ear training|aural|harmony|musicianship|composition|coaching|repertoire|masterclass)\b/i,
  },
  {
    id: 'piano',
    label: 'Piano lessons',
    note: 'lessons.notePiano',
    match: /\b(piano|keyboard|lessons?|technique|beginners?)\b/i,
  },
];

const MORE = { id: 'more', label: 'More lessons', note: null } as const;

/** The order kinds are shown in: the first lesson → regular lessons → theory & coaching. */
const ORDER: KindId[] = ['first', 'piano', 'theory', 'more'];

export interface Kind {
  id: KindId;
  label: string;
  note: KindNote | null;
  services: Service[];
}

export function kindOf(service: Pick<Service, 'name' | 'description'>): KindRule | typeof MORE {
  const byName = RULES.find((rule) => rule.match.test(service.name));
  if (byName) return byName;
  const { lead } = splitDescription(service.description);
  return RULES.find((rule) => rule.match.test(lead)) ?? MORE;
}

/** Kept for the shared booking flow: lessons carry no size, so the name always comes back whole. */
export function splitName(name: string): { base: string; size: string | null } {
  return { base: name, size: null };
}

/** Services in their kinds, keeping the owner's display order inside each; empty kinds are left out. */
export function kinds(services: readonly Service[]): Kind[] {
  const map = new Map<KindId, Kind>();
  for (const service of services) {
    const rule = kindOf(service);
    let k = map.get(rule.id);
    if (!k) {
      k = { id: rule.id, label: rule.label, note: rule.note, services: [] };
      map.set(rule.id, k);
    }
    k.services.push(service);
  }
  return ORDER.flatMap((id) => (map.has(id) ? [map.get(id)!] : []));
}

/**
 * The first lesson — the one the hero, the first-lesson section and "Book a
 * first lesson" open the booking with: the first service the owner lists whose
 * name says first/trial/introductory, else nothing (then those buttons open the
 * booking with no lesson chosen). Read from the engine's services — never a
 * hard-coded id.
 */
export function firstLesson(services: readonly Service[]): Service | null {
  return services.find((s) => kindOf(s).id === 'first') ?? null;
}

/**
 * "We talk about… For: complete beginners · returning players" →
 * { lead: "We talk about…", suits: ["complete beginners", "returning players"] }.
 * Without "For:" the whole description is the lead and the list is empty.
 */
export function splitDescription(description: string | null | undefined): { lead: string; suits: string[] } {
  const text = (description ?? '').trim();
  const match = /(?:^|[\s.])(?:for|suits|suited to|good for|ideal for|best for|level)\s*:\s*/i.exec(text);
  if (!match) return { lead: text, suits: [] };
  const lead = text.slice(0, match.index + (match[0].startsWith('.') ? 1 : 0)).trim();
  const suits = text
    .slice(match.index + match[0].length)
    .split(/\s*[·•;]\s*|\s+\|\s+/)
    .map((item) => item.trim().replace(/\.$/, ''))
    .filter(Boolean);
  return { lead, suits };
}

/** "30 min", "60 min", "90 min", "2 h" — the lesson's length, straight from the engine (lessons are spoken of in minutes). */
export function durationLabel(minutes: number): string {
  if (minutes <= 90) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** The same, for screen readers. */
export function durationSpoken(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${minutes} minutes`;
  const hours = `${h} hour${h > 1 ? 's' : ''}`;
  return m ? `${hours} ${m} minutes` : hours;
}

/** "30-minute", "60-minute" — for a sentence ("a 30-minute lesson"). */
export function durationAdjective(minutes: number): string {
  return `${minutes}-minute`;
}

/**
 * What the booking's LENGTH means: here it is always the real length of one
 * lesson, one to one. Kept as a function (like the other starters) so the page,
 * the booking sheet and the summary label it the same way.
 */
export interface TimeTerms {
  kind: KindId;
  /** Small label before the length. */
  label: string;
  /** One honest line under the length, or null. */
  note: string | null;
}

export function timeTerms(service: Pick<Service, 'name' | 'description'>): TimeTerms {
  const kind = kindOf(service).id;
  if (kind === 'first') return { kind, label: 'Lesson', note: 'One lesson — not a sign-up' };
  return { kind, label: 'Lesson', note: null };
}

type PriceInput = Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>;

/** Whole dollars print without ".00" — "$55", not "$55.00". */
const money = (cents: number, currency: string, locale: string) => formatMoney(cents, currency, locale).replace(/([.,])00(?!\d)/, '');

/**
 * What the engine's price MEANS on this site (src/lib/preset.ts):
 *   free    → no charge for this lesson
 *   from    → a starting price; the teacher confirms the price first
 *   fixed   → the price of this one lesson, paid at the studio
 *   request → no price shown: ask the studio
 */
export interface PriceTerms {
  kind: 'free' | 'from' | 'fixed' | 'request';
  /** Small label before the amount. */
  label: string;
  /** The amount, or the words standing in for it. */
  amount: string;
  /** One honest line under the amount, or null. */
  note: string | null;
}

export function priceTerms(service: PriceInput, locale: string): PriceTerms {
  if (service.priceCents === null) return { kind: 'request', label: 'Price', amount: 'Ask the studio', note: null };
  if (service.priceCents === 0) return { kind: 'free', label: 'Price', amount: 'Free', note: 'No charge for this lesson' };
  const amount = money(service.priceCents, service.currency, locale);
  return service.priceFrom
    ? { kind: 'from', label: 'From', amount, note: 'Confirmed before the lesson' }
    : { kind: 'fixed', label: 'Per lesson', amount, note: null };
}

/** One line: "$55 per lesson", "from $55", "Free", "Ask the studio". */
export function priceLabel(service: PriceInput, locale: string): string {
  const t = priceTerms(service, locale);
  if (t.kind === 'from') return `from ${t.amount}`;
  if (t.kind === 'fixed') return `${t.amount} per lesson`;
  return t.amount;
}

/** Short form: "from $55", "$55", "Free". */
export function shortPrice(service: PriceInput, locale: string): string {
  const t = priceTerms(service, locale);
  if (t.kind === 'from') return `from ${t.amount}`;
  return t.amount;
}

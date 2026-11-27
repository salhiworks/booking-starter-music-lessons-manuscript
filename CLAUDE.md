# Private Music Lessons Studio "Manuscript" Starter — project rules

A one-page booking website for an independent private music teacher, shipped as **Una Corda
Piano Studio** (a fictional one-teacher piano studio in Kerrytown, Ann Arbor: a first piano
lesson, beginner, private and extended piano lessons, music theory & reading and repertoire
coaching, for complete beginners, adults returning to the piano and students from age 9) for
the owner to make their own. Its identity lives in `src/site.config.ts`; `CUSTOMIZE.md` is the
prompt that personalizes it. Built around **@profitstudio/booking-engine** **2.0.1**
(pinned; lock in `booking-engine.lock.json`). The engine owns booking; this project owns the
public design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`.
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Lesson request received — we'll confirm your appointment shortly.", confirmed → "Your lesson is booked.").
  Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- Read the engine's answer strictly (`src/lib/bookingStatus.ts`): say "booked" only when `status === 'confirmed'`
  and "request received" only when it is `'pending'` — never treat "not pending" as booked. `BOOKING_INACTIVE`
  (the code was accepted earlier, but the request was declined, cancelled or not confirmed in time) is never a
  success: show "This request is no longer active. Please choose a new time or contact the business." with the
  reference, go back to the times, and forget the remembered code so no recovery path verifies it again.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.

## What the engine does not do — never fake it

**One booking = one lesson with one student, on one calendar (one teacher's time).** A first
lesson is ONE lesson at an introductory price — never enrolment, a course or a weekly place.
Regular weekly lessons are agreed with the teacher, and each is still booked on its own.
Prices are per lesson and paid at the studio. A new booking feature needs a new engine
version — never custom database code or browser-side logic in this project:

- recurring or weekly bookings, terms, semesters, automatic renewals;
- lesson packages, bundles, prepaid credits, subscriptions, deposits, payments or checkout;
- a "one first lesson per person" rule (the teacher checks it when confirming — say so);
- several teachers or instructor choice, group classes or capacity;
- student profiles, progress tracking, practice assignments, attendance, exam grades;
- guardian accounts or consent workflows (a parent simply books with their own details);
- file or recording uploads, video lessons, online teaching.

The booking notes field is **About your music goals (optional)**: experience, music enjoyed,
what to learn. Never ask for health information, dates of birth, schools, addresses or other
sensitive details about a child. Proposed engine work: `docs/ENGINE-PROPOSAL-music-lessons.md`
in the Niche Pack workspace.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/Detroit`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample lessons, hours, policies; "students"/"lessons") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| Kinds (from the name, then the description), the first lesson (`firstLesson`), length and price terms, "For:" parsing, duration labels | `src/lib/services.ts` |
| What the owner can edit (texts, every section photo, the "lessons for" list, the three booking facts, the weekly-lessons band, the first-lesson facts and steps, the teaching principles, the students list and younger-students note, the room's four photos and facts, logo, brand colour, heading style) | `src/content/site.ts` (`defineSiteContent`) |
| Content store + brand → CSS variables (`--accent`, `data-headings`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` |
| Sections | `src/components/*.tsx` (Header, Hero, Lessons `#lessons`, FirstLesson `#first-lesson`, Approach `#approach`, Audience `#for`, Room `#room`, GoodToKnow, Visit, Footer; `SectionMark` the number · staff · name label; `Emphasis` renders the owner's `*highlight*` in italics); the section list for header, phone menu and footer is `src/lib/nav.ts` |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Lessons, prices, durations,
  hours, the address, phone and email are NOT content: they come from the engine. The engine does not allow
  default images inside list fields — that is why each room photo (`room.photo1…4`) is its own image field.
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off,
  unconfigured or failing — leads to the `#book` section and its contact details. A lesson row's Book passes
  that lesson's engine id; "Book a first lesson" passes `firstLesson(services)` — found by name, never hard-coded.
- **Kinds:** `kindOf()` reads the NAME (then the description) against `RULES` (first match wins: first /
  trial / introductory / taster → Your first lesson; theory / reading / ear / harmony / coaching / repertoire →
  Theory & coaching; piano / keyboard / lesson → Piano lessons; no match → "More lessons"). Keep
  `concepts/music-lessons-manuscript/kinds.test.mjs` (Niche Pack workspace) passing.
- **Lengths and prices:** always from the engine, labelled as a lesson's length and a price per lesson
  (`timeTerms`, `priceTerms`). Never hard-code a lesson, length, price or id in copy (FAQ answers included).
  Never suggest anything is paid online, never show a payment success.
- **First lesson:** always "one lesson — not a sign-up". If it is described as once per student, say the
  teacher checks this when confirming; the booking system does not enforce it.
- **Younger students:** a parent or guardian books with their own details; never ask for a child's email,
  phone or personal history; never claim the system verifies age, guardianship or consent; never invent
  safeguarding certificates or background checks.
- **Sample photos:** every section photo carries a "Sample" label until the owner replaces that field
  (`ownerFields`); the music room says the photographs are another music room's, and in preview and the Live
  Demo that the studio is fictional. Never present a stock photo's people as the studio's teacher or students,
  never name them; never invent a teacher's name, qualifications, years of experience, awards, exam results,
  testimonials or student statistics. Never add copyrighted scores, album covers, recordings or autoplay audio.
- **Default photos:** add your own variants to `public/photos/`, keep the default `src` in `site.ts` equal to a
  key in `photoVariants.ts`, record the source in `PHOTOS.md`. If the first-screen default changes, update the
  `<link rel="preload">` in `index.html` (`imagesizes` must match `HERO_SIZES` in `src/components/Hero.tsx`).
- **Policies:** Good to know shows a "Sample policies" label until the owner edits `faq.items`.
- **Copy:** warm, plain, first person ("I teach…"); welcoming to beginners; no guaranteed progress, no
  pressure, no "best teacher in town". Only instruments, levels and ages the owner really teaches.
- **Style:** plain CSS with the tokens; no UI kit. Keep 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, and every text/background pair at 4.5:1. The brand colour is owner-editable
  and always carries white text (`--on-accent`); on ebony use `--accent-glow`. Photographs are square-cornered.
- **Composition:** calm and left-aligned (DESIGN.md → Layout). New sections open with `.section-head`
  (SectionMark + h2 + intro). The staff (`.staff`, five empty lines) stays the one ornament — no notes, clefs,
  waveforms or instrument clip-art.
- The public site stays one page (sections + in-page booking flow); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5181 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.

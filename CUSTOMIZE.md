# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code session
opened in this folder. It changes identity and words only, so it finishes in one short
session.

```text
Customize this private music lessons studio starter for my business.

Studio name: <YOUR STUDIO NAME>
City and area: <CITY, AREA>
Time zone (IANA): <e.g. America/Chicago>
What I teach, to whom, and my personality in a few words: <e.g. piano and theory, adults and children from 8, calm and encouraging>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the studio name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my studio: the name mark and the line
   beside it, the line above the headline, headline, introduction, the "Lessons for" list and
   the line under it, the lessons intro, the three "How booking works" facts, the three kind
   notes, the weekly-lessons band, the note about prices, the first-lesson texts (intro,
   facts, the five steps, what to bring, the note about the first-lesson price), "How I
   teach" (statement, text, principles), "Who it's for" (students, younger students, what I
   don't teach), the music room text, captions and facts, Good to know answers (my real
   policies), the finding-us note and the search title and description. Keep field ids,
   types, limits and photos. Keep the sample photos (they stay labelled "Sample" until I
   upload my own). Headlines may set one or two words in italics using *asterisks* — keep that
   style. Keep the honesty rules: one booking is one lesson; a first lesson is not enrolment;
   weekly lessons are arranged with me; nothing is paid online; a parent or guardian books
   for under-18s; no lengths or prices written into the copy.
4. Only if mahogany clearly doesn't fit my brand (otherwise skip this step): change the
   default of brand.accent in src/content/site.ts (a deep colour that keeps white text at
   4.5:1 — ink blue, bottle green, plum), the colours in src/admin-theme.css and the stroke
   in public/favicon.svg.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json.
Do not invent lessons, prices, opening hours, qualifications, years of experience, awards,
exam results, reviews, testimonials, student numbers or instruments I have not given —
lessons, prices and hours are set in the dashboard. When done, run npm run build and fix any
error, then show me the result with npm run dev.
```

## After the prompt

- **Your lessons:** dashboard → Services. One booking is one lesson for one student.
  - **Kinds.** The page sorts lessons by the words in their names, checked in this order:
    *first / trial / introductory / taster* → **Your first lesson**; *theory / reading /
    sight-reading / ear training / harmony / coaching / repertoire* → **Theory & coaching**;
    *piano / keyboard / lesson* → **Piano lessons**. Otherwise the description decides, then
    "More lessons". Teaching guitar or voice instead? Name lessons plainly ("Beginner Guitar
    Lesson") — they still list under the lesson kinds; ask Claude to rename "Piano lessons" in
    `src/lib/services.ts` if you teach another instrument.
  - **The first lesson.** Keep one service whose name starts with *First* or *Trial*: every
    "Book a first lesson" button opens the booking with it chosen, and the hero and first-lesson
    section show its length and price. A price of 0 shows as "Free".
  - **Price** is per lesson, paid at the studio. Leave *Starting price* off unless the price
    really varies (the page then says "from").
  - **Length** is the lesson itself; the buffer after it is your time between students.
- **Who a lesson suits:** end its description with `For:` and the items separated by `·` —
  for example `For: beginners from age 9 · adults starting out`.
- **Weekly lessons:** agree a regular time with each student after the first lesson and book
  those lessons yourself or let students book each one. The site never promises an automatic
  weekly place.
- **Your photographs:** dashboard → Website → Welcome (one upright 4:5 photo — a lesson or the
  piano in its room, hands and keyboard whole), Your first lesson (one wide), How I teach (one
  wide, one upright), The music room (two wide, two upright). Remove a photo to show the
  section without it. Each stays labelled "Sample" until you replace it. Only photograph
  students — especially children — with their (or their parents') consent.
- **Policies:** Good to know is labelled "Sample policies" until you edit it — write your own
  cancellation, missed-lesson and payment rules.
- **About you:** add your name, training and experience in your own words — for example in
  *How I teach*. Only state what you can show.
- Connect real bookings: README.md, step 3.

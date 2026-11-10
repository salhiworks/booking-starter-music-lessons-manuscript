# Design — "Manuscript"

**Una Corda Piano Studio** is a fictional independent piano studio on Detroit Street in
Kerrytown, Ann Arbor: **one teacher, one acoustic upright piano, one room**. It teaches
**piano and the theory that goes with it** — private, in-person lessons for complete
beginners, adults returning to the piano and students from age 9 — and nothing else (no other
instruments, no singing, no group classes, no online lessons).

*Una corda* ("one string") is the instruction for a pianist to press the soft pedal: the
hammers strike fewer strings and the sound turns quieter and more intimate. It is a
musician's word and the studio's character: one teacher and one student, a quiet room, a
gentle start.

## Who it is for, and what they want to know

- **Complete beginners**, very often adults, who have wanted to learn for years and are a
  little nervous about it. *Can I start with nothing? Do I need a piano? What happens in the
  first lesson? Will I feel silly?*
- **Adults returning to the piano** after a childhood of lessons. *Will it come back? Can I
  choose what I play? Is the pace up to me?*
- **Parents of children from age 9.** *Who books? Can I stay? How do weekly lessons work?*
- **Players who already play** and want better technique, reading or help with one piece.

Every section answers one of their questions, in the order they ask them. *What and where?*
(the first screen: private piano lessons in Kerrytown, who they are for, the first lesson's
real length and price). *How much, and how long?* (Lessons & prices). *What is a first lesson
— and does it commit me?* (Your first lesson, with its five steps). *What is the teaching
like?* (How I teach). *Is it for me?* (Who it's for, with how younger students are booked).
*Is the room comfortable?* (The music room). *The practical rest* (Good to know). *How do I
book?* (every Book button; the booking band). *Where?* (Visit).

## The idea

A music room in afternoon light — and the manuscript on the stand. The design takes three
things from a beginner's first piano book:

1. **The staff.** Five fine, evenly spaced lines — the one ornament. It opens every section
   label, sits under the first photograph, over each step of the first lesson, along the
   weekly-lessons band and the booking band, and under the footer's name. **Nothing is ever
   written on it**: no notes, clefs, waveforms or invented notation — an empty staff is a
   beginning, which is exactly what the site offers.
2. **Finger numbers.** Teachers write 1 to 5 over a beginner's notes to say which finger
   plays. The five steps of a first lesson are numbered the same way, in large italic figures.
3. **The pencil.** A teacher marks a score in pencil: a circled bar, an italic reminder. The
   brand's one colour — a deep **mahogany** `#8a3a23`, the colour of the upright's case,
   owner-editable — appears as the italic highlight in headings, the main buttons, selected
   choices and the booking band. It always carries **white** text (7.9:1).

What it avoids, on purpose: floating notes, treble clefs, waveforms, black-and-gold
"conservatoire" luxury, concert-hall and stage photography, ticket-booking aesthetics, card
grids, invented credentials, awards, testimonials or student statistics.

## Colour

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f7f3ec` score paper | the page |
| `--raised` | `#fffdf9` a fresh sheet | lesson rows of the first lesson, inputs, the booking sheet |
| `--oat` | `#efe7da` parchment | the first lesson and the music room bands, the weekly-lessons band |
| `--ink` | `#221c18` ebony | headings and strong text (15.6:1 on paper) |
| `--ink-soft` / `--muted` | `#3d342e` / `#64584f` | body / small print (11.4:1 / 6.4:1) |
| `--forest` | `#211915` the piano's ebony | How I teach, the booking sheet's header, the footer |
| `--accent` | `#8a3a23` mahogany (owner-editable) | italic highlights, buttons, selected choices, booking band; white text on it |
| `--accent-glow` | rosewood made from the accent | highlights and focus on ebony (≥ 4.5:1) |

The editor refuses an accent that would not carry white text at 4.5:1. Every text/background
pair on the page and in the booking sheet was measured in the browser: the lowest is 5.6:1.

## Type

**Alegreya** (Juan Pablo del Peral, OFL) for headings, figures, the name mark and captions —
a book face designed for literature, with a calligraphic rhythm and an italic that reads like
a teacher's handwriting without imitating it. **Alegreya Sans** for everything else, from the
same family, so the page is quiet and of a piece. The owner's `*highlight*` is set in the
italic, in the brand colour — never underlined or boxed. Small labels are Alegreya Sans
capitals, spaced. A "Sans serif" heading style is offered in the editor.

## Photography

One shoot, one room: a cottonbro studio series on Pexels — a mahogany upright piano, a
parquet floor, white panelled doors, a tall window and a brass candlestick, a teacher and a
teenage student. Eight frames: the lesson from behind (the first screen — nobody is presented
as *this* studio's teacher), the note labels a beginner starts with, the teacher playing and
listening, the empty room, practising by the window, the keys close up. One shared grade,
square corners, every frame labelled **Sample** until the owner replaces it. See `PHOTOS.md`.

## Layout

Calm, left-aligned and generous — a printed programme, not an app.

1. **First screen.** Words left (eyebrow, headline with one italic phrase, a short paragraph,
   **Book a first lesson** + "See lessons & prices", the first lesson's real length and price
   from the engine, today's hours, who lessons are for); the lesson photograph right, upright
   4:5 with the staff under it. Phones: the words and both actions first, then the photo.
2. **1 Lessons & prices** — three facts (one booking is one lesson · weekly lessons are
   arranged together · paid at the studio); lessons grouped *Your first lesson* (set apart
   on a fresh sheet with a mahogany edge), *Piano lessons*, *Theory & coaching*; each row with
   what happens, who it suits, its length and its price per lesson, and Book; the "Looking for
   regular weekly lessons?" band; the note about prices.
3. **2 Your first lesson** (parchment) — what it is and isn't, its length and price as large
   figures, four short facts, Book; the five finger-numbered steps; what to bring and the
   honest note on the first-lesson price.
4. **3 How I teach** (ebony) — a statement set large in italics, two photographs, a short
   paragraph and five principles.
5. **4 Who it's for** — a ruled list of students; *Younger students* (a parent or guardian
   books); what the studio doesn't teach.
6. **5 The music room** (parchment) — text and what the room has; four frames as two level
   rows (wide beside upright, then mirrored).
7. **6 Good to know** · **Book a lesson** (mahogany band) · **7 Visit** · **Footer** (ebony).

Every section works with its optional photos removed (checked: hero text-only, first lesson
without photo, one teaching photo, two room frames).

## Interaction

- Every Book button opens the booking sheet; the first-lesson buttons open it with the first
  lesson chosen (found by name, never by id); a lesson row opens it with that lesson. While
  online booking is off, every Book leads to the booking band and the studio's contact
  details.
- The sheet is the shared booking flow: lesson → day and time → details → 6-digit code →
  **"Lesson request received — we'll confirm your appointment shortly."** The notes field is
  **About your music goals (optional)**; the name field tells parents to book with their own
  details.
- Motion is restrained: the first screen rises in once and its photograph settles; reduced
  motion removes both. 44 px minimum targets, visible focus in the brand colour (rosewood on
  ebony), no autoplay audio, no carousels.

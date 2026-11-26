# Private Music Lessons Studio Booking Website — "Manuscript" Starter

A finished, premium booking website for an independent private music teacher, ready to make
your own with Claude Code and publish on Hostinger. It ships as **Una Corda Piano Studio**, a
fictional one-teacher piano studio in Kerrytown, Ann Arbor, teaching piano and music theory to
complete beginners, adults returning to the piano and students from age 9:

- a one-page studio website — a first screen with a lesson at an upright piano, a warm serif
  headline, **Book a first lesson**, the first lesson's real length and price, today's hours
  and who lessons are for; **lessons & prices** grouped as *Your first lesson*, *Piano
  lessons* and *Theory & coaching*, each with its length, its price per lesson and who it
  suits; **your first lesson** — what it is (a real, single lesson, not a sign-up), its five
  steps numbered like finger numbers, what to bring; **how I teach**; **who it's for** (with
  how parents book for younger students); **the music room**; *Good to know* (sample
  policies, labelled); directions — from 320 px phones up, with booking in a sheet over the
  page;
- online booking — **one lesson per booking**, a day and time, contact details and an
  optional note **About your music goals**, and an emailed 6-digit code; the teacher confirms
  each request ("Lesson request received — we'll confirm your appointment shortly");
- the owner dashboard at `/admin/` — requests to confirm, lessons and prices, teaching hours
  and closures, email health, and the website's own text, photos, brand colour and heading
  style.

The look — *Manuscript*: a music room in afternoon light, and the manuscript on the stand.
Score-paper pages, ebony type, parchment and ebony bands, and one **brand colour** (mahogany
by default) that carries white text — the italic highlights, the buttons, the booking band.
The one ornament is the **staff**: five fine lines, nothing ever written on them. Alegreya
over Alegreya Sans.

Booking runs on [`@profitstudio/booking-engine`](https://www.npmjs.com/package/@profitstudio/booking-engine)
**2.0.0** (pinned) with your own Supabase project and Resend for email.

## 1. Try it (no accounts needed)

```bash
npm install
npm run dev:demo   # the full Live Demo: book, then manage it at /admin/
npm run dev        # preview mode: the website with sample times, nothing saved
```

In the Live Demo everything stays in your browser — nothing is sent anywhere.

## 2. Make it yours with Claude Code

Open this folder in a Claude Code session and paste the prompt in
[`CUSTOMIZE.md`](CUSTOMIZE.md), filled in with your studio. Claude edits a short list of
files (name, city, words, colours) — the booking system, the dashboard and the layout stay as
they are.

Lessons, prices, teaching hours and contact details are **not** code: you set them in the
dashboard once the booking backend is connected. **Your own photographs** — the first screen,
the first lesson, two teaching photos and four of the room — go in the dashboard → Website;
each sample photo stays labelled "Sample" until you replace it. Your name, training and
experience are yours to add: the starter invents none.

**A booking is one lesson.** The booking engine books single appointments on one calendar —
one teacher's time. A first lesson is one lesson at an introductory price, not enrolment;
regular weekly lessons are arranged with the teacher, and each one is still booked on its
own. Prices are per lesson and paid at the studio — nothing is paid online. Recurring
lessons, terms, packages or credits, several teachers' calendars, group classes, student
profiles, progress tracking, practice assignments, guardian accounts and online lessons are
not part of the engine (see *What the engine does not do* in `CLAUDE.md`).

## 3. Connect real bookings

You need a free Supabase project and a Resend account for booking emails.

```bash
cp .env.example .env.local    # your Supabase Project URL + Publishable key (Windows Command Prompt: copy .env.example .env.local)
npx supabase@2 login          # once, in your own terminal
npx booking-engine connect --admin you@example.com
```

`connect` links the project, sets up the database and the booking-email function, and tells
you exactly what is left for you to do (your dashboard login and the two email secrets).
Full steps: the Profit Studio guide *Build a Premium Booking Website with Claude Code*,
Step 3, or `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` §11.

Never put a Supabase **Secret** key or your Resend API key in `.env.local`, in a prompt or in
Hostinger — the Resend key lives only in Supabase's Edge Function secrets.

## 4. Publish on Hostinger

Push this project to a private GitHub repository, then in Hostinger create a **Web App**
from it (Websites → Create site → Web App → Import Git Repository):

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` (never `build:demo`) |
| Output directory | `dist` |
| Node.js | 22 or newer |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public values only) |

`dist/` contains the website and `dist/admin/` the dashboard. Every push to `main` redeploys.

## What is in this folder

| | |
|---|---|
| `src/site.config.ts` | The business name, time zone and preview contact details |
| `src/content/site.ts` | Everything the owner can edit in the dashboard → Website, with its default text and photos |
| `src/styles/tokens.css` | The design's colours, type and spacing (one file); `DESIGN.md` explains the system |
| `src/components/` | The website (`Hero`, `Lessons`, `FirstLesson`, `Approach` — how I teach, `Audience` — who it's for, `Room` — the music room, `GoodToKnow`, `Visit`…) and its booking flow (`src/components/booking/`) |
| `src/lib/preset.ts` | The sample lessons and hours used by preview mode and offered in a new dashboard |
| `src/lib/services.ts` | How lessons find their kind (by the words in their names), the first lesson, lengths and prices per lesson, and who a lesson suits (from "For:" in the description) |
| `admin/` + `src/admin-main.tsx` | The packaged dashboard, mounted at `/admin/` |
| `src/demo/` | The Live Demo's in-browser engine and sample data — used only by `dev:demo` / `build:demo`; a normal build contains none of it |
| `supabase/` | The engine's database migrations and email function (managed by `npx booking-engine`; do not edit) |
| `CLAUDE.md`, `BOOKING_ENGINE.md` | Rules Claude Code follows in this project |
| `PHOTOS.md`, `ASSETS.md` | The Pexels photos (Pexels License), credited file by file |

## Commands

```bash
npm run dev          # preview mode (sample data) until .env.local exists — http://localhost:5181
npm run dev:demo     # the Live Demo (in-browser data, dashboard included)
npm run build        # production build → dist/
npm run build:demo   # the public Live Demo build → dist/ (never deploy this as your site)
npx booking-engine doctor             # checks versions, engine files and keys
npx booking-engine doctor --dist dist # after a build: also scans the output for secrets
```

## Licence

The code is MIT-licensed — see [`LICENSE`](LICENSE) (Copyright (c) 2026 Youssef Es-salhi).
Photographs and other third-party assets keep their own terms, listed file by file in
[`ASSETS.md`](ASSETS.md).

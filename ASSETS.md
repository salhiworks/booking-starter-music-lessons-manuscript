# Assets and their terms

The code in this repository is MIT-licensed (`LICENSE`). The assets below are not: each keeps
its own terms.

## Photographs — Pexels License

Eight frames from eight Pexels photographs, all from one shoot in one music room by cottonbro
studio, downloaded into the project (never hot-linked), then cropped, graded once for the whole
set and exported for their frames. Only the processed frames are in this repository. They are
sample imagery from another music room: nobody shown teaches at, studies at or endorses the
(fictional) studio, and none of it is the studio's room. Printed music on the piano shows no
legible title, composer or publisher. Full details and crops: `PHOTOS.md`.

| Files (`public/photos/`) | Source | Photographer | Licence (checked 2026-11-10) |
|---|---|---|---|
| `hero-lesson-{640,1000,1400}.{avif,webp}` | [Pexels 10222312](https://www.pexels.com/photo/two-people-sitting-on-wooden-chair-playing-piano-10222312/) | cottonbro studio | Pexels License |
| `first-keys-{800,1200,1600}.{avif,webp}` | [Pexels 10222323](https://www.pexels.com/photo/person-sticking-an-adhesive-tape-on-piano-keys-10222323/) | cottonbro studio | Pexels License |
| `approach-lesson-{800,1200,1600}.{avif,webp}` | [Pexels 10222308](https://www.pexels.com/photo/man-and-teenage-boy-sitting-by-the-piano-10222308/) | cottonbro studio | Pexels License |
| `approach-listen-{480,800,1200}.{avif,webp}` | [Pexels 10222317](https://www.pexels.com/photo/a-man-teaching-a-boy-to-play-piano-10222317/) | cottonbro studio | Pexels License |
| `room-piano-{800,1200,1600}.{avif,webp}` | [Pexels 10222199](https://www.pexels.com/photo/wooden-piano-and-chair-near-white-wall-10222199/) | cottonbro studio | Pexels License |
| `room-practice-{800,1200,1600}.{avif,webp}` | [Pexels 10222167](https://www.pexels.com/photo/boy-sitting-on-wooden-chair-playing-the-piano-10222167/) | cottonbro studio | Pexels License |
| `room-keys-{480,800,1200}.{avif,webp}` | [Pexels 10222172](https://www.pexels.com/photo/ivory-piano-keys-in-close-up-view-10222172/) | cottonbro studio | Pexels License |
| `room-labels-{480,800,1200}.{avif,webp}` | [Pexels 10222316](https://www.pexels.com/photo/piano-keyboard-in-close-up-photography-10222316/) | cottonbro studio | Pexels License |

**Terms.** Pexels License (https://www.pexels.com/license/): free to use and modify,
commercially or not, without attribution (credit is given here anyway); not to be sold
unaltered, redistributed as stock on other platforms, or used to suggest that identifiable
people endorse a product or business, or in an offensive way. People, trademarks, works and
property shown keep their own rights. **If you build your own studio's site from this starter,
replace these with photographs of your own room and piano (and, with consent, your
students).**

## Not in this repository (installed by `npm install`)

| Package | Licence | Notes |
|---|---|---|
| `@profitstudio/booking-engine` 2.0.0-beta.4 | MIT | The booking engine and the packaged dashboard |
| `react`, `react-dom` | MIT | |
| `@fontsource/alegreya` | OFL-1.1 | Typeface (Alegreya — Juan Pablo del Peral, Huerta Tipográfica) |
| `@fontsource/alegreya-sans` | OFL-1.1 | Typeface (Alegreya Sans — Juan Pablo del Peral, Huerta Tipográfica) |

Fonts are bundled into your build by Vite; the SIL Open Font License 1.1 allows that.

## Original work (MIT, see LICENSE)

- `public/favicon.svg` — drawn in SVG for this starter (an italic U over five staff lines).
- Every ornament that is code: the staff (`.staff`, `--staff` in `src/styles/tokens.css` /
  `base.css`) in the section labels, under the first photograph, over the first-lesson steps,
  on the weekly-lessons and booking bands and under the footer's name; the finger-numbered
  steps; the italic highlight.
- The brand "Una Corda Piano Studio", its copy and its address are fictional, made for this
  starter (Detroit Street in Kerrytown, Ann Arbor is a real street; the number and business
  are invented); the `.example` addresses and `555` phone numbers are reserved for examples.
- No audio is included. A short recorded demonstration (for example, the first piece a
  beginner learns) could be valuable, but would be the owner's own recording, never autoplayed.

import type { Preset } from '@profitstudio/booking-engine';

/**
 * Una Corda Piano Studio's own preset (INTEGRATION.md §5): the sample lessons,
 * hours and policies preview mode shows, and the starter set the dashboard
 * offers an owner who has no services yet (<BookingAdmin presets>). Prices are
 * in US dollars, in cents.
 *
 * WHAT A BOOKING IS HERE. One booking = ONE private lesson with the studio's
 * one teacher, on the studio's one calendar. Its length is the real length of
 * the lesson. A booking is never a course, a term or a weekly place:
 *   - the FIRST LESSON is a real, single lesson at an introductory price — it
 *     enrols the student in nothing; whether lessons continue, and at what
 *     regular time, is agreed with the teacher afterwards;
 *   - every other lesson is one lesson. Regular weekly lessons are arranged
 *     with the teacher directly (each one is still its own booking); the
 *     engine does not hold a weekly slot, run a term or sell a package.
 * The buffer after each lesson is the teacher's time to write a short note for
 * the student and air the room before the next one.
 *
 * WHAT A PRICE IS HERE. The engine has one price per service: the price of
 * that one lesson, paid at the studio (src/lib/services.ts → priceTerms). Zero
 * reads as free. Nothing is paid online: the engine books appointments only.
 * The studio confirms every request (`autoConfirm: false`) — which is also
 * when the teacher checks a first-lesson request is a first lesson.
 *
 * Who a lesson suits is written at the end of its description after "For:",
 * separated by "·" — the website shows it as a short "Suits" line.
 */
export const sitePreset = {
  id: 'music-lessons',
  label: 'Private Music Lessons Studio',
  terminology: { customer: 'student', customers: 'students', booking: 'lesson', bookings: 'lessons' },
  previewBusiness: {
    name: 'Sample Piano Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 734-555-0100',
      address: '100 Example Street, Ann Arbor, MI',
    },
  },
  policies: {
    slotIntervalMinutes: 15,
    minNoticeMinutes: 720,
    maxAdvanceDays: 60,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // Lessons mostly after school and after work; a morning on Friday and Saturday for adults; closed Sunday.
  workingHours: [
    { weekday: 1, start: '13:00', end: '20:00' },
    { weekday: 2, start: '13:00', end: '20:00' },
    { weekday: 3, start: '13:00', end: '20:00' },
    { weekday: 4, start: '13:00', end: '20:00' },
    { weekday: 5, start: '10:00', end: '16:00' },
    { weekday: 6, start: '09:00', end: '14:00' },
  ],
  services: [
    {
      name: 'First Piano Lesson',
      description:
        'A real lesson, one to one, at a lower first-time price. We talk about the music you like and any playing you have done, find a comfortable way to sit and hold your hands, and you play your first short piece or pattern before you leave. It is a single lesson — it signs you up for nothing. For: complete beginners · returning players · anyone deciding whether lessons are for them',
      durationMinutes: 30,
      bufferAfterMinutes: 15,
      priceCents: 3000,
      priceFrom: false,
    },
    {
      name: 'Beginner Piano Lesson',
      description:
        'A shorter lesson for the first months: reading the notes, finding your way round the keyboard, steady rhythm and both hands together, a little at a time. For: beginners from age 9 · adults starting out',
      durationMinutes: 30,
      bufferAfterMinutes: 15,
      priceCents: 4000,
      priceFrom: false,
    },
    {
      name: 'Private Piano Lesson',
      description:
        'The usual lesson once you are playing: technique, the pieces you are learning, reading and practice ideas for the week. For: students past the first months · adults returning to the piano',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 5500,
      priceFrom: false,
    },
    {
      name: 'Extended Piano Lesson',
      description:
        'A full hour for longer pieces and more detailed work on sound, phrasing and pedalling — and time to play a piece through. For: intermediate players · adults with more to work on',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 7000,
      priceFrom: false,
    },
    {
      name: 'Music Theory & Reading',
      description:
        'Reading music fluently, keys and scales, chords and how a piece is put together — at the piano, so it stays practical. For: pianists of any level · adult beginners who want to read music',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 5000,
      priceFrom: false,
    },
    {
      name: 'Repertoire Coaching',
      description:
        'One hour on a piece you already play — for a recital, a family occasion or simply to finish it well. Bring your copy of the music. For: intermediate and advanced players · a specific piece',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 7500,
      priceFrom: false,
    },
  ],
} satisfies Preset;

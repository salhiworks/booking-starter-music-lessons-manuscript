import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Lessons, prices, durations, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 */
const MARK_HELP = 'Wrap a few words in *asterisks* to set them in italics, in your brand colour.';
const SAMPLE_HELP = 'A “Sample” label stays on it until you replace it with a photo of your own studio, piano or lessons.';

const STEP_FIELDS = [
  { type: 'text', id: 'title', label: 'Step', default: '', maxLength: 48, required: true },
  { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 240, rows: 2 },
] as const;

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo, the brand colour and the heading style.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The short name in the header and footer. One or two words read best.',
          default: 'Una Corda',
          maxLength: 22,
          required: true,
        },
        {
          type: 'text',
          id: 'brand.descriptor',
          label: 'Line under the name mark',
          help: 'What you are, in two or three words. Shown small beside the name in the header.',
          default: 'Piano Studio · Ann Arbor',
          maxLength: 32,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide, dark logo on a transparent background — the header is a warm white. It replaces the name mark in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Brand colour',
          help: 'Used for the main buttons, highlighted words, selected choices and the first-lesson band. Buttons carry white text, so pick a deep colour — mahogany, ink blue, bottle green, plum. Light colours are refused because white text would not read on them.',
          default: '#8a3a23',
          contrastWith: '#ffffff',
          minContrast: 4.5,
        },
        {
          type: 'choice',
          id: 'brand.headings',
          label: 'Heading style',
          default: 'serif',
          options: [
            { value: 'serif', label: 'Serif', description: 'Warm, book-like headings with italic highlights — the original design.' },
            { value: 'sans', label: 'Sans serif', description: 'The same layout with plainer, more modern headings.' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Una Corda Piano Studio — private piano lessons in Ann Arbor',
          maxLength: 80,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'Private piano and music theory lessons in Kerrytown, Ann Arbor — for complete beginners, adults returning to the piano and students from age 9. Book a first lesson online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
    {
      id: 'hero',
      label: 'Welcome',
      description: 'The first screen: the headline, the buttons, one photo and the short list of who lessons are for.',
      fields: [
        {
          type: 'text',
          id: 'hero.eyebrow',
          label: 'Small line above the headline',
          default: 'Private piano lessons · Kerrytown, Ann Arbor',
          maxLength: 64,
        },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: MARK_HELP,
          default: 'Learn the piano, *one lesson at a time.*',
          maxLength: 64,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'One-to-one lessons in a quiet, daylit room with an upright piano. Complete beginners are welcome — so are adults coming back after years away. We start with the music you’d like to play and go at the pace that suits you.',
          maxLength: 300,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Main button', help: 'Opens the booking with your first lesson chosen.', default: 'Book a first lesson', maxLength: 28, required: true },
        {
          type: 'text',
          id: 'hero.secondary',
          label: 'Second link',
          help: 'Leads to your lessons and prices. Leave empty to hide it.',
          default: 'See lessons & prices',
          maxLength: 40,
        },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo (upright)',
          help: `Upright (4:5) — a lesson at your piano, or the piano in its room, reads best. Keep the whole keyboard and the hands on it in the frame. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/hero-lesson-1000.webp',
            alt: 'Seen from behind, a teacher and a student sit side by side on wooden chairs at a mahogany upright piano in a room with white panelled doors and a parquet floor.',
            width: 1000,
            height: 1250,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'text',
          id: 'hero.forTitle',
          label: 'Who lessons are for — title',
          help: 'A short list beside the photo, so visitors know at once whether lessons suit them. Leave empty to hide it.',
          default: 'Lessons for',
          maxLength: 32,
        },
        {
          type: 'list',
          id: 'hero.forList',
          label: 'Who lessons are for — lines',
          itemLabel: 'Line',
          maxItems: 5,
          fields: [{ type: 'text', id: 'text', label: 'Line', default: '', maxLength: 36, required: true }],
          default: [{ text: 'Complete beginners' }, { text: 'Adults returning to the piano' }, { text: 'Students from age 9' }, { text: 'Reading music & theory' }],
        },
        {
          type: 'text',
          id: 'hero.note',
          label: 'One honest line under the list',
          help: 'For example how lessons are given. Leave empty to hide it.',
          default: 'In person, one to one — no group classes or online lessons.',
          maxLength: 80,
        },
      ],
    },
    {
      id: 'lessons',
      label: 'Lessons & prices',
      description:
        'Lesson names, lengths and prices come from Services in this dashboard. The page groups them by the words in their names: first, trial or introductory → Your first lesson; theory, reading or coaching → Theory & coaching; everything else with piano or lesson → Piano lessons. End a description with “For:” and items separated by “·” to show who it suits.',
      fields: [
        { type: 'text', id: 'lessons.title', label: 'Title', help: MARK_HELP, default: 'Lessons & *prices*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'lessons.intro',
          label: 'Introduction',
          default: 'Every lesson is private — just you and your teacher at the piano. Choose a length that suits your stage; you can always change it later.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'list',
          id: 'lessons.terms',
          label: 'How booking works',
          help: 'Three short facts shown above the list.',
          itemLabel: 'Fact',
          maxItems: 3,
          fields: [
            { type: 'text', id: 'title', label: 'Fact', default: '', maxLength: 44, required: true },
            { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 200, rows: 2 },
          ],
          default: [
            {
              title: 'One booking is one lesson',
              text: 'Each booking reserves a single lesson at the time you choose. Nothing repeats or renews by itself.',
            },
            {
              title: 'Weekly lessons, arranged together',
              text: 'If you’d like a regular time, we agree it after your first lesson. Each lesson is still booked as its own appointment.',
            },
            {
              title: 'Paid at the studio',
              text: 'Prices are per lesson. Nothing is charged online — you pay at the lesson.',
            },
          ],
        },
        {
          type: 'longText',
          id: 'lessons.noteFirst',
          label: 'Note beside “Your first lesson”',
          default: 'Start here, whatever your level — a real lesson at a lower first-time price.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'lessons.notePiano',
          label: 'Note beside “Piano lessons”',
          default: 'Shorter lessons suit the first months; longer ones leave room for bigger pieces.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'lessons.noteTheory',
          label: 'Note beside “Theory & coaching”',
          default: 'For reading music with confidence, or for one piece you want to play well.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'text',
          id: 'lessons.weeklyTitle',
          label: '“Weekly lessons” — title',
          help: 'A band that explains how regular lessons work and opens the booking with your first lesson. Leave empty to hide it.',
          default: 'Looking for regular weekly lessons?',
          maxLength: 56,
        },
        {
          type: 'longText',
          id: 'lessons.weeklyText',
          label: '“Weekly lessons” — text',
          default: 'Start with a first lesson and we’ll talk about a schedule that suits you. Online booking reserves one lesson at a time — a regular weekly time is something we agree together.',
          maxLength: 260,
          rows: 3,
        },
        {
          type: 'longText',
          id: 'lessons.priceNote',
          label: 'About prices',
          help: 'Shown under the list. Keep it honest: nothing is paid online, and booking reserves one lesson.',
          default:
            'Prices are for one lesson and are paid at the studio by card or cash — nothing is charged when you book. There are no registration fees, terms or packages to buy. Music books, if you need them, are your own; I’ll suggest one at your first lesson.',
          maxLength: 480,
          rows: 4,
        },
      ],
    },
    {
      id: 'first',
      label: 'Your first lesson',
      description:
        'What a first lesson is and what happens in it. The length and price shown come from your first lesson in Services (the first service whose name says first, trial or introductory).',
      fields: [
        { type: 'text', id: 'first.title', label: 'Title', help: MARK_HELP, default: 'Your *first lesson*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'first.intro',
          label: 'Introduction',
          default:
            'A first lesson is a real lesson, not a sales talk. You’ll play, ask questions and get a feel for how I teach — and I’ll get to know what you’d like from the piano. It’s a single lesson: it doesn’t sign you up for anything.',
          maxLength: 360,
          rows: 4,
        },
        {
          type: 'list',
          id: 'first.facts',
          label: 'In short',
          help: 'Short facts beside the length and price.',
          itemLabel: 'Fact',
          maxItems: 4,
          fields: [{ type: 'text', id: 'text', label: 'Fact', default: '', maxLength: 64, required: true }],
          default: [
            { text: 'Complete beginners welcome — no reading needed' },
            { text: 'Adults and students from age 9' },
            { text: 'You play on the studio’s piano' },
            { text: 'One lesson — no commitment to continue' },
          ],
        },
        {
          type: 'list',
          id: 'first.steps',
          label: 'What happens in your first lesson',
          itemLabel: 'Step',
          maxItems: 5,
          fields: STEP_FIELDS,
          default: [
            { title: 'Settle in', text: 'Come in, hang up your coat, and we adjust the bench so you sit comfortably at the keys.' },
            { title: 'Talk about music', text: 'What you enjoy listening to, anything you’ve played before, and what you’d love to be able to play.' },
            { title: 'Find your way round the keys', text: 'How the keyboard is laid out, where your hands rest, and how to make a clear, relaxed sound.' },
            { title: 'Play something', text: 'A short piece or pattern you can actually play by the end — with both hands if it feels right.' },
            { title: 'Talk about next steps', text: 'A few practice ideas for the week, a book if you need one, and — if you’d like to continue — a regular time.' },
          ],
        },
        {
          type: 'longText',
          id: 'first.policy',
          label: 'About the first-lesson price',
          help: 'Keep it honest. The booking system does not check who has had a first lesson — you do, when you confirm the request.',
          default:
            'The first-lesson price is for new students, once. The booking system doesn’t check this — I do, when I confirm your request, and I’ll let you know if a regular lesson fits better.',
          maxLength: 300,
          rows: 3,
        },
        {
          type: 'longText',
          id: 'first.bring',
          label: 'What to bring',
          default: 'Nothing but yourself. If you have music you’ve played before, or a piece you’d love to learn, bring it along — or just tell me its name.',
          maxLength: 260,
          rows: 2,
        },
        {
          type: 'image',
          id: 'first.photo',
          label: 'Photo (wide)',
          help: `Wide (3:2) — a first steps moment reads best: hands on the keys, a finger guided to a note. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/first-keys-1200.webp',
            alt: 'Close up, a teacher’s hand presses a small paper label onto a piano key while a student’s finger rests on the white keys, each labelled with its note name: C, D, E, F, G, A, B.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
      ],
    },
    {
      id: 'approach',
      label: 'How I teach',
      description: 'Your teaching approach: a short statement, a few principles and two photos. No awards, certificates or years of experience unless they are really yours.',
      fields: [
        { type: 'text', id: 'approach.title', label: 'Title', help: MARK_HELP, default: 'How I *teach*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'approach.statement',
          label: 'Statement',
          help: 'One or two sentences, set large.',
          default: 'Good lessons feel like music from the first week — not a list of exercises to get through before the fun starts.',
          maxLength: 220,
          rows: 3,
        },
        {
          type: 'longText',
          id: 'approach.text',
          label: 'Text',
          default:
            'Every lesson is planned around one student: what you want to play, how you learn best, and how much time you really have to practise. Technique, reading and theory all matter — I bring them in through the music, a little at a time, so they make sense when you need them.',
          maxLength: 700,
          rows: 5,
        },
        {
          type: 'list',
          id: 'approach.principles',
          label: 'Principles',
          itemLabel: 'Principle',
          maxItems: 6,
          fields: STEP_FIELDS,
          default: [
            { title: 'Music you want to play', text: 'Classical, film and pop arrangements, jazz standards — we choose pieces together, at a level that stretches without discouraging.' },
            { title: 'A comfortable pace', text: 'There’s no syllabus to race through. We move on when something feels secure, not when a calendar says so.' },
            { title: 'Healthy technique', text: 'A relaxed posture, a good hand shape and a clear sound, built in from the start so playing stays comfortable.' },
            { title: 'Reading and rhythm', text: 'Notes, rhythm and a little theory, always connected to what you’re playing that week.' },
            { title: 'Practice that fits your week', text: 'Short, specific ideas for practising — even ten minutes a day is worth planning well.' },
          ],
        },
        {
          type: 'image',
          id: 'approach.photo',
          label: 'Photo (wide)',
          help: `Wide (3:2) — a lesson in progress reads best. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/approach-lesson-1200.webp',
            alt: 'A teacher plays a phrase at a mahogany upright piano while a student sitting beside him watches his hands; an open book of music stands on the piano.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
        {
          type: 'image',
          id: 'approach.photo2',
          label: 'Second photo (upright)',
          help: `Upright (4:5). Remove it to show the first photo alone. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/approach-listen-800.webp',
            alt: 'A teacher stands beside the upright piano, listening with his hands together, while a student seated on a wooden chair plays from an open book of music.',
            width: 800,
            height: 1000,
          },
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'audience',
      label: 'Who lessons are for',
      description: 'Help visitors see whether lessons suit them. Keep it to the students you really teach — and say how younger students are booked.',
      fields: [
        { type: 'text', id: 'audience.title', label: 'Title', help: MARK_HELP, default: 'Is it *for you?*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'audience.intro',
          label: 'Introduction',
          default: 'Most of my students are adults and teenagers, and many had never touched a piano before their first lesson.',
          maxLength: 260,
          rows: 2,
        },
        {
          type: 'list',
          id: 'audience.items',
          label: 'Students',
          itemLabel: 'Student',
          maxItems: 6,
          fields: STEP_FIELDS,
          default: [
            { title: 'Complete beginners', text: 'You don’t need to read music or own a piano yet. We start at the very beginning.' },
            { title: 'Adults returning to the piano', text: 'Played as a child and stopped? Much of it comes back faster than you expect — we fill the gaps calmly.' },
            { title: 'Students from age 9', text: 'Children and teenagers who want to learn properly, with a parent or guardian arranging lessons.' },
            { title: 'Players building technique', text: 'You can play, but want a better sound, more control and pieces that ask a bit more of you.' },
            { title: 'Readers and theory learners', text: 'For anyone who wants to read music fluently or understand how the pieces they love are built.' },
          ],
        },
        {
          type: 'longText',
          id: 'audience.guardian',
          label: 'Younger students',
          help: 'How lessons for under-18s are arranged. The booking system does not check age or guardian status — keep this to how you really work.',
          default:
            'For students under 18, a parent or guardian makes the booking with their own name, email and phone number, and comes to the first lesson. We agree any other arrangements — who drops off and picks up, who stays during lessons — in person.',
          maxLength: 400,
          rows: 4,
        },
        {
          type: 'text',
          id: 'audience.not',
          label: 'What you don’t teach',
          help: 'One honest line. Leave empty to hide it.',
          default: 'I teach piano only — not other instruments, singing or children under 9.',
          maxLength: 100,
        },
      ],
    },
    {
      id: 'room',
      label: 'The music room',
      description: 'Where lessons happen: a few paragraphs, four photos and what the room has. Each sample photo carries a “Sample” label until you replace it.',
      fields: [
        { type: 'text', id: 'room.title', label: 'Title', help: MARK_HELP, default: 'The music *room*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'room.text',
          label: 'Text',
          default:
            'Lessons happen in one room on the second floor of a quiet house in Kerrytown: an upright piano by the window, two chairs, a shelf of music books and good daylight in the afternoon.\n\nIt’s a calm place to concentrate and to make mistakes in — nobody else is waiting in the room, and nothing is recorded.',
          maxLength: 900,
          rows: 6,
        },
        {
          type: 'image',
          id: 'room.photo1',
          label: 'Photo 1 — the room (wide)',
          help: `Wide (3:2) — the whole room with the piano. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/room-piano-1200.webp',
            alt: 'An empty music room: a mahogany upright piano with an open book of music and a wooden chair, a tall shelf, a small framed picture and white panelled doors over a parquet floor.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
        { type: 'text', id: 'room.caption1', label: 'Caption 1', default: 'The piano and the music shelf', maxLength: 64 },
        {
          type: 'image',
          id: 'room.photo2',
          label: 'Photo 2 (wide)',
          help: `Wide (3:2). Remove it to show fewer. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/room-practice-1200.webp',
            alt: 'A student practises at the upright piano from an open score, beside a brass candlestick, an armchair and a tall window.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
        { type: 'text', id: 'room.caption2', label: 'Caption 2', default: 'Afternoon light for reading', maxLength: 64 },
        {
          type: 'image',
          id: 'room.photo3',
          label: 'Photo 3 (upright)',
          help: `Upright (4:5). Remove it to show fewer. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/room-keys-800.webp',
            alt: 'The ivory and black keys of the upright piano, close up, in soft side light.',
            width: 800,
            height: 1000,
          },
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'room.caption3', label: 'Caption 3', default: 'An acoustic upright, tuned regularly', maxLength: 64 },
        {
          type: 'image',
          id: 'room.photo4',
          label: 'Photo 4 (upright)',
          help: `Upright (4:5). Remove it to show fewer. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/room-labels-800.webp',
            alt: 'Piano keys with small paper labels naming the notes C, D, E, F and G, seen at an angle.',
            width: 800,
            height: 1000,
          },
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'room.caption4', label: 'Caption 4', default: 'Note labels for the first weeks', maxLength: 64 },
        {
          type: 'list',
          id: 'room.facts',
          label: 'In the room',
          itemLabel: 'Fact',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'title', label: 'Fact', default: '', maxLength: 48, required: true },
            { type: 'text', id: 'text', label: 'Detail', default: '', maxLength: 110 },
          ],
          default: [
            { title: 'An acoustic upright piano', text: 'Tuned regularly, with an adjustable bench.' },
            { title: 'Music to borrow', text: 'Beginner books and scores to try before you buy your own.' },
            { title: 'A seat for a parent', text: 'Parents of younger students are welcome to stay.' },
            { title: 'In person only', text: 'No online or recorded lessons.' },
          ],
        },
      ],
    },
    {
      id: 'goodToKnow',
      label: 'Good to know',
      description: 'Practical answers before a first lesson. These are sample policies — make them yours.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Title', help: MARK_HELP, default: 'Good to *know*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 12,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 120, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'Do I need my own piano?',
              answer:
                'Not for your first lesson — you play on the studio’s piano. To make progress you’ll need something to practise on at home. A digital piano with 88 full-size, weighted keys and a pedal is fine for years; we can talk about options at your first lesson.',
            },
            {
              question: 'Can I start with no experience at all?',
              answer: 'Yes. Many students start from nothing — no reading, no keyboard at home yet. The first lesson is built for exactly that.',
            },
            {
              question: 'Can adults learn the piano?',
              answer:
                'Absolutely. Adults often progress steadily because they choose to be there. We plan around the time you really have to practise, and the music you actually want to play.',
            },
            {
              question: 'Is a first lesson available, and what does it cost?',
              answer:
                'Yes — the first lesson is a real lesson at a lower price, for new students. Its length and price are shown under Lessons & prices. It’s one lesson and signs you up for nothing.',
            },
            {
              question: 'What should I bring?',
              answer: 'Nothing for a first lesson. After that, your music book and a pencil. Short nails make playing easier.',
            },
            {
              question: 'How long should my lessons be?',
              answer:
                'A shorter lesson suits most beginners and younger students — concentration matters more than minutes. Longer lessons make sense once pieces get longer. We’ll decide together after the first lesson.',
            },
            {
              question: 'Can a parent arrange lessons for a child?',
              answer:
                'Yes — and for anyone under 18, a parent or guardian should make the booking with their own contact details. Please don’t put a child’s personal details in the booking note; tell me their first name and age at the lesson. A parent comes to the first lesson.',
            },
            {
              question: 'How do I arrange regular weekly lessons?',
              answer:
                'Book a first lesson; afterwards we agree a regular time that suits us both. Each lesson is still booked on its own — the online booking doesn’t hold a weekly place automatically.',
            },
            {
              question: 'How do cancellations work?',
              answer:
                'Please let me know at least 24 hours ahead by phone or email so another student can have the time. Lessons cancelled later, or missed, are normally charged. If I have to cancel, I’ll offer another time.',
            },
            {
              question: 'Are lessons in person or online?',
              answer: 'In person only, at the studio. I don’t teach online, and lessons are not recorded.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The words around the booking. Times and availability come from the engine.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Title', help: MARK_HELP, default: 'Book a *lesson*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose a first lesson or a regular lesson, then a time. No account needed — it takes about a minute, and I read your note before I confirm.',
          maxLength: 280,
          rows: 2,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Opening hours, the address, phone and email come from your business settings and opening hours.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Title', help: MARK_HELP, default: 'Find the *studio*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Finding us',
          default:
            'On Detroit Street in Kerrytown, a short walk from the Farmers Market. Ring the bell marked “Una Corda” — the studio is on the second floor, up one flight of stairs (if stairs are difficult for you, tell me before your first lesson). There’s metered parking on the street and a bike rack by the door. Please arrive a few minutes early; the previous lesson may still be finishing.',
          maxLength: 500,
          rows: 4,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [
        {
          type: 'text',
          id: 'footer.tagline',
          label: 'Footer line',
          default: 'Private piano lessons for beginners and returning players — Kerrytown, Ann Arbor.',
          maxLength: 100,
        },
      ],
    },
  ],
});

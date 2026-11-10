import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'music-lessons-manuscript',
  preset: sitePreset,
  business: {
    name: 'Una Corda Piano Studio',
    timezone: 'America/Detroit',
    email: 'lessons@unacorda.example',
    phone: '+1 734-555-0162',
    address: '214 Detroit Street, Ann Arbor, MI 48104',
  },
  ownerEmail: 'owner@unacorda.example',
  referencePrefix: 'UC',
  sampleNotes: [
    'Complete beginner — I have always wanted to learn and would love to play some film music one day.',
    'Booking for my daughter (10). She has played a little on a keyboard at home and reads a few notes.',
    'Played to about grade 4 as a teenager, stopped twenty years ago. Would like to get back to Chopin waltzes.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Eleanor Whitaker', email: 'eleanor.w@example.com', phone: '+1 734 555 0114' },
    { name: 'Rahul Menon', email: 'rahul.menon@example.com', phone: '+1 734 555 0127' },
    { name: 'Grace Okafor', email: 'grace.okafor@example.com', phone: '+1 734 555 0133' },
    { name: 'Michael Brandt', email: 'm.brandt@example.com', phone: '+1 734 555 0141' },
    { name: 'Sofia Lindqvist', email: 'sofia.l@example.com', phone: '+1 734 555 0156' },
    { name: 'David Kim', email: 'david.kim@example.com', phone: '+1 734 555 0162' },
    { name: 'Hannah Morales', email: 'hannah.m@example.com', phone: '+1 734 555 0175' },
    { name: 'Peter Novak', email: 'peter.novak@example.com', phone: '+1 734 555 0188' },
    { name: 'Aisha Rahman', email: 'aisha.rahman@example.com', phone: '+1 734 555 0193' },
    { name: 'Julia Bennett', email: 'julia.bennett@example.com', phone: '+1 734 555 0109' },
  ],
};

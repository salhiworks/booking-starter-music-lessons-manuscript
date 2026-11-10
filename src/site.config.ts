/**
 * This website's identity — the ONE place for its name, time zone and the
 * placeholder contact details shown in preview mode (`npm run dev` without
 * Supabase). Everything the owner manages (lessons, prices, hours, real
 * contact details, text and photos) lives in the dashboard at /admin/.
 */
export const SITE = {
  /** The business name. The dashboard's Business page overrides it once connected. */
  name: 'Una Corda Piano Studio',
  /** IANA time zone of the business. */
  timezone: 'America/Detroit',
  /** Fictional contact details for preview mode only. */
  previewContact: {
    email: 'lessons@unacorda.example',
    phone: '+1 734-555-0162',
    address: '214 Detroit Street, Ann Arbor, MI 48104',
  },
};

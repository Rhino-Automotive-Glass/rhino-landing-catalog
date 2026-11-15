import posthog from 'posthog-js';
import { initAnalytics } from './lib/analytics.client';

// GA4: canonical host only, DNT/GPC honored, manual page views (see docs/google-analytics.md).
initAnalytics();

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (projectToken) {
  posthog.init(projectToken, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    defaults: '2026-05-30',
    // Counts page views differently from GA (raw URLs, every history change, no host/DNT gate).
    // Kept as-is for now; see docs/google-analytics.md → PostHog.
    capture_pageview: 'history_change',
    // Use explicit business events without collecting contact form contents.
    autocapture: false,
    person_profiles: 'identified_only',
    disable_session_recording: true,
    disable_surveys: true,
  });
}

import posthog from 'posthog-js';

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (projectToken) {
  posthog.init(projectToken, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    defaults: '2026-05-30',
    capture_pageview: 'history_change',
    // Use explicit business events without collecting contact form contents.
    autocapture: false,
    person_profiles: 'identified_only',
    disable_session_recording: true,
    disable_surveys: true,
  });
}

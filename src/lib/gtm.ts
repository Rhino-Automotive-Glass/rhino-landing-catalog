import posthog from 'posthog-js';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  if (window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }

  if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
    posthog.capture(event, params);
  }
}

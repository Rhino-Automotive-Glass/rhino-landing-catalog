import posthog from 'posthog-js';
import type { AnalyticsEvent, AnalyticsParams, CtaLocation, CtaType } from './analytics';
import { track } from './analytics.client';

/**
 * Single call path for components: GA4 through `track()` (host, DNT/GPC and
 * URL-cleaning gates live there), plus PostHog with the same name and params.
 *
 * PostHog is intentionally NOT gated like GA yet (it keeps its previous
 * behavior); see docs/google-analytics.md → PostHog.
 */
export function trackEvent(event: Exclude<AnalyticsEvent, 'page_view'>, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return;

  track(event, params);

  if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
    posthog.capture(event, params);
  }
}

/** `cta_click` with the shared taxonomy; `link_domain` only for outbound http(s) links. */
export function trackCta(cta_type: CtaType, cta_location: CtaLocation, href?: string) {
  let link_domain: string | undefined;
  if (href && typeof window !== 'undefined') {
    try {
      const url = new URL(href, window.location.href);
      if (/^https?:$/.test(url.protocol) && url.origin !== window.location.origin) link_domain = url.hostname;
    } catch { /* not a URL */ }
  }
  trackEvent('cta_click', { cta_type, cta_location, link_domain });
}

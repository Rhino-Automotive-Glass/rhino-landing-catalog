"use client";

/**
 * Mount once in the root layout, inside <body>. Copy to
 * `components/analytics/PageAnalytics.tsx`.
 *
 * - One page_view per pathname (initial load included).
 * - section_view once per section per page view, for [data-analytics-section].
 * - cta_click for any click inside [data-cta]; no per-button handlers needed.
 *
 * Markup contract:
 *   <section data-analytics-section="pricing">…</section>
 *   <a href="https://wa.me/…" data-cta="whatsapp" data-cta-location="hero">…</a>
 * cta_location falls back to the nearest data-analytics-section, then header/footer/nav.
 */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { AnalyticsParams } from "@/lib/analytics";
import { analyticsEnabled, track, trackPageView } from "@/lib/analytics.client";

/**
 * Rhino: single-locale site (es-MX), no locale prefix in paths.
 * /agent identifies the agent only through ?id=, which campaignUrl strips.
 */
function pageParams(pathname: string): AnalyticsParams {
  const page_type =
    pathname === "/" ? "landing"
    : pathname.startsWith("/catalog/groups/") ? "catalog_group"
    : pathname === "/agent" ? "agent"
    : pathname === "/aviso-de-privacidad" ? "legal"
    : pathname === "/admin" ? "internal"
    : "supporting";
  return { page_type, locale: "es-MX" };
}

export function PageAnalytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!analyticsEnabled()) return;
    // Refs survive React Strict Mode's double effect, so dev sends one view too.
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      trackPageView(pageParams(pathname));
    }

    const seen = new Set<string>();
    const observed = new WeakSet<Element>();
    const sections = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).dataset.analyticsSection;
        if (!id || seen.has(id) || !entry.isIntersecting) continue;
        // Tall sections never reach a high ratio: also accept half a screen visible.
        if (entry.intersectionRatio >= 0.25 || entry.intersectionRect.height >= window.innerHeight * 0.5) {
          seen.add(id);
          track("section_view", { section_id: id });
        }
      }
    }, { threshold: [0, 0.1, 0.25, 0.5] });
    function observeNew() {
      document.querySelectorAll("[data-analytics-section]").forEach((element) => {
        if (!observed.has(element)) { observed.add(element); sections.observe(element); }
      });
    }
    // Streamed or client-rendered sections can appear after this effect.
    const mutations = new MutationObserver(observeNew);
    mutations.observe(document.body, { childList: true, subtree: true });
    observeNew();

    function click(event: MouseEvent) {
      if (event.type === "auxclick" && event.button !== 1) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cta]") : null;
      if (!target) return;
      const area = target.closest<HTMLElement>("[data-cta-location], [data-analytics-section], header, footer, nav");
      const href = target instanceof HTMLAnchorElement ? target.href : "";
      let link_domain: string | undefined;
      try {
        const url = new URL(href);
        if (/^https?:$/.test(url.protocol) && url.origin !== window.location.origin) link_domain = url.hostname;
      } catch { /* empty or not a URL */ }
      track("cta_click", {
        cta_type: target.dataset.cta,
        cta_location: area?.dataset.ctaLocation || area?.dataset.analyticsSection || area?.tagName.toLowerCase() || "page",
        link_domain,
      });
    }
    document.addEventListener("click", click, true);
    document.addEventListener("auxclick", click, true);

    return () => {
      sections.disconnect();
      mutations.disconnect();
      document.removeEventListener("click", click, true);
      document.removeEventListener("auxclick", click, true);
    };
  }, [pathname]);

  return null;
}

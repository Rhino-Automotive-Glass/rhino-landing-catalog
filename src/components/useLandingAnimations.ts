'use client';

import { type RefObject, useEffect } from 'react';

export function useLandingAnimations(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let isActive = true;
    let dispose = () => {};

    const loadAnimations = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (!isActive || !rootRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const heroTimeline = gsap.timeline({
          defaults: {
            duration: 0.9,
            ease: 'power3.out',
          },
        });

        heroTimeline
          .from('[data-gsap="floating-header"]', {
            y: -32,
            opacity: 0,
            duration: 0.75,
          })
          .from(
            '[data-gsap="hero-bg-shell"]',
            {
              scale: 1.06,
              y: 18,
              duration: 1.2,
              ease: 'power2.out',
            },
            0
          )
          .from(
            '[data-gsap="hero-overlay"]',
            {
              opacity: 0,
              duration: 1.1,
            },
            0.05
          )
          .from(
            [
              '[data-gsap="hero-badge"]',
              '[data-gsap="hero-title"]',
              '[data-gsap="hero-subtitle"]',
              '[data-gsap="hero-copy"]',
              '[data-gsap="hero-cta"]',
              '[data-gsap="hero-proof"]',
            ],
            {
              y: 36,
              opacity: 0,
              stagger: 0.12,
            },
            0.18
          )
          .from(
            '[data-gsap="hero-scroll-indicator"]',
            {
              y: -12,
              opacity: 0,
              duration: 0.65,
            },
            0.9
          );

        gsap.to('[data-gsap="hero-scroll-indicator"] .indicator-dot', {
          y: 10,
          duration: 1.15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.15,
        });

        gsap.to('[data-gsap="hero-bg-parallax"]', {
          yPercent: 7,
          scale: 1.035,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-gsap="hero"]',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        gsap.to('[data-gsap="hero-content"]', {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-gsap="hero"]',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>('[data-gsap="section-heading"]').forEach((element) => {
          gsap.from(element, {
            y: 32,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 78%',
              once: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-gsap="reveal-card"]').forEach((element, index) => {
          gsap.from(element, {
            y: 38,
            opacity: 0,
            duration: 0.85,
            delay: Math.min(index * 0.06, 0.24),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 84%',
              once: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-gsap="media-panel"]').forEach((element, index) => {
          gsap.from(element, {
            y: 42,
            opacity: 0,
            scale: 0.97,
            duration: 0.95,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 84%',
              once: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-gsap="parallax-blob"]').forEach((element, index) => {
          const yShift = index % 2 === 0 ? -12 : 12;
          const xShift = index % 2 === 0 ? 6 : -6;

          gsap.to(element, {
            yPercent: yShift,
            xPercent: xShift,
            ease: 'none',
            scrollTrigger: {
              trigger: element.closest('section') ?? element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      }, root);

      ScrollTrigger.refresh();

      dispose = () => {
        ctx.revert();
      };
    };

    void loadAnimations();

    return () => {
      isActive = false;
      dispose();
    };
  }, [rootRef]);
}

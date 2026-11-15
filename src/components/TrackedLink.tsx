'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import type { CtaLocation, CtaType } from '@/lib/analytics';
import { trackCta } from '@/lib/gtm';

/** Link that sends `cta_click` (client island, usable from server components). */
interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  ctaType: CtaType;
  ctaLocation: CtaLocation;
}

export function TrackedLink({
  ctaType,
  ctaLocation,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackCta(ctaType, ctaLocation, event.currentTarget.href);
    onClick?.(event);
  };

  return <a {...props} onClick={handleClick} />;
}

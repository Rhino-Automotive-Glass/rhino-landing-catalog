'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { trackEvent } from '@/lib/gtm';

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  analyticsEvent: string;
  analyticsParams?: Record<string, unknown>;
}

export function TrackedLink({
  analyticsEvent,
  analyticsParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(analyticsEvent, analyticsParams);
    onClick?.(event);
  };

  return <a {...props} onClick={handleClick} />;
}

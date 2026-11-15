import React from 'react';
import type { CtaLocation, CtaType } from '@/lib/analytics';
import { trackCta } from '@/lib/gtm';

interface CTAButtonProps {
  label: string;
  page_location: string;
  cta_location: CtaLocation;
  /** Defaults from the link scheme: tel → phone, mailto → email, wa.me → whatsapp. */
  cta_type?: CtaType;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  label = "Agenda una Visita",
  page_location = "tel:+525527488329",
  cta_location,
  cta_type,
  className = "",
  style = {},
  variant = 'primary',
  size = 'md'
}) => {
  const handleClick = () => {
    const type = cta_type
      ?? (page_location.startsWith('tel:') ? 'phone'
        : page_location.startsWith('mailto:') ? 'email'
        : page_location.includes('wa.me/') ? 'whatsapp'
        : undefined);
    if (type) trackCta(type, cta_location, page_location);

    if (page_location.startsWith('tel:') || page_location.startsWith('mailto:')) {
      window.location.href = page_location;
    } else {
      window.open(page_location, '_blank', 'noopener,noreferrer');
    }
  };

  // Base button classes using our theme system
  const baseClasses = "btn focus-ring";
  
  // Variant classes
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
    accent: "btn-accent",
    ghost: "btn-ghost"
  };
  
  // Size classes
  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md", 
    lg: "btn-lg",
    xl: "btn-xl"
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      style={style}
      onClick={handleClick}
      className={buttonClasses}
      type="button"
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default CTAButton;

import React from 'react';

interface CTAButtonProps {
  label: string;
  page_location: string;
  button_name?: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  label = "Agenda una Visita",
  page_location = "tel:+525527488329",
  button_name,
  className = "",
  style = {},
  variant = 'primary',
  size = 'md'
}) => {
  const handleClick = () => {
    // Analytics tracking could be added here using button_name
    if (button_name) {
      // Example: trackEvent('button_click', { button_name });
    }
    
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

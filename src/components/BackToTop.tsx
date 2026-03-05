'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver al inicio"
      className={`
        fixed bottom-6 left-6 z-50
        w-12 h-12 rounded-full
        bg-secondary-800/80 backdrop-blur-sm hover:bg-secondary-700
        flex items-center justify-center
        shadow-lg hover:shadow-xl
        text-white
        transition-all duration-300
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
      `}
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}

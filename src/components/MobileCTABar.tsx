'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { trackEvent } from '@/lib/gtm';

const PHONE = '+525527488329';
const WHATSAPP_NUMBER = '525527488329';
const WHATSAPP_MESSAGE = 'Hola, me interesa cotizar cristales automotrices para mi vehiculo.';

export function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div
      className={`
        md:hidden fixed bottom-0 inset-x-0 z-50
        grid grid-cols-2
        border-t border-white/10
        bg-secondary-900/95 backdrop-blur-sm
        transition-transform duration-300
        ${visible ? 'translate-y-0' : 'translate-y-full'}
      `}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={`tel:${PHONE}`}
        onClick={() => trackEvent('cta_click', { button_name: 'MobileBar_Call', destination: `tel:${PHONE}` })}
        className="flex items-center justify-center gap-2 py-4 text-white font-semibold"
      >
        <Phone className="w-5 h-5" aria-hidden="true" />
        <span>Llamar</span>
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { button_name: 'MobileBar_WhatsApp', destination: waUrl })}
        className="flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white font-semibold"
      >
        <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white" aria-hidden="true">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958a15.93 15.93 0 008.832 2.664C24.826 31.996 32 24.82 32 16.004 32 7.176 24.826 0 16.004 0zm9.55 22.606c-.396 1.116-2.326 2.134-3.214 2.27-.888.134-2.03.19-3.274-.206a29.87 29.87 0 01-2.962-1.096c-5.21-2.246-8.614-7.502-8.876-7.85-.262-.348-2.142-2.85-2.142-5.436 0-2.586 1.356-3.858 1.838-4.386.482-.528 1.048-.66 1.398-.66.35 0 .7.004 1.006.018.322.016.756-.122 1.182.902.438 1.048 1.486 3.634 1.618 3.896.132.262.22.568.044.916-.176.35-.264.568-.528.874-.262.306-.552.684-.788.918-.262.262-.536.548-.23 1.076.306.528 1.362 2.244 2.926 3.636 2.006 1.786 3.696 2.34 4.224 2.602.528.262.836.22 1.142-.132.306-.35 1.312-1.528 1.662-2.056.35-.528.7-.44 1.182-.264.482.176 3.068 1.448 3.596 1.71.528.264.88.396 1.01.612.134.218.134 1.248-.262 2.366z"/>
        </svg>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}

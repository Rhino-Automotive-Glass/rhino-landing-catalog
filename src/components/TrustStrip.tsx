'use client';

import { ShieldCheck, Clock, Award, Truck } from 'lucide-react';

type Item = {
  icon: typeof ShieldCheck;
  title: string;
  subtitle: string;
};

const items: Item[] = [
  {
    icon: Clock,
    title: 'Instalación el mismo día',
    subtitle: 'Respuesta en minutos por WhatsApp',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía de instalación',
    subtitle: 'Trabajo respaldado por escrito',
  },
  {
    icon: Award,
    title: '+15 años de experiencia',
    subtitle: 'Más de 150 clientes satisfechos',
  },
  {
    icon: Truck,
    title: 'Servicio a domicilio',
    subtitle: 'CDMX y Estado de México',
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Por qué elegir Rhino" className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto container-padding py-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} data-gsap="reveal-card" className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-accent-400" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold leading-tight">{title}</p>
                <p className="text-sm text-blue-200 leading-snug mt-0.5">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

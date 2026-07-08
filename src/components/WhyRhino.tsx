'use client';

import { Gem, PackageCheck, BadgeDollarSign, Headset } from 'lucide-react';

type Benefit = {
  icon: typeof Gem;
  title: string;
  text: string;
};

const benefits: Benefit[] = [
  {
    icon: Gem,
    title: 'Vidrio de calidad',
    text: 'Cristales con especificaciones de fábrica para un ajuste y sellado perfectos en cada vehículo.',
  },
  {
    icon: PackageCheck,
    title: 'Stock inmediato',
    text: 'Amplio inventario de medallones, costados y ventanillas para vans, camionetas y autobuses.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Precio justo',
    text: 'Cotización transparente y sin sorpresas. Presupuestos claros antes de iniciar el trabajo.',
  },
  {
    icon: Headset,
    title: 'Atención personalizada',
    text: 'Te asesoramos por WhatsApp y encontramos el cristal exacto que tu vehículo necesita.',
  },
];

export function WhyRhino() {
  return (
    <section id="por-que-rhino" className="section-padding relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div data-gsap="section-heading" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            ¿Por qué elegir Rhino?
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-secondary-600">
            Especialistas en vidrio automotriz para flotillas y vehículos comerciales. Calidad,
            rapidez y servicio que puedes comprobar.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              data-gsap="reveal-card"
              className="flex flex-col rounded-2xl border border-white/40 bg-white/70 p-6 shadow-sm ring-1 ring-white/20 ring-inset backdrop-blur-2xl"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary-600" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg text-secondary-900 mb-2">{title}</h3>
              <p className="text-secondary-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

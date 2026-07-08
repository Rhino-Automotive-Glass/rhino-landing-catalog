'use client';

import { MessageCircle, CalendarCheck, Wrench } from 'lucide-react';

type Step = {
  icon: typeof MessageCircle;
  step: string;
  title: string;
  text: string;
};

const steps: Step[] = [
  {
    icon: MessageCircle,
    step: '1',
    title: 'Cotiza',
    text: 'Envíanos los datos de tu vehículo por WhatsApp o el formulario. Te damos precio al instante.',
  },
  {
    icon: CalendarCheck,
    step: '2',
    title: 'Agenda',
    text: 'Elegimos día y hora. Vamos a tu domicilio o taller en CDMX y Estado de México.',
  },
  {
    icon: Wrench,
    step: '3',
    title: 'Instalamos',
    text: 'Colocación profesional el mismo día, con garantía por escrito y sellado impecable.',
  },
];

export function Process() {
  return (
    <section id="como-funciona" className="section-padding bg-secondary-50 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div data-gsap="section-heading" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Cómo funciona
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-secondary-600">
            Tres pasos simples para tener tu cristal instalado sin complicaciones.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, text }) => (
            <div key={step} data-gsap="reveal-card" className="text-center">
              <span className="block text-xs font-bold tracking-wider text-accent-600 mb-3">
                PASO {step}
              </span>
              <div className="mx-auto w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center mb-5 shadow-lg">
                <Icon className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-xl text-secondary-900 mb-2">{title}</h3>
              <p className="mx-auto max-w-xs text-secondary-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

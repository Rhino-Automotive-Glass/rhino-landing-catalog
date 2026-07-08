'use client';

import { ChevronDown } from 'lucide-react';

type QA = { question: string; answer: string };

const faqs: QA[] = [
  {
    question: '¿Cuánto tarda la instalación?',
    answer:
      'La mayoría de los cristales se instalan el mismo día. Al cotizar te confirmamos el tiempo exacto según tu vehículo y la pieza que necesitas.',
  },
  {
    question: '¿Ofrecen servicio a domicilio?',
    answer:
      'Sí. Vamos a tu domicilio, oficina o taller dentro de Ciudad de México y Estado de México, sin costo adicional en la mayoría de las zonas.',
  },
  {
    question: '¿Qué garantía tienen los trabajos?',
    answer:
      'Todas nuestras instalaciones incluyen garantía por escrito que cubre el sellado y la mano de obra. Usamos vidrio con especificaciones de fábrica.',
  },
  {
    question: '¿Trabajan con flotillas y vehículos comerciales?',
    answer:
      'Sí, somos especialistas en vans, camionetas y autobuses. Manejamos flotillas con precios preferenciales y atención prioritaria.',
  },
  {
    question: '¿Cómo obtengo una cotización?',
    answer:
      'Envíanos la marca, modelo, año y la pieza que necesitas por WhatsApp o el formulario de contacto. Te damos el precio al instante, sin compromiso.',
  },
  {
    question: '¿Qué formas de pago aceptan?',
    answer:
      'Aceptamos efectivo, transferencia y tarjetas. Confirmamos las opciones disponibles al momento de agendar tu servicio.',
  },
];

export function FAQ() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <section id="faq" className="section-padding relative overflow-hidden scroll-mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto container-padding relative z-10">
        <div data-gsap="section-heading" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Preguntas frecuentes
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-secondary-600">
            Resolvemos las dudas más comunes. ¿Tienes otra pregunta? Escríbenos por WhatsApp.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.question}
              data-gsap="reveal-card"
              className="group rounded-2xl border border-white/40 bg-white/70 shadow-sm ring-1 ring-white/20 ring-inset backdrop-blur-2xl"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-secondary-900 list-none marker:content-['']">
                <span>{f.question}</span>
                <ChevronDown
                  className="w-5 h-5 flex-shrink-0 text-secondary-500 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="px-5 pb-5 -mt-1 text-secondary-600 leading-relaxed">
                {f.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

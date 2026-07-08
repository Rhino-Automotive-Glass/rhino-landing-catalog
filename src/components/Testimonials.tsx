'use client';

import { Star, Quote } from 'lucide-react';

type Review = {
  name: string;
  role: string;
  rating: number;
  text: string;
};

const reviews: Review[] = [
  {
    name: 'Carlos Méndez',
    role: 'Dueño de flotilla, CDMX',
    rating: 5,
    text: 'Cambiaron los medallones de tres de mis vans en el mismo día. Instalación impecable y el precio fue justo. Volveré sin duda.',
  },
  {
    name: 'Laura Gutiérrez',
    role: 'Transporte escolar, EdoMex',
    rating: 5,
    text: 'Me consiguieron un cristal lateral que llevaba semanas buscando. Atención rápida por WhatsApp.',
  },
  {
    name: 'Roberto Salinas',
    role: 'Taller mecánico, Naucalpan',
    rating: 5,
    text: 'Trabajo con ellos para mis clientes de autobuses. Siempre tienen stock y la calidad del vidrio es de primera. Muy recomendados.',
  },
  {
    name: 'Ana Torres',
    role: 'Particular, CDMX',
    rating: 5,
    text: 'Se me estrelló la ventana trasera de mi combi y me atendieron el mismo día. Profesionales y honestos. Excelente experiencia.',
  },
];

export function Testimonials() {
  return (
    <section id="opiniones" className="section-padding relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div data-gsap="section-heading" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-secondary-600">
            Miles de vehículos rodando con cristales Rhino. Estas son algunas de sus experiencias.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <div
              key={review.name}
              data-gsap="reveal-card"
              className="relative flex flex-col rounded-2xl border border-white/40 bg-white/70 p-6 shadow-sm ring-1 ring-white/20 ring-inset backdrop-blur-2xl"
            >
              <Quote className="w-8 h-8 text-accent-400/60 mb-4" aria-hidden="true" />

              <div className="flex items-center gap-1 mb-3" aria-label={`${review.rating} de 5 estrellas`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-accent-400 text-accent-400'
                        : 'text-secondary-300'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="text-secondary-700 leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="mt-6 pt-4 border-t border-secondary-200">
                <p className="font-semibold text-secondary-900">{review.name}</p>
                <p className="text-sm text-secondary-500">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

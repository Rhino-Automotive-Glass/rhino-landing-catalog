'use client';

import React from 'react';
import Image from "next/image";
import { Star } from 'lucide-react';
import { CTAButton } from './CTAButton';

export function Hero() {
  return (
    <section data-gsap="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div data-gsap="hero-bg-shell" className="absolute inset-0 z-0 will-change-transform">
        <div data-gsap="hero-bg-parallax" className="absolute inset-0 will-change-transform">
          <Image
            src="/parabrisas-medallones-van-camioneta-autobuses.webp"
            alt="Vidrio automotriz para vans y autobuses - medallones costados en Ciudad de México"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Gradient Overlay */}
          <div
            data-gsap="hero-overlay"
            className="absolute inset-0 bg-gradient-to-r from-secondary-900/75 via-primary-950/65 to-primary-950/50"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div
          data-gsap="hero-content"
          className="mx-auto max-w-7xl container-padding text-center text-white will-change-transform"
        >
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <p
                data-gsap="hero-badge"
                className="text-sm md:text-base font-semibold tracking-[0.35em] text-white uppercase"
              >
                Rhino Automotive Glass
              </p>
              <h1 data-gsap="hero-title">
                <span className="sr-only">Vidrio para Vans, Autobuses y más</span>
                <svg viewBox="0 0 1000 180" className="w-full max-w-4xl mx-auto" aria-hidden="true">
                  <text x="500" y="75" textAnchor="middle" fontSize="78" fontWeight="700" fontFamily="Inter, sans-serif" fill="#ffffff">Vidrio para</text>
                  <text x="500" y="152" textAnchor="middle" fontSize="78" fontWeight="700" fontFamily="Inter, sans-serif" fill="#ffffff">Vans, Autobuses y más…</text>
                </svg>
              </h1>

              <h2
                data-gsap="hero-subtitle"
                className="text-xl md:text-2xl lg:text-3xl font-medium text-blue-100 max-w-3xl mx-auto"
              >
                MEDALLONES • COSTADOS • VENTANILLAS
              </h2>
            </div>

            {/* Subtitle */}
            <p
              data-gsap="hero-copy"
              className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed"
            >
              Especialistas en vidrio automotriz para flotillas y vehículos comerciales
              con más de 15 años de experiencia en CDMX y Estado de México.
            </p>

            {/* CTA Button */}
            <div data-gsap="hero-cta" className="flex justify-center pt-4">
              <CTAButton
                label="Cotizar Ahora"
                page_location="tel:+525527488329"
                button_name="Hero_CTA"
                variant="accent"
                size="xl"
                className="hover:scale-105"
              />
            </div>

            {/* Social Proof */}
            <div data-gsap="hero-proof" className="pt-8 space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-warning-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-blue-100 font-medium">4.9</span>
              </div>
              <p className="text-blue-200 text-sm md:text-base">
                Mas de 150 clientes satisfechos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        data-gsap="hero-scroll-indicator"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="indicator-dot w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}

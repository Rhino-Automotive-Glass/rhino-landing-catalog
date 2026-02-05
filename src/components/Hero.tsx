'use client';

import React from 'react';
import Image from "next/image";
import { Star } from 'lucide-react';
import { CTAButton } from './CTAButton';

const STROKE_COLORS = ['#ffffff', '#fb923c', '#60a5fa', '#fbbf24', '#93c5fd'];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/parabrisas-medallones-van-camioneta-autobuses.webp"
          alt="Vidrio automotriz para vans y autobuses - medallones costados en Ciudad de México"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-800/70 to-primary-700/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto container-padding text-center text-white">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <p className="text-sm md:text-base font-semibold tracking-widest text-accent-400 uppercase animate-slide-up" style={{ animationDelay: '0.1s' }}>Rhino Automotive Glass</p>
            <h1 className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
              <span className="sr-only">Vidrio para Vans, Autobuses y más</span>
              <svg viewBox="0 0 1000 180" className="w-full max-w-4xl mx-auto" aria-hidden="true">
                {STROKE_COLORS.map((color, i) => (
                  <text key={`s1-${i}`} x="500" y="75" textAnchor="middle" fontSize="78" fontWeight="700" fontFamily="Inter, sans-serif"
                    style={{ fill: 'none', stroke: color, strokeWidth: 5, strokeDasharray: '6% 29%', animation: 'strokeFlow 5.5s linear infinite', animationDelay: `${-(i + 1)}s` }}
                  >Vidrio para</text>
                ))}
                <text x="500" y="75" textAnchor="middle" fontSize="78" fontWeight="700" fontFamily="Inter, sans-serif" fill="white">Vidrio para</text>

                {STROKE_COLORS.map((color, i) => (
                  <text key={`s2-${i}`} x="500" y="152" textAnchor="middle" fontSize="78" fontWeight="700" fontFamily="Inter, sans-serif"
                    style={{ fill: 'none', stroke: color, strokeWidth: 5, strokeDasharray: '6% 29%', animation: 'strokeFlow 5.5s linear infinite', animationDelay: `${-(i + 1)}s` }}
                  >Vans, Autobuses y más…</text>
                ))}
                <text x="500" y="152" textAnchor="middle" fontSize="78" fontWeight="700" fontFamily="Inter, sans-serif" fill="#fb923c">Vans, Autobuses y más…</text>
              </svg>
            </h1>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-blue-100 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.55s' }}>
              MEDALLONES • COSTADOS • VENTANILLAS
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.75s' }}>
            Especialistas en vidrio automotriz para flotillas y vehículos comerciales
            con más de 15 años de experiencia en CDMX y Estado de México.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center pt-4 animate-fade-in" style={{ animationDelay: '0.95s' }}>
            <CTAButton
              label="Cotizar Ahora"
              page_location="tel:+525527488329"
              button_name="Hero_CTA"
              className="btn btn-accent btn-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            />
          </div>

          {/* Social Proof */}
          <div className="pt-8 space-y-4 animate-fade-in" style={{ animationDelay: '1.15s' }}>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-warning-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-blue-100 font-medium">5.0</span>
            </div>
            <p className="text-blue-200 text-sm md:text-base">
              Más de 5,000 clientes satisfechos
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

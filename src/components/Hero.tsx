'use client';

import React from 'react';
import Image from "next/image";
import { Star } from 'lucide-react';
import { CTAButton } from './CTAButton';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/van2.png"
          alt="Rhino Automotive Glass - Professional Service"
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
        <div className="space-y-8 animate-fade-in">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block">RHINO</span>
              <span className="block text-accent-400">AUTOMOTIVE GLASS</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-blue-100 max-w-3xl mx-auto">
              MEDALLONES • COSTADOS • VENTANILLAS
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed">
            Especialistas en cristales automotrices con más de 15 años de experiencia. 
            Calidad garantizada y servicio profesional.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center pt-4">
            <CTAButton 
              label="Cotizar Ahora"
              page_location="tel:+525527488329"
              button_name="Hero_CTA"
              className="btn btn-accent btn-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            />
          </div>

          {/* Social Proof */}
          <div className="pt-8 space-y-4">
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

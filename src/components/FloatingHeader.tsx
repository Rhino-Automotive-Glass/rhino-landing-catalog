'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CTAButton } from './CTAButton';

interface FloatingHeaderProps {
  title: string;
}

export function FloatingHeader({ title }: FloatingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
        ${isScrolled
          ? 'bg-secondary-800/80 backdrop-blur-xl py-3 border-b border-secondary-700/60 shadow-sm'
          : 'bg-secondary-900/60 backdrop-blur-md md:bg-transparent py-3 md:py-4'}
      `}
    >
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo/Title */}
          <div className="flex items-center space-x-3">
            <Image
              src="/rhino-logo.png"
              alt="Rhino Automotive Glass Mexico"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <h1
              className={`
                text-xl md:text-2xl font-bold tracking-tight
                transition-all duration-300
                ${isScrolled ? 'text-white' : 'text-white/90'}
              `}
            >
              {title}
            </h1>
          </div>

          {/* Navigation & CTA */}
          <div className="flex items-center space-x-6">
            {/* Navigation Links (hidden on mobile) */}
            <nav aria-label="Navegacion principal" className="hidden lg:flex items-center space-x-6">
              <a 
                href="#catalogo" 
                className={`
                  text-sm font-medium transition-colors duration-300 hover:text-accent-500
                  ${isScrolled ? 'text-secondary-200' : 'text-blue-100'}
                `}
              >
                Catálogo
              </a>
              <a
                href="#contacto"
                className={`
                  text-sm font-medium transition-colors duration-300 hover:text-accent-500
                  ${isScrolled ? 'text-secondary-200' : 'text-blue-100'}
                `}
              >
                Contacto
              </a>
              <a
                href="#ubicacion"
                className={`
                  text-sm font-medium transition-colors duration-300 hover:text-accent-500
                  ${isScrolled ? 'text-secondary-200' : 'text-blue-100'}
                `}
              >
                Ubicacion
              </a>
            </nav>

            {/* CTA Button */}
            <CTAButton 
              label="Llamar Ahora"
              page_location="tel:+525527488329"
              button_name="Header_CTA"
              className={`
                btn btn-md font-semibold transition-all duration-300
                ${isScrolled 
                  ? 'btn-primary shadow-sm' 
                  : 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-lg'}
              `}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

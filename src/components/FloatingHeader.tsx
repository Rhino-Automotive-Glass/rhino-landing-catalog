'use client';

import React, { useState, useEffect } from 'react';
import { CTAButton } from './CTAButton';

interface FloatingHeaderProps {
  title: string;
}

export function FloatingHeader({ title }: FloatingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 
        z-50
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-gradient-to-bl from-blue-500 to-blue-900 py-2'}
      `}
    >
      <div className="flex flex-col md:flex-row justify-between items-center p-6 py-0">
        {/* Title */}
        <h1 
          className={`
            text-center
            md:text-left
            sm:min-w-[450px]
            m-2
            text-2xl font-semibold
            transition-all duration-300
            ${isScrolled ? 'text-gray-800' : 'text-white'}
          `}
        >
          {title}
        </h1>
        <div className="flex w-full" />
        <CTAButton 
          label="Agenda una visita"
          page_location="tel:+52"
          button_name="Header_button"
          className="
            p-3
            m-2
            w-full
            lg:max-w-[250px]
            text-lg
            bg-blue-300
            rounded-lg 
            transition-all duration-300
            text-lg"
        />
      </div>
    </header>
  );
}

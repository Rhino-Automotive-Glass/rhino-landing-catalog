'use client';

import React from 'react';
import Image from "next/image";
import { Star } from 'lucide-react';
import { CTAButton } from './CTAButton';

export function Hero() {

  return (
    <header className="relative bg-gradient-to-r from-purple-600 to-purple-700 text-white mt-14">
      <div className="absolute mx-auto px-4 py-16 bg-black/20 rounded-lg h-[700px] overflow-hidden w-full">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold m-14">
            RHINO AUTOMOTIVE GLASS
          </h1>

          <h2 className="text-2xl md:text-2xl font-bold md:m-10">
            MEDALLONES COSTADOS VENTANILLAS
          </h2>            
          <div className="mx-auto max-w-[300px]">
            {/* Content will go here */}
            <CTAButton 
              label="Cotizar ahora"
              page_location="tel:+526645045467"
              button_name="Hero_button"
              className="bg-blue-300 hover:bg-blue-500 text-black-700 font-semibold px-8 py-4 rounded-lg text-lg flex items-center m-6 md:m-8"
            />
          </div>

          <div className="md:m-8 flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={20} />
              ))}
            </div>
            <p className="text-sm">Más de 5000 clientes satisfechos</p>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <Image 
          src="/van2.png"
          alt="Happy person after receiving treatment"
          width={800}
          height={200}
          className="object-cover object-bottom h-[700px] overflow-hidden w-full"
          priority
        />
      </div>
    </header>
  );
}

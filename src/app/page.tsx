'use client';

import { Suspense } from 'react'
import { ProductCatalog } from '@/components'
import { FloatingHeader } from '@/components'
import { Hero } from '@/components'
// import { ThreeSixtyViewer } from '@/components'
import { ContactForm } from '@/components'
import { Location } from '@/components'
import { WhatsAppFloat } from '@/components'
import { BackToTop } from '@/components'
import Image from 'next/image'
import { trackEvent } from '@/lib/gtm'

function ProductCatalogFallback() {
  return (
    <section id="catalogo" className="section-padding relative overflow-hidden scroll-mt-20">
      <div className="relative z-10 mx-auto max-w-7xl container-padding">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-secondary-900 md:text-4xl">
            Catálogo de Cristales para Vans y Autobuses
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-secondary-600">
            Cargando catálogo...
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`catalog-brand-skeleton-${index}`}
              className="rounded-2xl border border-white/40 bg-white/50 px-5 py-6 ring-1 ring-white/20 ring-inset backdrop-blur-2xl"
            >
              <div className="flex flex-col items-center">
                <div className="mb-3 h-20 w-full animate-pulse rounded-xl bg-white/60" />
                <div className="h-6 w-24 animate-pulse rounded-full bg-secondary-200/70" />
                <div className="mt-2 h-4 w-20 animate-pulse rounded-full bg-secondary-200/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Floating Header */}
      <FloatingHeader title="RHINO AUTOMOTIVE GLASS MEXICO" />
      
      {/* Hero Section */}
      <Hero />

      {/* 360 Vehicle Viewer — commented out until real images are ready */}
      {/* <ThreeSixtyViewer /> */}

      {/* Catalog Section */}
      <Suspense fallback={<ProductCatalogFallback />}>
        <ProductCatalog />
      </Suspense>

      {/* Contact Section */}
      <ContactForm />

      {/* Video Section */}
      <section className="bg-gradient-to-b from-gray-300 via-gray-500 to-gray-300 flex items-center justify-center max-h-[42vh] overflow-hidden">
        <div className="hidden md:block relative max-h-[42vh] w-auto aspect-[3/4]">
          <Image
            src="/ventana-van.jpg"
            alt="Ventana lateral de van - cristales automotrices Rhino"
            fill
            className="object-cover"
            loading="lazy"
            sizes="25vw"
          />
        </div>
        <div className="relative inline-block">
          <video
            className="max-h-[42vh] w-auto"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/mb.mp4" type="video/mp4" />
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <Image
                src="/rhino-logo.png"
                alt="Rhino Automotive Glass"
                width={80}
                height={80}
                className="mx-auto mb-4 drop-shadow-lg"
              />
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Vidrio Automotriz a tu Medida
              </h2>
              <p className="mt-4 text-lg md:text-2xl font-medium text-blue-100 tracking-wide">
                COSTADOS &bull; MEDALLONES &bull; VENTANAS
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block relative max-h-[42vh] w-auto aspect-[3/4]">
          <Image
            src="/van-medallon.jpg"
            alt="Medallon de van - vidrio trasero para vehiculos comerciales"
            fill
            className="object-cover"
            loading="lazy"
            sizes="25vw"
          />
        </div>
      </section>
      
      {/* Location Section */}
      <Location />
      
      {/* Footer */}
      <footer role="contentinfo" className="bg-secondary-900 text-white py-12">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid md:grid-cols-3 gap-8 bg-white/5 rounded-2xl p-6">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/rhino-logo.png"
                  alt="Rhino Automotive Glass"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h3 className="text-xl font-bold">Rhino Automotive Glass</h3>
              </div>
              <p className="text-secondary-300 leading-relaxed">
                Especialistas en vidrio automotriz con más de 15 años de experiencia.
                Calidad garantizada y servicio profesional en Ciudad de México.
              </p>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Nuestros Servicios</h4>
              <ul className="space-y-2 text-secondary-300">
                <li>• Vidrios para vans y autobuses</li>
                <li>• Medallones y costados</li>
                <li>• Ventanillas laterales</li>
                <li>• Cristales traseros</li>
                <li>• Vidrio para flotillas</li>
                <li>• Servicio a domicilio CDMX y EdoMex</li>
                <li>• Instalación profesional</li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Contacto</h4>
              <div className="space-y-3 text-secondary-300">
                <div>
                  <p className="font-medium text-white">Teléfono</p>
                  <a href="tel:+525527488329" aria-label="Llamar a Rhino Automotive Glass" onClick={() => trackEvent('cta_click', { button_name: 'Footer_Phone', destination: 'tel:+525527488329' })} className="hover:text-accent-400 transition-colors">
                    +52 55 2748 8329
                  </a>
                </div>
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a href="mailto:info@rhinoautoglass.mx" aria-label="Enviar email a Rhino Automotive Glass" onClick={() => trackEvent('cta_click', { button_name: 'Footer_Email', destination: 'mailto:info@rhinoautoglass.mx' })} className="hover:text-accent-400 transition-colors">
                    info@rhinoautoglass.mx
                  </a>
                </div>
                <div>
                  <p className="font-medium text-white">WhatsApp</p>
                  <a href="https://wa.me/525527488329" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { button_name: 'Footer_WhatsApp', destination: 'https://wa.me/525527488329' })} className="hover:text-accent-400 transition-colors">
                    +52 55 2748 8329
                  </a>
                </div>
                <div>
                  <p className="font-medium text-white">Horario</p>
                  <p>Lunes a Sabado: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-400">
            <p>&copy; {new Date().getFullYear()} Rhino Automotive Glass Mexico. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating elements */}
      <WhatsAppFloat />
      <BackToTop />
    </main>
  )
}

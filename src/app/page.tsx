import { ProductCatalog } from '@/components'
import { FloatingHeader } from '@/components'
import { Hero } from '@/components'
// import { ThreeSixtyViewer } from '@/components'
import { ContactForm } from '@/components'
import { Location } from '@/components'
import { WhatsAppFloat } from '@/components'
import { BackToTop } from '@/components'
import Image from 'next/image'

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
      <ProductCatalog />

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
                  <a href="tel:+525527488329" aria-label="Llamar a Rhino Automotive Glass" className="hover:text-accent-400 transition-colors">
                    +52 55 2748 8329
                  </a>
                </div>
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a href="mailto:info@rhinoautoglass.mx" aria-label="Enviar email a Rhino Automotive Glass" className="hover:text-accent-400 transition-colors">
                    info@rhinoautoglass.mx
                  </a>
                </div>
                <div>
                  <p className="font-medium text-white">WhatsApp</p>
                  <a href="https://wa.me/525527488329" target="_blank" rel="noopener noreferrer" className="hover:text-accent-400 transition-colors">
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

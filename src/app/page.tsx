import { WindshieldCatalog } from '@/components'
import { FloatingHeader } from '@/components'
import { Hero } from '@/components'
import { ContactForm } from '@/components'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Floating Header */}
      <FloatingHeader title="RHINO AUTOMOTIVE GLASS" />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Catalog Section */}
      <WindshieldCatalog />
      
      {/* Contact Section */}
      <ContactForm />
      
      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center font-bold text-lg">
                  R
                </div>
                <h3 className="text-xl font-bold">Rhino Automotive Glass</h3>
              </div>
              <p className="text-secondary-300 leading-relaxed">
                Especialistas en cristales automotrices con más de 15 años de experiencia. 
                Calidad garantizada y servicio profesional en Ciudad de México.
              </p>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Nuestros Servicios</h4>
              <ul className="space-y-2 text-secondary-300">
                <li>• Parabrisas</li>
                <li>• Medallones</li>
                <li>• Ventanillas laterales</li>
                <li>• Cristales traseros</li>
                <li>• Servicio a domicilio</li>
                <li>• Instalación profesional</li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Contacto</h4>
              <div className="space-y-3 text-secondary-300">
                <div>
                  <p className="font-medium text-white">Teléfono</p>
                  <a href="tel:+525527488329" className="hover:text-accent-400 transition-colors">
                    +52 55 2748 8329
                  </a>
                </div>
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a href="mailto:info@rhinoautomotive.com" className="hover:text-accent-400 transition-colors">
                    info@rhinoautomotive.com
                  </a>
                </div>
                <div>
                  <p className="font-medium text-white">Horario</p>
                  <p>Lunes a Sábado: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-400">
            <p>&copy; 2024 Rhino Automotive Glass. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

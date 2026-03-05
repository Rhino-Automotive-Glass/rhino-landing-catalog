'use client';

import React from 'react';
import { MapPin, Clock, Phone, Navigation, Car, Wrench } from 'lucide-react';

export function Location() {
  const businessInfo = {
    name: "Rhino Automotive Glass",
    address: "Calzada Acozac 13",
    city: "Ixtapaluca",
    postalCode: "56530",
    phone: "+52 55 2748 8329",
    email: "info@rhinoautoglass.mx",
    coordinates: {
      lat: 19.3258975,
      lng: -98.8882736
    }
  };

  const businessHours = [
    { day: "Lunes", hours: "8:00 AM - 6:00 PM" },
    { day: "Martes", hours: "8:00 AM - 6:00 PM" },
    { day: "Miércoles", hours: "8:00 AM - 6:00 PM" },
    { day: "Jueves", hours: "8:00 AM - 6:00 PM" },
    { day: "Viernes", hours: "8:00 AM - 6:00 PM" },
    { day: "Sábado", hours: "8:00 AM - 4:00 PM" },
    { day: "Domingo", hours: "Cerrado" }
  ];

  const services = [
    { icon: Car, title: "Servicio a Domicilio", description: "Vamos hasta tu ubicación" },
    { icon: Wrench, title: "Fábrica Especializada", description: "Instalación profesional" },
    { icon: Clock, title: "Servicio Rápido", description: "Instalación en el mismo día" }
  ];

  const handleGetDirections = () => {
    window.open('https://maps.app.goo.gl/nazGPfcAyHNGmv3h9', '_blank');
  };

  const handleCallBusiness = () => {
    window.location.href = `tel:${businessInfo.phone}`;
  };

  return (
    <section id="ubicacion" className="section-padding relative overflow-hidden scroll-mt-20">
      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />
      <div className="absolute -top-20 right-0 w-[550px] h-[550px] bg-primary-300/55 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-10 w-[550px] h-[550px] bg-accent-300/45 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/2 w-[450px] h-[450px] bg-accent-300/35 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-primary-200/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Nuestra Ubicación
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Visítanos en nuestra Fábrica en Ixtapaluca o solicita nuestro servicio a domicilio
            en Ciudad de México y Estado de México.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Business Info */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="bg-white/50 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-glass ring-1 ring-white/20 ring-inset p-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary-100/60 backdrop-blur-sm border border-primary-200/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    Dirección de la Fábrica
                  </h3>
                  <div className="text-secondary-600 space-y-1">
                    <p className="font-medium">{businessInfo.name}</p>
                    <p>{businessInfo.address}</p>
                    <p>{businessInfo.city}, {businessInfo.postalCode}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleGetDirections}
                  className="btn btn-primary btn-md flex items-center space-x-2 flex-1"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Cómo Llegar</span>
                </button>
                <button
                  onClick={handleCallBusiness}
                  className="btn btn-secondary btn-md flex items-center space-x-2 flex-1"
                >
                  <Phone className="w-5 h-5" />
                  <span>Llamar</span>
                </button>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white/50 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-glass ring-1 ring-white/20 ring-inset p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-accent-100/60 backdrop-blur-sm border border-accent-200/50 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900">
                  Horarios de Atención
                </h3>
              </div>

              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-white/50 last:border-b-0"
                  >
                    <span className="font-medium text-secondary-700">{schedule.day}</span>
                    <span 
                      className={`text-sm font-medium ${
                        schedule.hours === 'Cerrado' 
                          ? 'text-red-600' 
                          : 'text-secondary-900'
                      }`}
                    >
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white/60 border border-primary-200/50 rounded-lg">
                <p className="text-sm text-primary-800">
                  <strong>Nota:</strong> También ofrecemos servicio a domicilio con cita previa. 
                  Contáctanos para agendar tu visita.
                </p>
              </div>
            </div>

            {/* Services Available */}
            <div className="bg-white/50 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-glass ring-1 ring-white/20 ring-inset p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-6">
                Modalidades de Servicio
              </h3>
              
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100/60 backdrop-blur-sm border border-primary-200/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">
                        {service.title}
                      </h4>
                      <p className="text-sm text-secondary-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-6">
            {/* Map Container */}
            <div className="bg-white/50 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-glass ring-1 ring-white/20 ring-inset overflow-hidden">
              <div className="aspect-[4/3] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.997781976562!2d-98.8908485239738!3d19.325902544078023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce1f045a96ae0d%3A0x20b9b93f8dc4ca4c!2sRHINO%20AUTOMOTIVE%20GLASS!5e0!3m2!1ses!2smx!4v1772728381391!5m2!1ses!2smx"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicacion de Rhino Automotive Glass en Ixtapaluca"
                />
              </div>
            </div>

            {/* Contact Info Summary */}
            <div className="bg-white/50 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-glass ring-1 ring-white/20 ring-inset p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Información de Contacto
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-secondary-900">Teléfono</p>
                    <a 
                      href={`tel:${businessInfo.phone}`}
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {businessInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="font-medium text-secondary-900">Email</p>
                    <a 
                      href={`mailto:${businessInfo.email}`}
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {businessInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-secondary-900">Ubicación</p>
                    <p className="text-secondary-600 text-sm">
                      {businessInfo.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div className="bg-white/50 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-glass ring-1 ring-white/20 ring-inset p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Áreas de Servicio
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-secondary-700">Ciudad de México</span>
                  <span className="text-sm bg-primary-100/60 backdrop-blur-sm border border-primary-200/50 text-primary-800 px-2 py-1 rounded-full">
                    Área Principal
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-700">Estado de México</span>
                  <span className="text-sm bg-warning-100/60 backdrop-blur-sm border border-warning-200/50 text-warning-800 px-2 py-1 rounded-full">
                    Con cita previa
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-700">Zona Metropolitana</span>
                  <span className="text-sm bg-primary-100/60 backdrop-blur-sm border border-primary-200/50 text-primary-800 px-2 py-1 rounded-full">
                    Disponible
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white/60 rounded-lg">
                <p className="text-sm text-secondary-600">
                  <strong>Servicio a domicilio disponible</strong> en toda la zona metropolitana,
                  incluyendo Ixtapaluca, Nezahualcóyotl, Chalco, Valle de Chalco, Texcoco y todas las delegaciones de la CDMX.
                  Consulta disponibilidad para tu área específica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

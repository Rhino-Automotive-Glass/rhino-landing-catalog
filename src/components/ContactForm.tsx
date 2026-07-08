'use client';

import React, { useActionState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle } from 'lucide-react';
import { trackEvent } from '@/lib/gtm';
import { sendContactEmail, type ContactFormState } from '@/app/actions/send-contact-email';

const initialState: ContactFormState = {
  success: false,
  message: '',
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset the form on success
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <section id="contacto" className="section-padding hero-bg relative overflow-hidden scroll-mt-20">
      {/* Accent blobs so backdrop-blur on the form card has color to diffuse */}
      <div data-gsap="parallax-blob" className="absolute -top-28 -right-28 w-[420px] h-[420px] bg-accent-500/20 rounded-full blur-3xl" />
      <div data-gsap="parallax-blob" className="absolute -bottom-36 -left-28 w-[380px] h-[380px] bg-primary-400/25 rounded-full blur-3xl" />
      <div data-gsap="parallax-blob" className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-accent-400/15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <div className="text-white space-y-8">
            <div data-gsap="section-heading">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Contáctanos
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                ¿Necesitas un presupuesto? Estamos aquí para ayudarte con todo tu vidrio automotriz.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div data-gsap="reveal-card" className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/15 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Teléfono</h3>
                  <p className="text-blue-100">+52 55 2748 8329</p>
                  <p className="text-sm text-blue-200">Lunes a Sábado, 8:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div data-gsap="reveal-card" className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/15 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-blue-100">info@rhinoautoglass.mx</p>
                  <p className="text-sm text-blue-200">Respuesta en 24 horas</p>
                </div>
              </div>

              <div data-gsap="reveal-card" className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/15 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Ubicación</h3>
                  <p className="text-blue-100">Ciudad de México</p>
                  <p className="text-sm text-blue-200">Servicio a domicilio disponible</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div data-gsap="reveal-card" className="pt-6 border-t border-white/20">
              <p className="text-blue-100 mb-4">
                ¿Necesitas atención inmediata? Llámanos directamente:
              </p>
              <a
                href="tel:+525527488329"
                onClick={() => trackEvent('cta_click', { button_name: 'Contact_Call_Now', button_label: 'Llamar Ahora', destination: 'tel:+525527488329' })}
                className="btn btn-accent btn-lg inline-flex items-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Llamar Ahora</span>
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div
            data-gsap="reveal-card"
            className="bg-white/65 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-glass ring-1 ring-white/20 ring-inset p-8"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                Solicita tu Cotización
              </h3>
              <p className="text-secondary-600">
                Completa el formulario y te contactaremos pronto.
              </p>
            </div>

            {/* Status Messages */}
            {state.message && state.success && (
              <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                <p className="text-success-800 font-medium">{state.message}</p>
              </div>
            )}

            {state.message && !state.success && !state.fieldErrors && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800 font-medium">{state.message}</p>
              </div>
            )}

            <form ref={formRef} action={(formData) => { trackEvent('form_submit', { button_name: 'Contact_Form_Submit' }); formAction(formData); }} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full px-4 py-3 border rounded-lg focus-ring transition-colors ${
                    state.fieldErrors?.name ? 'border-red-500 bg-red-50' : 'border-white/50 bg-white/60 backdrop-blur-sm'
                  }`}
                  placeholder="Tu nombre completo"
                />
                {state.fieldErrors?.name && (
                  <p className="mt-2 text-sm text-red-600">{state.fieldErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-4 py-3 border rounded-lg focus-ring transition-colors ${
                    state.fieldErrors?.email ? 'border-red-500 bg-red-50' : 'border-white/50 bg-white/60 backdrop-blur-sm'
                  }`}
                  placeholder="tu@email.com"
                />
                {state.fieldErrors?.email && (
                  <p className="mt-2 text-sm text-red-600">{state.fieldErrors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`w-full px-4 py-3 border rounded-lg focus-ring transition-colors ${
                    state.fieldErrors?.phone ? 'border-red-500 bg-red-50' : 'border-white/50 bg-white/60 backdrop-blur-sm'
                  }`}
                  placeholder="+52 55 1234 5678"
                />
                {state.fieldErrors?.phone && (
                  <p className="mt-2 text-sm text-red-600">{state.fieldErrors.phone}</p>
                )}
              </div>

              {/* Vehicle Field */}
              <div>
                <label htmlFor="vehicle" className="block text-sm font-medium text-secondary-700 mb-2">
                  Información del vehículo *
                </label>
                <input
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  className={`w-full px-4 py-3 border rounded-lg focus-ring transition-colors ${
                    state.fieldErrors?.vehicle ? 'border-red-500 bg-red-50' : 'border-white/50 bg-white/60 backdrop-blur-sm'
                  }`}
                  placeholder="Ej: Ford Transit 2020, Foton View CS2 2024"
                />
                {state.fieldErrors?.vehicle && (
                  <p className="mt-2 text-sm text-red-600">{state.fieldErrors.vehicle}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus-ring transition-colors resize-none ${
                    state.fieldErrors?.message ? 'border-red-500 bg-red-50' : 'border-white/50 bg-white/60 backdrop-blur-sm'
                  }`}
                  placeholder="Describe qué tipo de servicio necesitas (medallón, costado, ventana lateral, etc.)"
                />
                {state.fieldErrors?.message && (
                  <p className="mt-2 text-sm text-red-600">{state.fieldErrors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary btn-lg w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-secondary-200" />
                <span className="text-sm text-secondary-500">o cotiza al instante</span>
                <span className="h-px flex-1 bg-secondary-200" />
              </div>

              {/* WhatsApp quick-quote */}
              <a
                href={`https://wa.me/525527488329?text=${encodeURIComponent('Hola, quiero cotizar cristales para mi vehiculo.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { button_name: 'Contact_Form_WhatsApp', destination: 'https://wa.me/525527488329' })}
                className="btn btn-lg w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white"
              >
                <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white" aria-hidden="true">
                  <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958a15.93 15.93 0 008.832 2.664C24.826 31.996 32 24.82 32 16.004 32 7.176 24.826 0 16.004 0zm9.55 22.606c-.396 1.116-2.326 2.134-3.214 2.27-.888.134-2.03.19-3.274-.206a29.87 29.87 0 01-2.962-1.096c-5.21-2.246-8.614-7.502-8.876-7.85-.262-.348-2.142-2.85-2.142-5.436 0-2.586 1.356-3.858 1.838-4.386.482-.528 1.048-.66 1.398-.66.35 0 .7.004 1.006.018.322.016.756-.122 1.182.902.438 1.048 1.486 3.634 1.618 3.896.132.262.22.568.044.916-.176.35-.264.568-.528.874-.262.306-.552.684-.788.918-.262.262-.536.548-.23 1.076.306.528 1.362 2.244 2.926 3.636 2.006 1.786 3.696 2.34 4.224 2.602.528.262.836.22 1.142-.132.306-.35 1.312-1.528 1.662-2.056.35-.528.7-.44 1.182-.264.482.176 3.068 1.448 3.596 1.71.528.264.88.396 1.01.612.134.218.134 1.248-.262 2.366z"/>
                </svg>
                <span>Cotizar por WhatsApp</span>
              </a>

              <p className="text-sm text-secondary-500 text-center">
                Sin compromiso · Respuesta rápida · Respetamos tu privacidad y no compartimos tu información.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

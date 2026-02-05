'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }
    
    if (!formData.vehicle.trim()) {
      newErrors.vehicle = 'La información del vehículo es requerida';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, we'll just show success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', vehicle: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error enviando mensaje:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="section-padding hero-bg">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <div className="text-white space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Contáctanos
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                ¿Necesitas un presupuesto? Estamos aquí para ayudarte con todos tus cristales automotrices.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Teléfono</h3>
                  <p className="text-blue-100">+52 55 2748 8329</p>
                  <p className="text-sm text-blue-200">Lunes a Sábado, 8:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-blue-100">info@rhinoautoglass.mx</p>
                  <p className="text-sm text-blue-200">Respuesta en 24 horas</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
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
            <div className="pt-6 border-t border-white/20">
              <p className="text-blue-100 mb-4">
                ¿Necesitas atención inmediata? Llámanos directamente:
              </p>
              <a 
                href="tel:+525527488329"
                className="btn btn-accent btn-lg inline-flex items-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Llamar Ahora</span>
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="card p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                Solicita tu Cotización
              </h3>
              <p className="text-secondary-600">
                Completa el formulario y te contactaremos pronto.
              </p>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                <p className="text-success-800 font-medium">¡Mensaje enviado correctamente! Te contactaremos pronto.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800 font-medium">Error al enviar el mensaje. Por favor intenta de nuevo.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus-ring transition-colors ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-secondary-300 bg-white'
                  }`}
                  placeholder="Tu nombre completo"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
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
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus-ring transition-colors ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-secondary-300 bg-white'
                  }`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
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
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus-ring transition-colors ${
                    errors.phone ? 'border-red-500 bg-red-50' : 'border-secondary-300 bg-white'
                  }`}
                  placeholder="+52 55 1234 5678"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
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
                  value={formData.vehicle}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus-ring transition-colors ${
                    errors.vehicle ? 'border-red-500 bg-red-50' : 'border-secondary-300 bg-white'
                  }`}
                  placeholder="Ej: Honda Civic 2020, Ford Focus 2018"
                />
                {errors.vehicle && (
                  <p className="mt-2 text-sm text-red-600">{errors.vehicle}</p>
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
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus-ring transition-colors resize-none ${
                    errors.message ? 'border-red-500 bg-red-50' : 'border-secondary-300 bg-white'
                  }`}
                  placeholder="Describe qué tipo de servicio necesitas (parabrisas, medallón, ventana lateral, etc.)"
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
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

              <p className="text-sm text-secondary-500 text-center">
                * Campos requeridos. Respetamos tu privacidad y no compartimos tu información.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

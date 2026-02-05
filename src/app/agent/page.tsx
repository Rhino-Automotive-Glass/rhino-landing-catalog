import { Metadata } from 'next';
import { getAgentById } from '@/data/agents';
import Link from 'next/link';
import { Phone, Mail, User, ArrowLeft } from 'lucide-react';
import AgentPhoto from '@/components/agent/AgentPhoto';

interface AgentPageProps {
  searchParams: Promise<{ id?: string }>;
}

export async function generateMetadata({ searchParams }: AgentPageProps): Promise<Metadata> {
  const params = await searchParams;
  const agent = params.id ? getAgentById(params.id) : null;
  
  if (!agent) {
    return {
      title: 'Agente no encontrado',
      description: 'El agente que buscas no existe.',
      robots: { index: false },
    };
  }

  return {
    title: `${agent.name} - ${agent.title} | Rhino Automotive Glass`,
    description: `${agent.bio} Contacta a ${agent.name} para vidrio automotriz en Ciudad de México.`,
    robots: { index: false },
    openGraph: {
      title: `${agent.name} - ${agent.title} | Rhino Automotive Glass`,
      description: agent.bio,
      type: 'profile',
    },
  };
}

export default async function AgentPage({ searchParams }: AgentPageProps) {
  const params = await searchParams;
  const agentId = params.id;

  // If no ID provided
  if (!agentId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ID de agente no proporcionado
          </h1>
          <p className="text-gray-600 mb-6">
            Por favor, escanea el código QR de tu asesor de ventas.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const agent = getAgentById(agentId);

  // If agent not found
  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Agente no encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            El agente con ID <span className="font-mono font-semibold">{agentId}</span> no existe.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  // Success - Display agent information
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header with branding */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <img src="/rhino-logo.png" alt="Rhino Automotive Glass" className="w-7 h-7 object-contain" />
            <span className="text-sm font-medium">Rhino Automotive Glass</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header section with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 sm:px-8 sm:py-12">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Agent Photo - Using Client Component */}
              <AgentPhoto name={agent.name} photo={agent.photo} />

              {/* Agent Name and Title */}
              <div className="text-center sm:text-left flex-grow">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {agent.name}
                </h1>
                <p className="text-blue-100 text-lg sm:text-xl font-medium">
                  {agent.title}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            {/* Bio */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Acerca de mí
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {agent.bio}
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Información de contacto
              </h2>
              
              {/* Phone */}
              <a
                href={`tel:${agent.phone}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-200 group border border-green-200"
              >
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-600 font-medium">Teléfono</p>
                  <p className="text-lg font-semibold text-gray-900">{agent.phone}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${agent.email}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-200 group border border-blue-200"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-600 font-medium">Correo electrónico</p>
                  <p className="text-lg font-semibold text-gray-900 break-all">{agent.email}</p>
                </div>
              </a>
            </div>

            {/* CTA Section */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  ¿Necesitas vidrio automotriz?
                </h3>
                <p className="text-blue-100 mb-4">
                  Contáctame para recibir la mejor atención y servicio profesional
                </p>
                <a
                  href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Enviar WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>© 2025 Rhino Automotive Glass - Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}

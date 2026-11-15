import type { Metadata } from 'next';
import Link from 'next/link';

/*
 * DRAFT (2026-11-15): written by a developer, not a lawyer. Review before
 * publishing, in particular the legal name of the "responsable" (marked
 * [RAZÓN SOCIAL]) and the current authority/procedure under the LFPDPPP.
 * Keep the "Herramientas de análisis" section in sync with
 * docs/google-analytics.md whenever analytics settings change.
 */

export const metadata: Metadata = {
  title: 'Aviso de Privacidad',
  description: 'Aviso de privacidad de Rhino Automotive Glass: datos que recabamos, finalidades, herramientas de análisis y derechos ARCO.',
  alternates: { canonical: 'https://rhinoautoglass.mx/aviso-de-privacidad' },
};

const LAST_UPDATED = '15 de noviembre de 2026';

export default function AvisoDePrivacidadPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-10 text-secondary-800 leading-relaxed space-y-6">
        <Link href="/" className="text-sm text-primary-600 hover:text-primary-700">← Volver al inicio</Link>

        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-secondary-900">Aviso de Privacidad</h1>
          <p className="text-sm text-secondary-500">Última actualización: {LAST_UPDATED}</p>
        </header>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-secondary-900">Responsable</h2>
          <p>
            [RAZÓN SOCIAL], que opera bajo el nombre comercial Rhino Automotive Glass, con domicilio en
            Calzada Acozac 13, Ixtapaluca, Estado de México, C.P. 56530, es responsable del tratamiento de
            sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de
            los Particulares. Contacto: <a className="text-primary-600" href="mailto:info@rhinoautoglass.mx">info@rhinoautoglass.mx</a>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-secondary-900">Datos que recabamos</h2>
          <p>
            Cuando usted llena el formulario de contacto: nombre, correo electrónico, teléfono, información
            de su vehículo y el mensaje que nos escribe. No solicitamos datos personales sensibles ni
            financieros. Si nos contacta por teléfono, correo o WhatsApp, tratamos los datos que usted
            comparta en esa comunicación.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-secondary-900">Finalidades</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Responder su solicitud y elaborar cotizaciones.</li>
            <li>Enviarle un correo de confirmación de que recibimos su mensaje.</li>
            <li>Dar seguimiento a la cotización o al servicio contratado.</li>
          </ul>
          <p>
            Finalidad secundaria: medir de forma estadística el uso del sitio para mejorarlo (ver
            &ldquo;Herramientas de análisis&rdquo;). Puede oponerse a ella en cualquier momento como se describe abajo.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-secondary-900">Transferencias y encargados</h2>
          <p>
            No vendemos ni compartimos sus datos con terceros para fines propios de ellos. Utilizamos
            proveedores que los tratan por nuestra cuenta: Vercel (alojamiento del sitio), Resend (envío de
            correos del formulario) y las herramientas de análisis descritas abajo. WhatsApp es un servicio
            de Meta que se rige por sus propios términos cuando usted decide usarlo.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-secondary-900">Herramientas de análisis y cookies</h2>
          <p>
            <strong>Google Analytics 4</strong> (Google LLC): lo usamos para contar visitas y clics en los
            botones de contacto (llamar, WhatsApp, correo, cómo llegar) y envíos del formulario, sin enviar
            el contenido del formulario. Configuración:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Usa las cookies propias <code>_ga</code> y <code>_ga_&lt;identificador&gt;</code>, con una vigencia
              aproximada de 13 meses.
            </li>
            <li>
              Las direcciones de página se envían sin parámetros de consulta, salvo las etiquetas de campaña
              (<code>utm_source</code>, <code>utm_medium</code>, <code>utm_campaign</code>, <code>utm_term</code>,
              <code> utm_content</code>); de otros sitios de origen solo se envía el dominio.
            </li>
            <li>Las señales de Google y la personalización de anuncios están desactivadas.</li>
            <li>
              Si su navegador envía la señal <em>Do Not Track</em> o <em>Global Privacy Control</em>, Google
              Analytics no se carga.
            </li>
            <li>
              Google trata estos datos conforme a sus propios términos:{' '}
              <a className="text-primary-600" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
                cómo usa Google los datos de los sitios que usan sus servicios
              </a>.
            </li>
          </ul>
          <p>
            <strong>PostHog</strong>: registra los mismos eventos de contacto y las páginas visitadas, con
            una cookie o almacenamiento local propio (<code>ph_*_posthog</code>). No graba sesiones ni
            captura lo que usted escribe.
          </p>
          <p>
            <strong>Vercel Web Analytics</strong>: estadísticas agregadas de visitas sin cookies.
          </p>
          <p>
            Puede bloquear o borrar cookies desde la configuración de su navegador, o activar
            <em> Global Privacy Control</em>; el sitio sigue funcionando sin ellas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-secondary-900">Derechos ARCO y revocación</h2>
          <p>
            Usted puede acceder, rectificar, cancelar u oponerse al tratamiento de sus datos (derechos ARCO),
            así como revocar su consentimiento, enviando una solicitud a{' '}
            <a className="text-primary-600" href="mailto:info@rhinoautoglass.mx">info@rhinoautoglass.mx</a> con su
            nombre, un medio para responderle, el derecho que desea ejercer y los datos a los que se refiere.
            Le responderemos dentro de los plazos que marca la ley.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-secondary-900">Cambios a este aviso</h2>
          <p>Publicaremos cualquier cambio en esta misma página, indicando la fecha de última actualización.</p>
        </section>
      </article>
    </main>
  );
}

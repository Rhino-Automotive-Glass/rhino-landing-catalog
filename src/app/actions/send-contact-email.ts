'use server';

import { z } from 'zod';
import { Resend } from 'resend';

// --- Zod schema for server-side validation ---
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  email: z.string().email('Por favor ingresa un email válido.'),
  phone: z.string().min(1, 'El teléfono es requerido.'),
  vehicle: z.string().min(1, 'La información del vehículo es requerida.'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres.'),
});

// --- Action state type (shared with the client) ---
export type ContactFormState = {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<'name' | 'email' | 'phone' | 'vehicle' | 'message', string>>;
};

const resend = new Resend(process.env.RESEND_API_KEY);

const RECEIVING_EMAIL = 'bsorianodev@gmail.com';
const FROM_EMAIL = 'Contact Form <hello@rhinoautoglass.mx>';

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // 1. Parse & validate
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    vehicle: formData.get('vehicle'),
    message: formData.get('message'),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    // Map Zod field errors into a flat object
    const fieldErrors: ContactFormState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof NonNullable<ContactFormState['fieldErrors']>;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { success: false, message: 'Por favor corrige los errores del formulario.', fieldErrors };
  }

  const { name, email, phone, vehicle, message } = parsed.data;

  // 2. Send email via Resend
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: RECEIVING_EMAIL,
      replyTo: email,
      subject: `Nuevo contacto de ${name} — Rhino Auto Glass`,
      text: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Teléfono: ${phone}`,
        `Vehículo: ${vehicle}`,
        '',
        `Mensaje:`,
        message,
      ].join('\n'),
      // Simple HTML version for email clients that support it
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <table style="border-collapse:collapse;">
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Nombre:</td><td>${name}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${email}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Teléfono:</td><td>${phone}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Vehículo:</td><td>${vehicle}</td></tr>
        </table>
        <h3>Mensaje:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return { success: false, message: 'Error al enviar el mensaje. Por favor intenta de nuevo.' };
    }

    // 3. Send confirmation email to the user
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '¡Recibimos tu mensaje! — Rhino Auto Glass',
      text: [
        `Hola ${name},`,
        '',
        'Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos en las próximas 24 horas.',
        '',
        'Resumen de tu solicitud:',
        `  Vehículo: ${vehicle}`,
        `  Mensaje: ${message}`,
        '',
        'Si necesitas atención inmediata, puedes llamarnos al +52 55 2748 8329.',
        '',
        'Saludos,',
        'Equipo Rhino Auto Glass',
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1e3a5f;">¡Hola ${name}!</h2>
          <p>Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos en las próximas <strong>24 horas</strong>.</p>
          <h3 style="color:#1e3a5f;">Resumen de tu solicitud:</h3>
          <table style="border-collapse:collapse;">
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Vehículo:</td><td>${vehicle}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Mensaje:</td><td>${message.replace(/\n/g, '<br>')}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
          <p>Si necesitas atención inmediata, llámanos al <a href="tel:+525527488329">+52 55 2748 8329</a>.</p>
          <p style="color:#6b7280;">Saludos,<br/>Equipo Rhino Auto Glass</p>
        </div>
      `,
    }).catch((err) => {
      // Log but don't fail the whole request if the confirmation email fails
      console.error('Failed to send confirmation email:', err);
    });

    return { success: true, message: '¡Mensaje enviado correctamente! Te contactaremos pronto.' };
  } catch (err) {
    console.error('Unexpected error sending email:', err);
    return { success: false, message: 'Error inesperado. Por favor intenta de nuevo más tarde.' };
  }
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Rhino Automotive Glass - Especialistas en Cristales Automotrices',
    template: '%s | Rhino Automotive Glass'
  },
  description: 'Especialistas en cristales automotrices con más de 15 años de experiencia. Parabrisas, medallones, ventanillas y servicio a domicilio en Ciudad de México. Calidad garantizada.',
  keywords: ['cristales automotrices', 'parabrisas', 'medallones', 'ventanillas', 'Ciudad de México', 'servicio a domicilio', 'instalación profesional'],
  authors: [{ name: 'Rhino Automotive Glass' }],
  creator: 'Rhino Automotive Glass',
  publisher: 'Rhino Automotive Glass',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://rhinoautomotive.com',
    title: 'Rhino Automotive Glass - Especialistas en Cristales Automotrices',
    description: 'Especialistas en cristales automotrices con más de 15 años de experiencia. Parabrisas, medallones, ventanillas y servicio a domicilio en Ciudad de México.',
    siteName: 'Rhino Automotive Glass',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhino Automotive Glass - Especialistas en Cristales Automotrices',
    description: 'Especialistas en cristales automotrices con más de 15 años de experiencia.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Rhino Automotive Glass",
              "description": "Especialistas en cristales automotrices con más de 15 años de experiencia",
              "url": "https://rhinoautomotive.com",
              "telephone": "+525527488329",
              "email": "info@rhinoautomotive.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ciudad de México",
                "addressCountry": "MX"
              },
              "openingHours": "Mo-Sa 08:00-18:00",
              "serviceArea": {
                "@type": "City",
                "name": "Ciudad de México"
              },
              "services": [
                "Parabrisas",
                "Medallones", 
                "Ventanillas laterales",
                "Cristales traseros",
                "Servicio a domicilio",
                "Instalación profesional"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}

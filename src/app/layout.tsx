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
    default: 'Rhino Automotive Glass - Cristales para Vans y Autobuses en CDMX',
    template: '%s | Rhino Automotive Glass'
  },
  description: 'Vidrio automotriz para vans, autobuses y flotillas en Ciudad de México y Estado de México. Medallones, costados y ventanillas. Servicio a domicilio y garantía de calidad.',
  keywords: [
    'cristales automotrices', 'cristales para vans', 'cristales autobuses',
    'vidrio automotriz', 'vidrio para vans', 'vidrio autobuses',
    'medallones vans', 'costados vans',
    'cristales flotillas', 'vidrio flotillas',
    'cristales Ciudad de México', 'cristales Estado de México',
    'servicio a domicilio cristales', 'instalación profesional cristales',
    'cristales Ixtapaluca', 'cristales zona metropolitana',
    'Ford Transit cristales', 'Mercedes Sprinter cristales',
    'Volkswagen Crafter cristales', 'Nissan NV350 cristales',
  ],
  authors: [{ name: 'Rhino Automotive Glass' }],
  creator: 'Rhino Automotive Glass',
  publisher: 'Rhino Automotive Glass',
  alternates: {
    canonical: 'https://rhinoautoglass.mx',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://rhinoautoglass.mx',
    title: 'Rhino Automotive Glass - Cristales para Vans y Autobuses en CDMX',
    description: 'Vidrio automotriz para vans, autobuses y flotillas en Ciudad de México y Estado de México. Medallones, costados y ventanillas con garantía.',
    siteName: 'Rhino Automotive Glass',
    images: [{ url: 'https://rhinoautoglass.mx/parabrisas-medallones-van-camioneta-autobuses.webp', width: 1200, height: 630, alt: 'Cristales automotrices para vans y autobuses - Rhino Automotive Glass' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhino Automotive Glass - Cristales para Vans y Autobuses en CDMX',
    description: 'Vidrio automotriz para vans y autobuses en CDMX y Estado de México. Medallones, costados y ventanillas con garantía.',
    images: ['https://rhinoautoglass.mx/parabrisas-medallones-van-camioneta-autobuses.webp'],
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
        <link rel="icon" type="image/png" href="/rhino-logo.png" />
        <link rel="apple-touch-icon" href="/rhino-logo.png" />
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
              "@type": "AutoBodyShop",
              "name": "Rhino Automotive Glass",
              "description": "Especialistas en cristales automotrices para vans, autobuses y flotillas con más de 15 años de experiencia en Ciudad de México y Estado de México.",
              "url": "https://rhinoautoglass.mx",
              "telephone": "+525527488329",
              "email": "info@rhinoautoglass.mx",
              "image": "https://rhinoautoglass.mx/parabrisas-medallones-van-camioneta-autobuses.webp",
              "logo": "https://rhinoautoglass.mx/rhino-logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Calzada Acozac 13",
                "addressLocality": "Ixtapaluca",
                "addressRegion": "Estado de México",
                "postalCode": "56530",
                "addressCountry": "MX"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 19.3258975,
                "longitude": -98.8882736
              },
              "hasMap": "https://maps.app.goo.gl/nazGPfcAyHNGmv3h9",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "08:00",
                  "closes": "16:00"
                }
              ],
              "serviceArea": [
                { "@type": "City", "name": "Ciudad de México" },
                { "@type": "State", "name": "Estado de México" },
                { "@type": "City", "name": "Ixtapaluca" },
                { "@type": "City", "name": "Nezahualcóyotl" },
                { "@type": "City", "name": "Chalco" },
                { "@type": "City", "name": "Valle de Chalco Solidaridad" },
                { "@type": "City", "name": "Texcoco" }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "bestRating": "5",
                "ratingCount": "5000"
              },
              "services": [
                "Vidrios para vans",
                "Cristales para autobuses",
                "Vidrio para flotillas",
                "Medallones",
                "Costados",
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

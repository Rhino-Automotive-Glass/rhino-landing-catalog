const baseUrl = 'https://rhinoautoglass.mx'

export default function sitemap() {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changefreq: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#catalogo`,
      lastModified: new Date(),
      changefreq: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#contacto`,
      lastModified: new Date(),
      changefreq: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#ubicacion`,
      lastModified: new Date(),
      changefreq: 'monthly' as const,
      priority: 0.7,
    },
  ]
}

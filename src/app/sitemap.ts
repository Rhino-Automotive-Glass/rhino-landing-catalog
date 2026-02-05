const baseUrl = 'https://rhinoautoglass.mx'

export default function sitemap() {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changefreq: 'weekly' as const,
      priority: 1.0,
    },
  ]
}

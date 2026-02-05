'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageDetail {
  src: string
  clave: string
  dimensiones: string
  descripcion: string
}

interface ImageCarouselModalProps {
  isOpen: boolean
  onClose: () => void
  vehicleModel: string
  vehicleTitle: string
  yearRange?: string
}

export function ImageCarouselModal({ isOpen, onClose, vehicleModel, vehicleTitle, yearRange }: ImageCarouselModalProps) {
  const [images, setImages] = useState<ImageDetail[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Escape characters that have special meaning in RegExp
  const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // Parse filename to extract clave and dimensiones
  const parseFilename = (filename: string): { clave: string; dimensiones: string; descripcion: string } => {
    // Remove .png extension
    const nameWithoutExt = filename.replace('.png', '')
    
    // Split by dashes
    const parts = nameWithoutExt.split('-')
    
    // Find year range pattern (YYYY-YYYY)
    let yearEndIndex = -1
    for (let i = 0; i < parts.length - 1; i++) {
      if (parts[i].match(/^\d{4}$/) && parts[i + 1].match(/^\d{4}$/)) {
        yearEndIndex = i + 1
        break
      }
    }
    
    if (yearEndIndex === -1) {
      return { clave: '', dimensiones: '', descripcion: '' }
    }
    
    // Get parts after year range
    const afterYears = parts.slice(yearEndIndex + 1)
    
    if (afterYears.length >= 2) {
      // Clave is typically the next part after years (like FB, FD, etc.) + number
      const clave = afterYears[0] + '-' + afterYears[1]

      // Dimensiones pattern: [LL]-[5 digits]-[3 digits]x[3 digits]
      // Example: RENAULT-KANGOO-2023-2024-FB-20075-790X476-MEDALLON-IZQUIERDO
      const dimensionesMatch = nameWithoutExt.match(/[A-Z]{2}-\d{5}-(\d{3,4})[xX](\d{3,4})/i)
      const dimensiones = dimensionesMatch ? `${dimensionesMatch[1]}x${dimensionesMatch[2]}` : ''

      // Description is everything after the size segment
      const descripcionParts = afterYears.slice(3)
      const descripcionRaw = descripcionParts.length ? descripcionParts.join(' ') : ''
      const descripcionLower = descripcionRaw.toLowerCase()
      const descripcion = descripcionLower
        ? descripcionLower.charAt(0).toUpperCase() + descripcionLower.slice(1)
        : ''

      return { clave, dimensiones, descripcion }
    }

    // If we cannot parse expected segments, attempt dimensiones best-effort on full name
    const fallbackMatch = nameWithoutExt.match(/(\d{3,4})[xX](\d{3,4})/)
    const fallbackDim = fallbackMatch ? `${fallbackMatch[1]}x${fallbackMatch[2]}` : ''
    return { clave: '', dimensiones: fallbackDim, descripcion: '' }
  }

  // Fetch matching images when modal opens
  useEffect(() => {
    if (!isOpen || !vehicleModel) return

    const fetchImages = async () => {
      setIsLoading(true)
      
      try {
        // Get list of all images in detail-glass folder
        const response = await fetch('/api/detail-glass-images')
        
        if (!response.ok) {
          throw new Error('Failed to fetch images')
        }
        
        const allImages: string[] = await response.json()
        
        // Filter images that match the vehicle model (case-insensitive, exact word match)
        const modelRegex = new RegExp(`\\b${escapeRegExp(vehicleModel)}\\b`, 'i')
        let matchingImages = allImages.filter(filename => 
          modelRegex.test(filename)
        )
        
        // If year range is provided, also filter by year range
        if (yearRange) {
          const yearRangeRegex = new RegExp(escapeRegExp(yearRange), 'i')
          matchingImages = matchingImages.filter(filename => 
            yearRangeRegex.test(filename)
          )
        }
        
        // Parse each matching image
        const imageDetails: ImageDetail[] = matchingImages.map(filename => {
          const { clave, dimensiones, descripcion } = parseFilename(filename)
          return {
            src: `/detail-glass/${filename}`,
            clave,
            dimensiones,
            descripcion,
          }
        })
        
        setImages(imageDetails)
        setCurrentIndex(0)
      } catch (error) {
        console.error('Error fetching images:', error)
        setImages([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [isOpen, vehicleModel, yearRange])

  // Close modal with escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full h-full md:w-auto md:h-auto md:max-w-4xl md:max-h-[90vh] bg-white/95 backdrop-blur-2xl md:rounded-xl border border-white/40 shadow-glass overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/40">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {vehicleTitle}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/40 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6">
          {isLoading ? (
            /* Loading Spinner */
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <span className="ml-3 text-gray-600">Cargando imágenes...</span>
            </div>
          ) : images.length === 0 ? (
            /* No Images Found */
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg">
                  No tenemos la descripción de los cristales individuales
                </p>
              </div>
            </div>
          ) : (
            /* Carousel */
            <div className="space-y-4">
              {/* Main Image Container */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <div className="w-full h-64 md:h-96 flex items-center justify-center">
                  <img
                    src={images[currentIndex].src}
                    alt={`Cristal ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                    const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                }}
                  />
                </div>
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Image Information */}
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Clave:</span>
                    <span className="ml-2 text-gray-900">
                      {images[currentIndex].clave || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Dimensiones:</span>
                    <span className="ml-2 text-gray-900">
                      {images[currentIndex].dimensiones || 'N/A'}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium text-gray-700">Descripción:</span>
                    <span className="ml-2 text-gray-900">
                      {images[currentIndex].descripcion || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dot Indicators */}
              {images.length > 1 && (
                <div className="flex justify-center space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex 
                          ? 'bg-primary-600' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="text-center text-sm text-gray-500">
                  {currentIndex + 1} de {images.length}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

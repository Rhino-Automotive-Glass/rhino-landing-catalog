'use client'

import { useState, useMemo } from 'react'
import { passengerSideGlassData } from '@/config/vehicles'
import { Search, Filter, Grid3X3, List } from 'lucide-react'
import { ImageCarouselModal } from './ImageCarouselModal'

// Types
interface ProductItem {
  id: string
  title: string
  image: string
  manufacturer: string
}

type Manufacturer = 'Chevrolet' | 'Fiat' | 'Ford' | 'Foton' | 'Hyundai' | 'JAC' | 'Mercedes' | 'Nissan' | 'Peugeot' | 'Ram' | 'Renault' | 'Toyota' | 'Volkswagen'

// Transform vehicle data into product format
const allProducts: ProductItem[] = passengerSideGlassData.map(vehicle => {
  // Create a proper title with year range
  const yearRange = vehicle.yearStart && vehicle.yearEnd 
    ? `${vehicle.yearStart}-${vehicle.yearEnd}`
    : vehicle.yearStart 
    ? `${vehicle.yearStart}+`
    : vehicle.yearEnd 
    ? `hasta ${vehicle.yearEnd}`
    : 'Todos los años'
  
  // Format model name (handle special cases and clean up)
  let modelName = vehicle.model
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capitals
    .replace(/([0-9])([A-Z])/g, '$1 $2') // Add space between numbers and capitals
    .replace(/([A-Z])([0-9])/g, '$1 $2') // Add space between capitals and numbers
    .replace(/L([0-9])/g, 'L$1') // Handle L2, L4 cases
    .replace(/h([0-9])/g, 'H$1') // Handle h2 cases
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\./g, ' ') // Replace dots with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
  
  // Capitalize first letter of each word
  modelName = modelName.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
  
  // Special cases for model names
  modelName = modelName
    .replace('Ducato Maxi', 'Ducato Maxi')
    .replace('Etransit', 'E-Transit')
    .replace('Nv350', 'NV350')
    .replace('Promaster', 'Pro Master')
    .replace('Hiace', 'Hiace')
    .replace('Caddyvan', 'Caddy Van')
    .replace('Eurovandiesel', 'Eurovan Diesel')
    .replace('Ducatoambulancia', 'Ducato Ambulancia')
    .replace('Transit110', 'Transit 110')
    .replace('Transitambulancia', 'Transit Ambulancia')
    .replace('Transitcorta', 'Transit Corta')

  const title = `${modelName} ${yearRange}`
  
  return {
    id: vehicle.id,
    title: title,
    image: `/rhinoaglass-passenger-side/${vehicle.image}`,
    manufacturer: vehicle.manufacturer
  }
})

// Extract unique manufacturers from the vehicle data
const manufacturers: Manufacturer[] = Array.from(
  new Set(passengerSideGlassData.map(vehicle => vehicle.manufacturer))
).sort() as Manufacturer[]

export function WindshieldCatalog() {
  const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | 'Todos'>('Todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<{ model: string; title: string; yearRange?: string } | null>(null)

  // Handle opening modal
  const handleViewDetails = (productItem: ProductItem) => {
    // Find the original vehicle object to get the model
    const vehicle = passengerSideGlassData.find(v => v.id === productItem.id)
    if (vehicle) {
      // Create year range string from vehicle data
      const yearRange = vehicle.yearStart && vehicle.yearEnd 
        ? `${vehicle.yearStart}-${vehicle.yearEnd}`
        : vehicle.yearStart 
        ? `${vehicle.yearStart}+`
        : vehicle.yearEnd 
        ? `hasta-${vehicle.yearEnd}`
        : undefined
      
      setSelectedVehicle({
        model: vehicle.model,
        title: productItem.title,
        yearRange
      })
      setModalOpen(true)
    }
  }

  // Calculate counts for each manufacturer
  const manufacturerCounts = useMemo(() => {
    const counts: Record<string, number> = { 'Todos': allProducts.length }
    manufacturers.forEach(manufacturer => {
      counts[manufacturer] = allProducts.filter(item => item.manufacturer === manufacturer).length
    })
    return counts
  }, [])

  // Filter data based on selected manufacturer and search term
  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    // Filter by manufacturer
    if (selectedManufacturer !== 'Todos') {
      filtered = filtered.filter(item => item.manufacturer === selectedManufacturer)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [selectedManufacturer, searchTerm])

  return (
    <section id="catalogo" className="section-padding bg-secondary-50">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Catálogo de Parabrisas
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Encuentra el parabrisas perfecto para tu vehículo. Somos fabricantes de la mayor variedad 
            de cristales automotrices para todas las marcas y modelos.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por modelo o marca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus-ring bg-white"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-white rounded-lg border border-secondary-300 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-secondary-600 hover:bg-secondary-100'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-secondary-600 hover:bg-secondary-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Filter */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="card p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5 text-secondary-600" />
                <h3 className="font-semibold text-secondary-900">
                  Filtrar por Marca
                </h3>
              </div>
              
              <div className="space-y-2">
                {/* All Manufacturers Option */}
                <label className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors group">
                  <input
                    type="radio"
                    name="manufacturer"
                    value="Todos"
                    checked={selectedManufacturer === 'Todos'}
                    onChange={(e) => setSelectedManufacturer(e.target.value as 'Todos')}
                    className="w-4 h-4 text-primary-600 border-secondary-300 focus:ring-primary-500"
                  />
                  <span className="ml-3 text-sm font-medium text-secondary-700 flex-1 group-hover:text-secondary-900">
                    Todas las marcas
                  </span>
                  <span className="bg-secondary-100 text-secondary-600 text-xs px-2 py-1 rounded-full font-medium">
                    {manufacturerCounts['Todos']}
                  </span>
                </label>

                {/* Individual Manufacturers */}
                {manufacturers.map(manufacturer => (
                  <label
                    key={manufacturer}
                    className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors group"
                  >
                    <input
                      type="radio"
                      name="manufacturer"
                      value={manufacturer}
                      checked={selectedManufacturer === manufacturer}
                      onChange={(e) => setSelectedManufacturer(e.target.value as Manufacturer)}
                      className="w-4 h-4 text-primary-600 border-secondary-300 focus:ring-primary-500"
                    />
                    <span className="ml-3 text-sm font-medium text-secondary-700 flex-1 group-hover:text-secondary-900">
                      {manufacturer}
                    </span>
                    <span className="bg-secondary-100 text-secondary-600 text-xs px-2 py-1 rounded-full font-medium">
                      {manufacturerCounts[manufacturer]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid/List */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-secondary-900">
                  Productos Disponibles
                </h3>
                <p className="text-sm text-secondary-600 mt-1">
                  Mostrando {filteredProducts.length} de {allProducts.length} productos
                  {searchTerm && ` para "${searchTerm}"`}
                </p>
              </div>
            </div>

            {/* Product Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }`}>
                {filteredProducts.map((item) => (
                  viewMode === 'grid' ? (
                    // Grid View
                    <div
                      key={item.id}
                      className="card card-hover overflow-hidden group cursor-pointer"
                    >
                      <div className="aspect-[7/3] overflow-hidden bg-secondary-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-3 py-1 rounded-full">
                            {item.manufacturer}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-secondary-900 line-clamp-2 leading-relaxed">
                          {item.title}
                        </h4>
                        <div className="mt-4 pt-4 border-t border-secondary-100">
                          <button 
                            onClick={() => handleViewDetails(item)}
                            className="btn btn-sm btn-primary w-full"
                          >
                            Ver Detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div
                      key={item.id}
                      className="card p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center space-x-6">
                        <div className="w-24 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-base font-medium text-secondary-900 mb-1">
                                {item.title}
                              </h4>
                              <span className="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-2 py-1 rounded">
                                {item.manufacturer}
                              </span>
                            </div>
                            <button 
                              onClick={() => handleViewDetails(item)}
                              className="btn btn-sm btn-primary ml-4"
                            >
                              Ver Detalles
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="mx-auto w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-12 h-12 text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    No se encontraron productos
                  </h3>
                  <p className="text-secondary-600 mb-6 leading-relaxed">
                    {searchTerm 
                      ? `No hay productos que coincidan con "${searchTerm}"`
                      : 'No hay productos que coincidan con los filtros seleccionados.'}
                  </p>
                  <div className="space-x-3">
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="btn btn-secondary btn-md"
                      >
                        Limpiar búsqueda
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedManufacturer('Todos')
                        setSearchTerm('')
                      }}
                      className="btn btn-primary btn-md"
                    >
                      Ver todos los productos
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Image Carousel Modal */}
      <ImageCarouselModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        vehicleModel={selectedVehicle?.model || ''}
        vehicleTitle={selectedVehicle?.title || ''}
        yearRange={selectedVehicle?.yearRange}
      />
    </section>
  )
}

'use client'

import { useState, useMemo } from 'react'
import vehicleObjects from '@/config/vehicles'

// Types
interface ProductItem {
  id: string
  title: string
  image: string
  manufacturer: string
}

type Manufacturer = 'Chevrolet' | 'Fiat' | 'Ford' | 'Foton' | 'Hyundai' | 'JAC' | 'Mercedes' | 'Nissan' | 'Peugeot' | 'Ram' | 'Renault' | 'Toyota' | 'Volkswagen'

// Transform vehicle data into product format
const allProducts: ProductItem[] = vehicleObjects.map(vehicle => {
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
    .replace('Promaster', 'ProMaster')
    .replace('Hiace', 'HiAce')
    .replace('Caddyvan', 'Caddy Van')
    .replace('Eurovandiesel', 'Eurovan Diesel')
  
  const title = `${vehicle.manufacturer} ${modelName} ${yearRange}`
  
  return {
    id: vehicle.id,
    title: title,
    image: `/rhinoaglass-passenger-side/${vehicle.image}`,
    manufacturer: vehicle.manufacturer
  }
})

// Extract unique manufacturers from the vehicle data
const manufacturers: Manufacturer[] = Array.from(
  new Set(vehicleObjects.map(vehicle => vehicle.manufacturer))
).sort() as Manufacturer[]

export function WindshieldCatalog() {
  const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | 'Todos'>('Todos')

  // Calculate counts for each manufacturer
  const manufacturerCounts = useMemo(() => {
    const counts: Record<string, number> = { 'Todos': allProducts.length }
    manufacturers.forEach(manufacturer => {
      counts[manufacturer] = allProducts.filter(item => item.manufacturer === manufacturer).length
    })
    return counts
  }, [])

  // Filter data based on selected manufacturer
  const filteredProducts = useMemo(() => {
    if (selectedManufacturer === 'Todos') return allProducts
    return allProducts.filter(item => item.manufacturer === selectedManufacturer)
  }, [selectedManufacturer])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Catálogo de Parabrisas
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra el parabrisas perfecto para tu vehículo. Somos fabricantes de la mayor variedad 
              de cristales automotrices para todas las marcas y modelos.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar Filter */}
          <div className="w-48 lg:w-64 flex-shrink-0">
            <div className="sticky top-4 bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                Filtrar por Marca
              </h3>
              
              <div className="space-y-2">
                {/* All Manufacturers Option */}
                <label className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="manufacturer"
                    value="Todos"
                    checked={selectedManufacturer === 'Todos'}
                    onChange={(e) => setSelectedManufacturer(e.target.value as 'Todos')}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700 flex-1">Todos</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {manufacturerCounts['Todos']}
                  </span>
                </label>

                {/* Individual Manufacturers */}
                {manufacturers.map(manufacturer => (
                  <label
                    key={manufacturer}
                    className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="manufacturer"
                      value={manufacturer}
                      checked={selectedManufacturer === manufacturer}
                      onChange={(e) => setSelectedManufacturer(e.target.value as Manufacturer)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700 flex-1">{manufacturer}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {manufacturerCounts[manufacturer]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Productos
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Mostrando {filteredProducts.length} de {allProducts.length} productos
                </p>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="aspect-[7/3] pt-5 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          {item.manufacturer}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-gray-500 mb-4">
                    No hay productos que coincidan con los filtros seleccionados.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedManufacturer('Todos')
                    }}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

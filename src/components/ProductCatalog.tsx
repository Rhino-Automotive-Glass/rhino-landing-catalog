'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import type { ProductWithSource, PaginatedResponse } from '@/lib/types';

const PAGE_SIZE = 30;

function getProductImage(product: ProductWithSource): string | null {
  const main = product.images?.main;
  if (!main) return null;
  return main.left || main.right || main.back || null;
}

export function ProductCatalog() {
  const [products, setProducts] = useState<ProductWithSource[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);
  const [brandFilter, setBrandFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Fetch brands
  useEffect(() => {
    fetch('/api/brands')
      .then((r) => r.json())
      .then((d) => setBrands(d.brands ?? []))
      .catch(() => {});
  }, []);

  // Debounced search term for API calls
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when filter or search changes
  useEffect(() => {
    setPage(1);
  }, [brandFilter, debouncedSearch]);

  // Fetch products with AbortController to cancel stale requests
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
    });
    if (brandFilter && brandFilter !== 'all') {
      params.set('search', brandFilter);
    }
    if (debouncedSearch) {
      params.set('q', debouncedSearch);
    }
    fetch(`/api/products?${params}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((json: PaginatedResponse<ProductWithSource>) => {
        setProducts(json.data);
        setTotalCount(json.count);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setProducts([]);
          setTotalCount(0);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [page, brandFilter, debouncedSearch]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));


  return (
    <section id="catalogo" className="section-padding relative overflow-hidden scroll-mt-20">
      {/* Glass background blobs */}
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-primary-300/35 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[550px] h-[550px] bg-accent-300/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-200/25 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Catalogo de Cristales para Vans y Autobuses
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Medallones, costados y ventanillas para las principales marcas de vans,
            autobuses y vehiculos comerciales. Ford Transit, Mercedes Sprinter, Volkswagen Crafter,
            Nissan NV350, Toyota Hiace y mas.
          </p>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-secondary-900">
              Productos Disponibles
            </h3>
          </div>
        </div>     
        {/* Search and Brand Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">     
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-600 w-5 h-5 z-10 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por modelo, marca o codigo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-white/50 rounded-lg focus-ring bg-white/70 backdrop-blur-md"
            />
          </div>

          {/* Brand Select */}
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="px-4 py-3 border border-white/50 rounded-lg focus-ring bg-white/70 backdrop-blur-md text-secondary-700 min-w-[180px]"
          >
            <option value="all">Todas las marcas</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          {/* Results count */}
          <p className="text-sm text-secondary-600 self-center whitespace-nowrap hidden sm:block">
            {loading ? 'Cargando...' : `${totalCount} productos`}
          </p>
        </div>

        <div>
          {/* Product Grid */}
          <div className="min-h-[600px] max-h-[800px] sm:max-h-none overflow-y-auto sm:overflow-visible">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="h-8 w-8 animate-spin text-secondary-400" />
              </div>
            ) : products.length === 0 ? (
              <div className="flex items-center justify-center py-32">
                <div className="max-w-md mx-auto text-center">
                  <div className="mx-auto w-24 h-24 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
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
                        Limpiar busqueda
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setBrandFilter('all');
                        setSearchTerm('');
                      }}
                      className="btn btn-primary btn-md"
                    >
                      Ver todos los productos
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(isMobile ? products.slice(0, 10) : products).map((product) => {
                  const imageUrl = getProductImage(product);
                  return (
                    <div
                      key={product.id}
                      className="group cursor-pointer rounded-xl overflow-hidden bg-white border border-gray-200 transition-all duration-200 hover:ring-2 hover:ring-primary-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                    >
                      <div className="relative aspect-[10/7]">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={`${product.brand ?? ''} ${product.model ?? ''}`}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : (
                          <Image
                            src="/van.png"
                            alt="Sin imagen disponible"
                            fill
                            className="object-contain"
                          />
                        )}
                      </div>
                      <div className="p-3 space-y-0.5 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between gap-2">
                          {product.brand && (
                            <p className="text-lg font-semibold text-gray-900">{product.brand}</p>
                          )}
                          {product.model && (
                            <p className="text-lg text-gray-600">{product.model}</p>
                          )}
                        </div>
                        <p className="text-base text-gray-500 truncate">
                          {product.product_codes?.product_code_data?.generated ?? '\u2014'}
                        </p>
                        <p className="text-base text-gray-400 truncate">
                          {product.product_codes?.description_data?.generated ?? '\u2014'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="btn btn-secondary btn-sm disabled:opacity-50 disabled:pointer-events-none"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </button>
                <span className="text-sm text-secondary-600">
                  Pagina {page} de {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="btn btn-secondary btn-sm disabled:opacity-50 disabled:pointer-events-none"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

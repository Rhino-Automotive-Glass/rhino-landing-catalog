'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, PackageSearch } from 'lucide-react';
import type {
  Brand,
  BrandListResponse,
  PaginatedResponse,
  ProductWithSource,
} from '@/lib/types';

const PAGE_SIZE = 16;

const BRAND_LOGOS: Record<string, string> = {
  Changan: '/brands/changan.png',
  Chevrolet: '/brands/chevrolet.png',
  Dongfeng: '/brands/dongfeng.png',
  Ford: '/brands/ford.png',
  Foton: '/brands/foton.png',
  Hyundai: '/brands/hyundai.png',
  JAC: '/brands/jac.png',
  Joylong: '/brands/joylong.png',
  'Mercedes-Benz': '/brands/mercedesbenz.png',
  Peugeot: '/brands/peugeot.png',
  Ram: '/brands/ram.png',
  Renault: '/brands/renault.png',
  Toyota: '/brands/toyota.png',
  Vizeon: '/brands/vizeon.png',
  Volkswagen: '/brands/wolkswagen.png',
};

function getProductImage(product: ProductWithSource): string | null {
  const main = product.images?.main;
  if (!main) return null;
  return main.left || main.right || main.back || null;
}

function getBrandLogo(brandName: string): string | null {
  return BRAND_LOGOS[brandName] ?? null;
}

function getProductTitle(product: ProductWithSource): string {
  return [product.model, product.subModel].filter(Boolean).join(' ') || 'Producto sin modelo';
}

export function ProductCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedBrandId = searchParams.get('brand') ?? '';
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const [products, setProducts] = useState<ProductWithSource[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const selectedBrand = useMemo(
    () => brands.find((brand) => brand.id === selectedBrandId) ?? null,
    [brands, selectedBrandId]
  );

  useEffect(() => {
    setBrandsLoading(true);

    fetch('/api/brands?scope=catalog')
      .then(async (response) => {
        const json = (await response.json()) as BrandListResponse & { error?: string };
        if (!response.ok) {
          throw new Error(json.error ?? 'Failed to load brands');
        }
        setBrands(Array.isArray(json.brands) ? json.brands : []);
      })
      .catch(() => setBrands([]))
      .finally(() => setBrandsLoading(false));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [selectedBrandId]);

  useEffect(() => {
    if (!selectedBrandId) {
      setProducts([]);
      setTotalCount(0);
      setProductsLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    setProductsLoading(true);

    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
      brandId: selectedBrandId,
    });

    fetch(`/api/products?${params}`, { signal: controller.signal })
      .then(async (response) => {
        const json = (await response.json()) as PaginatedResponse<ProductWithSource> & {
          error?: string;
        };

        if (!response.ok) {
          throw new Error(json.error ?? 'Failed to load products');
        }

        if (page === 1) {
          console.log('[ProductCatalog] Brand selection results', {
            brandId: selectedBrandId,
            brandName: selectedBrand?.name ?? null,
            totalCount: typeof json.count === 'number' ? json.count : 0,
            products: Array.isArray(json.data) ? json.data : [],
          });
        }

        setProducts(Array.isArray(json.data) ? json.data : []);
        setTotalCount(typeof json.count === 'number' ? json.count : 0);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setProducts([]);
        setTotalCount(0);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setProductsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [page, selectedBrand, selectedBrandId]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const emptySlotCount = Math.max(0, PAGE_SIZE - products.length);
  const showInitialProductSkeleton = productsLoading && products.length === 0;
  const showProductsGrid = products.length > 0;
  const showProductsOverlay = productsLoading && products.length > 0;

  function openBrand(brandId: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('brand', brandId);
    router.push(`${pathname}?${params.toString()}#catalogo`);
  }

  function clearBrand() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('brand');
    const query = params.toString();
    router.push(query ? `${pathname}?${query}#catalogo` : `${pathname}#catalogo`);
  }

  return (
    <section id="catalogo" className="section-padding relative overflow-hidden scroll-mt-20">
      <div className="absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-primary-300/35 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[550px] w-[550px] rounded-full bg-accent-300/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-200/25 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl container-padding">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-secondary-900 md:text-4xl">
            Catálogo de Cristales para Vans y Autobuses
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-secondary-600">
            Explora primero las marcas disponibles y luego consulta todos los cristales
            relacionados con la marca seleccionada en el mismo catálogo.
          </p>
        </div>

        {!selectedBrandId ? (
          <>
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-semibold text-secondary-900">
                Explora por marca
              </h3>
              <p className="mt-2 text-secondary-600">
                Selecciona una marca para ver todos los productos relacionados.
              </p>
            </div>

            {brandsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
              </div>
            ) : brands.length === 0 ? (
              <div className="flex items-center justify-center py-20 text-secondary-600">
                No hay marcas disponibles.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
                {brands.map((brand) => {
                  const logoSrc = getBrandLogo(brand.name);

                  return (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => openBrand(brand.id)}
                      className="rounded-2xl border border-white/40 bg-white/50 px-5 py-6 text-center ring-1 ring-white/20 ring-inset backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-glass"
                    >
                      <div className="flex flex-col items-center">
                        <div className="mb-2 flex h-20 w-full items-center justify-center">
                          {logoSrc ? (
                            <Image
                              src={logoSrc}
                              alt={`${brand.name} logo`}
                              width={192}
                              height={96}
                              className="max-h-full w-auto max-w-full object-contain"
                            />
                          ) : (
                            <PackageSearch className="h-10 w-10 text-primary-600" />
                          )}
                        </div>
                        <p className="text-lg font-semibold text-secondary-900">
                          {brand.name}
                        </p>
                        <p className="mt-1 text-sm text-secondary-500">
                          {brand.productCount ?? 0} productos
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <button
                  type="button"
                  onClick={clearBrand}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 transition-colors hover:text-primary-900"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver a marcas
                </button>
                <h3 className="mt-3 text-2xl font-semibold text-secondary-900">
                  {selectedBrand?.name ?? 'Productos de la marca'}
                </h3>
                <p className="mt-1 text-secondary-600">
                  {totalCount} productos relacionados con esta marca
                </p>
              </div>
            </div>

            {showInitialProductSkeleton ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <article
                    key={`product-skeleton-${index}`}
                    className="overflow-hidden rounded-2xl border border-white/40 bg-white/50 ring-1 ring-white/20 ring-inset backdrop-blur-2xl"
                  >
                    <div className="aspect-[10/5] bg-white/40" />
                    <div className="space-y-3 p-5">
                      <div className="h-6 w-24 animate-pulse rounded-full bg-primary-100/70" />
                      <div className="h-6 w-3/4 animate-pulse rounded-full bg-secondary-200/70" />
                      <div className="h-4 w-2/3 animate-pulse rounded-full bg-secondary-200/60" />
                      <div className="h-4 w-full animate-pulse rounded-full bg-secondary-200/50" />
                      <div className="h-4 w-5/6 animate-pulse rounded-full bg-secondary-200/40" />
                    </div>
                  </article>
                ))}
              </div>
            ) : !showProductsGrid ? (
              <div className="flex items-center justify-center py-20">
                <div className="max-w-md text-center">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/50 backdrop-blur-sm">
                    <PackageSearch className="h-10 w-10 text-secondary-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-900">
                    No se encontraron productos
                  </h4>
                  <p className="mt-2 text-secondary-600">
                    Esta marca no tiene productos visibles en este momento.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="relative" aria-busy={showProductsOverlay}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => {
                      const imageUrl = getProductImage(product);

                      return (
                        <article
                          key={product.id}
                          className="overflow-hidden rounded-2xl border border-white/40 bg-white/50 ring-1 ring-white/20 ring-inset backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-glass"
                        >
                          <div className="relative aspect-[10/5] overflow-hidden bg-white/30">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={getProductTitle(product)}
                                className="absolute top-1/2 left-0 w-full -translate-y-1/2"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <Image
                                  src="/van.png"
                                  alt="Sin imagen disponible"
                                  width={312}
                                  height={78}
                                  className="object-contain opacity-60"
                                />
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <h4 className="text-lg font-semibold text-secondary-900">
                              {getProductTitle(product)}
                            </h4>
                            <p className="mt-2 text-sm text-secondary-600">
                              {product.product_codes?.product_code_data?.generated ?? 'Sin código generado'}
                            </p>
                            <p className="mt-1 text-sm text-secondary-500">
                              {product.product_codes?.description_data?.generated ?? 'Sin descripción generada'}
                            </p>
                            {product.additional_brands.length > 0 && (
                              <p className="mt-3 text-sm text-secondary-500">
                                También relacionado con:{' '}
                                {product.additional_brands.map((brand) => brand.name).join(', ')}
                              </p>
                            )}
                          </div>
                        </article>
                      );
                    })}
                    {Array.from({ length: emptySlotCount }).map((_, index) => (
                      <article
                        key={`product-placeholder-${index}`}
                        aria-hidden="true"
                        className="invisible overflow-hidden rounded-2xl border border-white/40 bg-white/50 ring-1 ring-white/20 ring-inset backdrop-blur-2xl"
                      >
                        <div className="aspect-[10/5]" />
                        <div className="space-y-3 p-5">
                          <div className="h-6 w-24 rounded-full" />
                          <div className="h-6 w-3/4 rounded-full" />
                          <div className="h-4 w-2/3 rounded-full" />
                          <div className="h-4 w-full rounded-full" />
                          <div className="h-4 w-5/6 rounded-full" />
                        </div>
                      </article>
                    ))}
                  </div>

                  {showProductsOverlay && (
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-white/30 backdrop-blur-[1px] transition-opacity duration-200">
                      <div className="absolute inset-x-0 top-0 h-1 overflow-hidden rounded-t-3xl bg-white/40">
                        <div className="h-full w-1/3 animate-pulse rounded-full bg-primary-500/70" />
                      </div>
                    </div>
                  )}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                      disabled={page <= 1}
                      className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-sm font-medium text-secondary-700 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Anterior
                    </button>
                    <span className="text-sm text-secondary-600">
                      Página {page} de {totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
                      disabled={page >= totalPages}
                      className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-sm font-medium text-secondary-700 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Siguiente
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

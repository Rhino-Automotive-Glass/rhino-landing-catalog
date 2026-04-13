'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PackageSearch,
  Search,
  X,
} from 'lucide-react';
import type {
  Brand,
  BrandListResponse,
  PaginatedResponse,
  ProductWithSource,
  SubModelListResponse,
} from '@/lib/types';

const PAGE_SIZE = 16;
const CONNECTION_WARNING_TEXT = 'Tu conexion, tiene problemas.';
const CONNECTION_WARNING_VISIBLE_MS = 2600;
const CONNECTION_WARNING_FADE_MS = 500;

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
  return product.images?.[0] ?? null;
}

function getBrandLogo(brandName: string): string | null {
  return BRAND_LOGOS[brandName] ?? null;
}

function getProductTitle(product: ProductWithSource): string {
  return [product.model, product.subModel].filter(Boolean).join(' ') || 'Producto sin modelo';
}

function getProductPreviewTitle(product: ProductWithSource): string {
  return product.product_codes?.description_data?.generated ?? getProductTitle(product);
}

export function ProductCatalog() {
  const sectionRef = useRef<HTMLElement>(null);
  const connectionWarningFadeTimeoutRef = useRef<number | null>(null);
  const connectionWarningHideTimeoutRef = useRef<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedBrandId = searchParams.get('brand') ?? '';
  const selectedSubModel = searchParams.get('subModel') ?? '';
  const selectedSearch = searchParams.get('search') ?? '';
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const [subModels, setSubModels] = useState<string[]>([]);
  const [subModelsLoading, setSubModelsLoading] = useState(false);
  const [products, setProducts] = useState<ProductWithSource[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(selectedSearch);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [previewProduct, setPreviewProduct] = useState<ProductWithSource | null>(null);
  const [connectionWarningState, setConnectionWarningState] = useState<'hidden' | 'visible' | 'fading'>('hidden');

  const selectedBrand = useMemo(
    () => brands.find((brand) => brand.id === selectedBrandId) ?? null,
    [brands, selectedBrandId]
  );
  const hasActiveSearch = selectedSearch.trim().length > 0;
  const shouldShowProductResults = Boolean(selectedBrandId || hasActiveSearch);

  function clearConnectionWarningTimers() {
    if (connectionWarningFadeTimeoutRef.current !== null) {
      window.clearTimeout(connectionWarningFadeTimeoutRef.current);
      connectionWarningFadeTimeoutRef.current = null;
    }

    if (connectionWarningHideTimeoutRef.current !== null) {
      window.clearTimeout(connectionWarningHideTimeoutRef.current);
      connectionWarningHideTimeoutRef.current = null;
    }
  }

  function showConnectionWarning() {
    setConnectionWarningState('visible');
    clearConnectionWarningTimers();

    connectionWarningFadeTimeoutRef.current = window.setTimeout(() => {
      setConnectionWarningState('fading');
    }, CONNECTION_WARNING_VISIBLE_MS);

    connectionWarningHideTimeoutRef.current = window.setTimeout(() => {
      setConnectionWarningState('hidden');
      clearConnectionWarningTimers();
    }, CONNECTION_WARNING_VISIBLE_MS + CONNECTION_WARNING_FADE_MS);
  }

  useEffect(() => {
    const handleOffline = () => {
      showConnectionWarning();
    };

    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      clearConnectionWarningTimers();
    };
  }, []);

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
      .catch(() => {
        setBrands([]);
        showConnectionWarning();
      })
      .finally(() => setBrandsLoading(false));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [selectedBrandId, selectedSearch, selectedSubModel]);

  useEffect(() => {
    setSearchInput(selectedSearch);
  }, [selectedSearch]);

  useEffect(() => {
    if (!previewProduct) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewProduct(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewProduct]);

  useEffect(() => {
    if (!selectedBrandId) {
      setSubModels([]);
      setSubModelsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setSubModelsLoading(true);

    fetch(`/api/products/submodels?brandId=${selectedBrandId}`, { signal: controller.signal })
      .then(async (response) => {
        const json = (await response.json()) as SubModelListResponse & { error?: string };

        if (!response.ok) {
          throw new Error(json.error ?? 'Failed to load submodels');
        }

        setSubModels(Array.isArray(json.subModels) ? json.subModels : []);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setSubModels([]);
        showConnectionWarning();
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setSubModelsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [selectedBrandId]);

  useEffect(() => {
    if (!shouldShowProductResults) {
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
      visibility: 'visible',
    });

    if (selectedBrandId) {
      params.set('brandId', selectedBrandId);
    }

    if (selectedBrandId && selectedSubModel) {
      params.set('subModel', selectedSubModel);
    }

    if (selectedSearch) {
      params.set('search', selectedSearch);
    }

    fetch(`/api/products?${params}`, { signal: controller.signal })
      .then(async (response) => {
        const json = (await response.json()) as PaginatedResponse<ProductWithSource> & {
          error?: string;
        };

        if (!response.ok) {
          throw new Error(json.error ?? 'Failed to load products');
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
        showConnectionWarning();
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setProductsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [page, selectedBrandId, selectedSearch, selectedSubModel, shouldShowProductResults]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const emptySlotCount = Math.max(0, PAGE_SIZE - products.length);
  const showInitialProductSkeleton = productsLoading && products.length === 0;
  const showProductsGrid = products.length > 0;
  const showProductsOverlay = productsLoading && products.length > 0;
  const brandAnimationKey = brands.map(({ id }) => id).join(',');
  const productAnimationKey = products.map(({ id }) => id).join(',');

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const selector = shouldShowProductResults
      ? '[data-gsap-catalog="product-card"]'
      : '[data-gsap-catalog="brand-card"]';

    if ((!shouldShowProductResults && brandsLoading) || (shouldShowProductResults && productsLoading)) {
      return undefined;
    }

    let isActive = true;
    let dispose = () => {};

    const animateItems = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (!isActive || !sectionRef.current) {
        return;
      }

      const section = sectionRef.current;
      const items = section.querySelectorAll<HTMLElement>(selector);

      if (items.length === 0) {
        ScrollTrigger.refresh();
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          items,
          {
            y: 26,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            ease: 'power3.out',
            stagger: 0.06,
            clearProps: 'transform,opacity',
          }
        );
      }, section);

      ScrollTrigger.refresh();

      dispose = () => {
        ctx.revert();
      };
    };

    void animateItems();

    return () => {
      isActive = false;
      dispose();
    };
  }, [
    brandAnimationKey,
    brandsLoading,
    page,
    productAnimationKey,
    productsLoading,
    shouldShowProductResults,
  ]);

  function openBrand(brandId: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('brand', brandId);
    params.delete('subModel');
    router.push(`${pathname}?${params.toString()}#catalogo`);
  }

  function clearBrand() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('brand');
    params.delete('subModel');
    const query = params.toString();
    router.push(query ? `${pathname}?${query}#catalogo` : `${pathname}#catalogo`);
  }

  function updateSubModelFilter(nextSubModel: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextSubModel) {
      params.set('subModel', nextSubModel);
    } else {
      params.delete('subModel');
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}#catalogo` : `${pathname}#catalogo`);
  }

  useEffect(() => {
    const normalizedSearchInput = searchInput.trim();
    const normalizedSelectedSearch = selectedSearch.trim();

    if (normalizedSearchInput === normalizedSelectedSearch) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setPage(1);
      setProducts([]);
      setTotalCount(0);
      setProductsLoading(true);

      const params = new URLSearchParams(searchParams.toString());

      if (normalizedSearchInput) {
        params.set('search', normalizedSearchInput);
      } else {
        params.delete('search');
      }

      params.delete('q');

      if (!selectedBrandId) {
        params.delete('subModel');
      }

      const query = params.toString();

      startTransition(() => {
        router.replace(query ? `${pathname}?${query}#catalogo` : `${pathname}#catalogo`);
      });
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname, router, searchInput, searchParams, selectedBrandId, selectedSearch]);

  const searchHelperText = hasActiveSearch
    ? selectedBrandId
      ? `Mostrando resultados para "${selectedSearch}" en ${selectedBrand?.name ?? 'esta marca'}.`
      : `Mostrando resultados para "${selectedSearch}" en todas las marcas.`
    : 'Busca por código, descripción, modelo o submodelo.';

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="section-padding relative overflow-hidden scroll-mt-20"
    >
      <div data-gsap="parallax-blob" className="absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-primary-300/35 blur-3xl" />
      <div data-gsap="parallax-blob" className="absolute -bottom-40 -right-40 h-[550px] w-[550px] rounded-full bg-accent-300/30 blur-3xl" />
      <div data-gsap="parallax-blob" className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-200/25 blur-3xl" />

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[75] flex justify-center px-4">
        <div
          role="status"
          aria-live="polite"
          aria-hidden={connectionWarningState === 'hidden'}
          className={`rounded-2xl border border-red-300/80 bg-red-600/90 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-red-900/25 ring-1 ring-red-100/40 backdrop-blur-xl transition-all duration-500 md:text-lg ${
            connectionWarningState === 'visible'
              ? 'translate-y-0 opacity-100'
              : connectionWarningState === 'fading'
                ? 'translate-y-2 opacity-0'
                : 'translate-y-4 opacity-0'
          }`}
        >
          {CONNECTION_WARNING_TEXT}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl container-padding">
        <div data-gsap="section-heading" className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-secondary-900 md:text-4xl">
            Catálogo de Cristales para Vans y Autobuses
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-secondary-600">
            Explora primero las marcas disponibles y luego consulta todos los cristales
            relacionados con la marca seleccionada en el mismo catálogo.
          </p>
        </div>

        <div data-gsap="reveal-card" className="mx-auto mb-10 w-full max-w-2xl">
          <label
            htmlFor="catalog-product-search"
            className="mb-2 block text-center text-sm font-medium text-secondary-700"
          >
            Buscar productos
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-secondary-500" />
            <input
              id="catalog-product-search"
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Buscar por código, descripción, modelo o submodelo"
              className="w-full rounded-full border border-white/50 bg-white/70 px-5 py-3 pl-11 pr-12 text-sm text-secondary-700 shadow-sm transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-secondary-500 transition-colors hover:bg-white hover:text-secondary-700"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="mt-2 text-center text-xs text-secondary-500">
            {searchHelperText}
          </p>
        </div>

        {!selectedBrandId ? (
          <>
            <div data-gsap="reveal-card" className="mb-8 text-center">
              <h3 className="text-2xl font-semibold text-secondary-900">
                {hasActiveSearch ? 'Buscar productos' : 'Explora por marca'}
              </h3>
              <p className="mt-2 text-secondary-600">
                {hasActiveSearch
                  ? `${totalCount} productos encontrados en todas las marcas.`
                  : 'Selecciona una marca para ver todos los productos relacionados.'}
              </p>
            </div>

            {!shouldShowProductResults && brandsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
              </div>
            ) : !shouldShowProductResults && brands.length === 0 ? (
              <div className="flex items-center justify-center py-20 text-secondary-600">
                No hay marcas disponibles.
              </div>
            ) : !shouldShowProductResults ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
                {brands.map((brand) => {
                  const logoSrc = getBrandLogo(brand.name);

                  return (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => openBrand(brand.id)}
                      data-gsap-catalog="brand-card"
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
            ) : showInitialProductSkeleton ? (
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
                    No encontramos productos para "{selectedSearch}".
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
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => setPreviewProduct(product)}
                          data-gsap-catalog="product-card"
                          className="overflow-hidden rounded-2xl border border-white/40 bg-white/50 text-left ring-1 ring-white/20 ring-inset backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-glass"
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
                                  src="/rhino-logo.png"
                                  alt="Sin imagen disponible"
                                  width={312}
                                  height={78}
                                  className="object-contain opacity-35 grayscale"
                                />
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            {product.primary_brand?.name && (
                              <p className="text-xs font-semibold tracking-[0.14em] text-primary-700 uppercase">
                                {product.primary_brand.name}
                              </p>
                            )}
                            <h4 className="mt-2 text-lg font-semibold text-secondary-900">
                              {product.product_codes?.description_data?.generated ?? 'Sin descripción generada'}
                            </h4>
                            <p className="mt-1 text-sm text-secondary-500">
                              {product.product_codes?.product_code_data?.generated ?? 'Sin código generado'}
                            </p>
                            {product.additional_brands.length > 0 && (
                              <p className="mt-3 text-sm text-secondary-500">
                                También relacionado con:{' '}
                                {product.additional_brands.map((brand) => brand.name).join(', ')}
                              </p>
                            )}
                          </div>
                        </button>
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
                  {totalCount} {hasActiveSearch ? 'productos encontrados' : 'productos relacionados con esta marca'}
                </p>
              </div>

              <div className="w-full sm:max-w-sm">
                <label
                  htmlFor="catalog-submodel-filter"
                  className="mb-2 block text-sm font-medium text-secondary-700"
                >
                  Filtrar por submodelo
                </label>
                <div className="relative">
                  <select
                    id="catalog-submodel-filter"
                    value={selectedSubModel}
                    onChange={(event) => updateSubModelFilter(event.target.value)}
                    disabled={subModelsLoading}
                    className="w-full appearance-none rounded-full border border-white/50 bg-white/70 px-4 py-3 pr-11 text-sm text-secondary-700 shadow-sm transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:cursor-wait disabled:opacity-70"
                  >
                    <option value="">Todos los submodelos</option>
                    {subModels.map((subModel) => (
                      <option key={subModel} value={subModel}>
                        {subModel}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-secondary-500" />
                </div>
                <p className="mt-2 text-xs text-secondary-500">
                  {subModelsLoading
                    ? 'Cargando submodelos...'
                    : `${subModels.length} submodelos disponibles`}
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
                    {hasActiveSearch
                      ? `No encontramos productos para "${selectedSearch}".`
                      : 'Esta marca no tiene productos visibles en este momento.'}
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
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => setPreviewProduct(product)}
                          data-gsap-catalog="product-card"
                          className="overflow-hidden rounded-2xl border border-white/40 bg-white/50 text-left ring-1 ring-white/20 ring-inset backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-glass"
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
                                  src="/rhino-logo.png"
                                  alt="Sin imagen disponible"
                                  width={312}
                                  height={78}
                                  className="object-contain opacity-35 grayscale"
                                />
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            {/* {!selectedBrandId && product.primary_brand?.name && (
                              <p className="text-xs font-semibold tracking-[0.14em] text-primary-700 uppercase">
                                {product.primary_brand.name}
                              </p>
                            )} */}
                            <h4 className="text-lg font-semibold text-secondary-900">
                            {product.product_codes?.description_data?.generated ?? 'Sin descripción generada'}
                            </h4>
                            <p className="mt-2 text-sm text-secondary-600">
                              {product.product_codes?.product_code_data?.generated ?? 'Sin código generado'}
                            </p>
                            <p className="mt-1 text-sm text-secondary-500">
                            </p>
                            {product.additional_brands.length > 0 && (
                              <p className="mt-3 text-sm text-secondary-500">
                                También relacionado con:{' '}
                                {product.additional_brands.map((brand) => brand.name).join(', ')}
                              </p>
                            )}
                          </div>
                        </button>
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

      {previewProduct && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPreviewProduct(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/40 bg-white/70 ring-1 ring-white/20 ring-inset backdrop-blur-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewProduct(null)}
              className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary-900/85 text-white shadow-sm transition-colors hover:bg-secondary-900"
              aria-label="Cerrar vista previa"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="border-b border-white/40 px-6 py-4 pr-16">
              <h4 className="line-clamp-2 text-xl leading-tight font-semibold text-secondary-900">
                {getProductPreviewTitle(previewProduct)}
              </h4>
              <p className="mt-1 truncate text-sm text-secondary-600">
                {previewProduct.product_codes?.product_code_data?.generated ?? 'Sin código generado'}
              </p>
            </div>

            <div className="p-2 sm:p-3">
              <div className="relative h-[72vh] min-h-[420px] overflow-hidden rounded-2xl bg-white/85">
                {getProductImage(previewProduct) ? (
                  <Image
                    src={getProductImage(previewProduct)!}
                    alt={getProductPreviewTitle(previewProduct)}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Image
                      src="/rhino-logo.png"
                      alt="Sin imagen disponible"
                      fill
                      className="object-contain p-8 opacity-35 grayscale"
                    />
                  </div>
                )}
              </div>

              {previewProduct.additional_brands.length > 0 && (
                <p className="mt-4 truncate text-sm text-secondary-600">
                  También relacionado con:{' '}
                  {previewProduct.additional_brands.map((brand) => brand.name).join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2, Star, Tags, X } from "lucide-react";

import { BackToTop, FloatingHeader, WhatsAppFloat } from "@/components";
import { getCatalogImageSrc } from "@/lib/catalog-image";
import { getProductDisplayName, getProductDisplayYear } from "@/lib/product-display";
import type {
  ProductGroup,
  ProductGroupProduct,
  ProductGroupProductsResponse,
  ProductWithSource,
} from "@/lib/types";

function formatYears(group: ProductGroup): string {
  if (!group.year_start && !group.year_end) return "Todos los años";
  if (group.year_start && group.year_end) return `${group.year_start}-${group.year_end}`;
  return String(group.year_start ?? group.year_end);
}

function getProductImage(product: ProductWithSource): string | null {
  return product.images?.[0] ?? null;
}

export default function CatalogGroupDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [group, setGroup] = useState<ProductGroup | null>(null);
  const [products, setProducts] = useState<ProductGroupProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewProduct, setPreviewProduct] = useState<ProductWithSource | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadGroup() {
      setLoading(true);

      try {
        const [groupResponse, productsResponse] = await Promise.all([
          fetch(`/api/product-groups/${encodeURIComponent(slug)}`),
          fetch(`/api/product-groups/${encodeURIComponent(slug)}/products`),
        ]);
        const groupJson = (await groupResponse.json()) as ProductGroup & { error?: string };
        const productsJson = (await productsResponse.json()) as ProductGroupProductsResponse & {
          error?: string;
        };

        if (!groupResponse.ok) throw new Error(groupJson.error ?? "Group not found");
        if (!productsResponse.ok) throw new Error(productsJson.error ?? "Products not found");
        if (cancelled) return;

        setGroup(groupJson);
        setProducts(Array.isArray(productsJson.data) ? productsJson.data : []);
      } catch {
        if (!cancelled) {
          setGroup(null);
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadGroup();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!previewProduct) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewProduct(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewProduct]);

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <FloatingHeader title="RHINO AUTOMOTIVE GLASS MEXICO" />

      <section className="section-padding relative scroll-mt-20 pt-28">
        <div className="absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-primary-300/35 blur-3xl" />
        <div className="absolute -right-40 -bottom-40 h-[550px] w-[550px] rounded-full bg-accent-300/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl container-padding">
          <Link
            href="/?tab=vehicle#catalogo"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-sm font-semibold text-secondary-700 shadow-sm ring-1 ring-white/20 ring-inset backdrop-blur-2xl transition-colors hover:bg-white hover:text-secondary-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a vehículos
          </Link>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : !group ? (
            <div className="flex items-center justify-center py-32">
              <div className="max-w-md text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/50 backdrop-blur-sm">
                  <Tags className="h-10 w-10 text-secondary-400" />
                </div>
                <h1 className="text-2xl font-semibold text-secondary-900">
                  Grupo no encontrado
                </h1>
                <p className="mt-2 text-secondary-600">
                  Este grupo no está publicado o ya no existe.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-sm font-semibold tracking-[0.14em] text-primary-700 uppercase">
                  {group.brand?.name ?? "Cualquier marca"}
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-normal text-secondary-900 md:text-5xl">
                  {group.name}
                </h1>
                <p className="mt-3 text-base text-secondary-600">
                  {[group.sub_model, formatYears(group)].filter(Boolean).join(" / ")}
                </p>
                {group.description && (
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-secondary-600">
                    {group.description}
                  </p>
                )}
              </div>

              {group.images.length > 0 && (
                <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {group.images.map((imageUrl, index) => (
                    <div
                      key={imageUrl}
                      className={`relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 ring-1 ring-white/20 ring-inset backdrop-blur-2xl ${
                        index === 0 ? "aspect-[16/9] md:col-span-2 md:row-span-2" : "aspect-[16/9]"
                      }`}
                    >
                      <Image
                        src={getCatalogImageSrc(imageUrl)}
                        alt={`${group.name} imagen ${index + 1}`}
                        fill
                        className="object-contain p-4"
                        sizes={index === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
              )}

              {products.length === 0 ? (
                <div className="flex items-center justify-center py-24 text-secondary-600">
                  No hay productos visibles en este grupo.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((item) => {
                    const product = item.product;
                    const imageUrl = getProductImage(product);
                    const displayName = getProductDisplayName(product);
                    const displayYear = getProductDisplayYear(product);

                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => setPreviewProduct(product)}
                        className="overflow-hidden rounded-2xl border border-white/40 bg-white/50 text-left ring-1 ring-white/20 ring-inset backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-glass"
                      >
                        <div className="relative aspect-[10/5] overflow-hidden bg-white/30">
                          {imageUrl ? (
                            <Image
                              src={getCatalogImageSrc(imageUrl)}
                              alt={displayName}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <Image
                              src="/rhino-logo.png"
                              alt="Sin imagen disponible"
                              fill
                              className="object-contain p-8 opacity-35 grayscale"
                            />
                          )}
                        </div>
                        <div className="p-5">
                          {item.is_featured && (
                            <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
                              <Star className="h-3 w-3" />
                              Destacado
                            </span>
                          )}
                          <h2 className="text-lg font-semibold text-secondary-900">
                            {displayName}
                          </h2>
                          {displayYear && (
                            <p className="mt-1 text-sm font-medium text-secondary-600">
                              {displayYear}
                            </p>
                          )}
                          <p className="mt-2 text-sm text-secondary-600">
                            {product.product_codes?.product_code_data?.generated ?? "Sin código generado"}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

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
                {getProductDisplayName(previewProduct)}
              </h4>
              {getProductDisplayYear(previewProduct) && (
                <p className="mt-1 text-sm font-medium text-secondary-600">
                  {getProductDisplayYear(previewProduct)}
                </p>
              )}
              <p className="mt-1 truncate text-sm text-secondary-600">
                {previewProduct.product_codes?.product_code_data?.generated ?? "Sin código generado"}
              </p>
            </div>

            <div className="p-2 sm:p-3">
              <div className="relative h-[72vh] min-h-[420px] overflow-hidden rounded-2xl bg-white/85">
                {getProductImage(previewProduct) ? (
                  <Image
                    src={getCatalogImageSrc(getProductImage(previewProduct))}
                    alt={getProductDisplayName(previewProduct)}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src="/rhino-logo.png"
                    alt="Sin imagen disponible"
                    fill
                    className="object-contain p-8 opacity-35 grayscale"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <WhatsAppFloat />
      <BackToTop />
    </main>
  );
}

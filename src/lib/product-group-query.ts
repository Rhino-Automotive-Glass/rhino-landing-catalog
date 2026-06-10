import type { Brand, ProductGroup, ProductGroupProduct } from "@/lib/types";
import { mapProductRow, PRODUCT_WITH_SOURCE_SELECT } from "@/lib/product-query";

type RawBrand = {
  id: string;
  name: string;
};

type RawProductGroupRow = Omit<ProductGroup, "brand"> & {
  brand: RawBrand | RawBrand[] | null;
};

type RawProductForMap = Parameters<typeof mapProductRow>[0];

type RawProductGroupProductRow = Omit<ProductGroupProduct, "product"> & {
  product: RawProductForMap | RawProductForMap[] | null;
};

export const PRODUCT_GROUP_SELECT = `
  id,
  slug,
  name,
  description,
  images,
  brand_id,
  model,
  sub_model,
  year_start,
  year_end,
  status,
  sort_order,
  created_at,
  updated_at,
  brand:brands!product_groups_brand_id_fkey (
    id,
    name
  )
`;

export const PRODUCT_GROUP_PRODUCT_SELECT = `
  group_id,
  product_id,
  sort_order,
  is_featured,
  created_at,
  product:products!product_group_products_product_id_fkey (
    ${PRODUCT_WITH_SOURCE_SELECT}
  )
`;

function unwrapRelation<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
}

export function mapProductGroupRow(row: RawProductGroupRow): ProductGroup {
  const brand = unwrapRelation(row.brand);

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    images: Array.isArray(row.images) ? row.images.slice(0, 3) : [],
    brand_id: row.brand_id,
    brand: brand ? ({ id: brand.id, name: brand.name } satisfies Brand) : null,
    model: row.model,
    sub_model: row.sub_model,
    year_start: row.year_start,
    year_end: row.year_end,
    status: row.status,
    sort_order: row.sort_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export function mapProductGroupProductRow(
  row: RawProductGroupProductRow
): ProductGroupProduct | null {
  const product = unwrapRelation(row.product);

  if (!product) return null;

  return {
    group_id: row.group_id,
    product_id: row.product_id,
    sort_order: row.sort_order,
    is_featured: row.is_featured,
    created_at: row.created_at,
    product: mapProductRow(product),
  };
}

export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

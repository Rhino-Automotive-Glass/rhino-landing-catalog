import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import type { BrandListResponse } from "@/lib/types";
import { mapProductRow, PRODUCT_WITH_SOURCE_INNER_SELECT } from "@/lib/product-query";

type RawBrand = {
  id: string;
  name: string;
};

function unwrapRelation<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
}

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const rl = rateLimit(`brands:${ip}`, { limit: 30, windowMs: 60_000 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rl.resetAt),
        },
      }
    );
  }

  const scope = req.nextUrl.searchParams.get("scope") ?? "all";
  const status = req.nextUrl.searchParams.get("status") ?? "all";

  if (scope === "catalog") {
    const brandCounts = new Map<string, RawBrand & { productCount: number }>();
    let from = 0;
    const batchSize = 1000;

    while (true) {
      const { data, error } = await supabase
        .from("products")
        .select(PRODUCT_WITH_SOURCE_INNER_SELECT)
        .order("created_at", { ascending: false })
        .range(from, from + batchSize - 1);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      for (const row of data ?? []) {
        const product = mapProductRow(row);

        if (product.is_hidden) continue;

        const relatedBrands = [
          ...(product.primary_brand ? [product.primary_brand] : []),
          ...product.additional_brands,
        ];

        for (const brand of relatedBrands) {
          const current = brandCounts.get(brand.id);
          if (current) {
            current.productCount += 1;
          } else {
            brandCounts.set(brand.id, {
              id: brand.id,
              name: brand.name,
              productCount: 1,
            });
          }
        }
      }

      if (!data || data.length < batchSize) break;
      from += batchSize;
    }

    const response = NextResponse.json<BrandListResponse>({
      brands: [...brandCounts.values()].sort((a, b) => a.name.localeCompare(b.name)),
    });
    response.headers.set("X-RateLimit-Remaining", String(rl.remaining));
    response.headers.set("X-RateLimit-Reset", String(rl.resetAt));
    return response;
  }

  if (scope === "primary") {
    const allBrands = new Map<string, RawBrand>();
    let from = 0;
    const batchSize = 1000;

    while (true) {
      let query = supabase
        .from("products")
        .select(`
          primary_brand:brands!products_primary_brand_id_fkey (
            id,
            name
          )
        `)
        .not("primary_brand_id", "is", null)
        .order("created_at", { ascending: false })
        .range(from, from + batchSize - 1);

      if (status !== "all") {
        query = query.eq("status", status);
      }

      const { data, error } = await query;

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      for (const row of data ?? []) {
        const primaryBrand = unwrapRelation(row.primary_brand as RawBrand | RawBrand[] | null);
        if (primaryBrand) {
          allBrands.set(primaryBrand.id, primaryBrand);
        }
      }

      if (!data || data.length < batchSize) break;
      from += batchSize;
    }

    const response = NextResponse.json<BrandListResponse>({
      brands: [...allBrands.values()].sort((a, b) => a.name.localeCompare(b.name)),
    });
    response.headers.set("X-RateLimit-Remaining", String(rl.remaining));
    response.headers.set("X-RateLimit-Reset", String(rl.resetAt));
    return response;
  }

  const { data, error } = await supabase
    .from("brands")
    .select("id, name")
    .order("name");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const response = NextResponse.json<BrandListResponse>({
    brands: (data ?? []) as RawBrand[],
  });
  response.headers.set("X-RateLimit-Remaining", String(rl.remaining));
  response.headers.set("X-RateLimit-Reset", String(rl.resetAt));
  return response;
}

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import {
  PRODUCT_WITH_SOURCE_BRAND_FILTER_SELECT,
  PRODUCT_WITH_SOURCE_SELECT,
  mapProductRow,
} from "@/lib/product-query";

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const rl = rateLimit(`products:${ip}`, { limit: 30, windowMs: 60_000 });
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

  const { searchParams } = req.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? 20)));
  const primaryBrandId = searchParams.get("primaryBrandId") ?? "";
  const brandId = searchParams.get("brandId") ?? "";
  const status = searchParams.get("status") ?? "";
  const search = searchParams.get("search") ?? "";
  const q = searchParams.get("q") ?? "";

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("products")
    .select(
      brandId && brandId !== "all"
        ? PRODUCT_WITH_SOURCE_BRAND_FILTER_SELECT
        : PRODUCT_WITH_SOURCE_SELECT,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (primaryBrandId && primaryBrandId !== "all") {
    query = query.eq("primary_brand_id", primaryBrandId);
  }

  if (brandId && brandId !== "all") {
    query = query.eq("product_brands.brand_id", brandId);
  }

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  if (search) {
    query = query.or(`model.ilike.%${search}%,subModel.ilike.%${search}%`);
  }

  if (q) {
    query = query.or(
      `model.ilike.%${q}%,subModel.ilike.%${q}%`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const response = NextResponse.json({
    data: (data ?? []).map((row) => mapProductRow(row)),
    count: count ?? 0,
    page,
    pageSize,
  });
  response.headers.set("X-RateLimit-Remaining", String(rl.remaining));
  response.headers.set("X-RateLimit-Reset", String(rl.resetAt));
  return response;
}

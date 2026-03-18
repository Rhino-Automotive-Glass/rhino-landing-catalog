import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import {
  getProductSubModels,
  PRODUCT_WITH_SOURCE_BRAND_FILTER_SELECT,
  mapProductRow,
} from "@/lib/product-query";
import type { SubModelListResponse } from "@/lib/types";

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const rl = rateLimit(`product-submodels:${ip}`, { limit: 30, windowMs: 60_000 });
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

  const brandId = req.nextUrl.searchParams.get("brandId") ?? "";

  if (!brandId || brandId === "all") {
    const response = NextResponse.json<SubModelListResponse>({ subModels: [] });
    response.headers.set("X-RateLimit-Remaining", String(rl.remaining));
    response.headers.set("X-RateLimit-Reset", String(rl.resetAt));
    return response;
  }

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_WITH_SOURCE_BRAND_FILTER_SELECT)
    .eq("product_brands.brand_id", brandId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const subModels = Array.from(
    new Set(
      (data ?? [])
        .flatMap((row) => getProductSubModels(mapProductRow(row)))
        .sort((a, b) => a.localeCompare(b))
    )
  );

  const response = NextResponse.json<SubModelListResponse>({ subModels });
  response.headers.set("X-RateLimit-Remaining", String(rl.remaining));
  response.headers.set("X-RateLimit-Reset", String(rl.resetAt));
  return response;
}

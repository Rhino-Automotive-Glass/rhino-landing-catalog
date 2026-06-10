import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import {
  PRODUCT_GROUP_PRODUCT_SELECT,
  PRODUCT_GROUP_SELECT,
  isUuid,
  mapProductGroupProductRow,
  mapProductGroupRow,
} from "@/lib/product-group-query";
import type { ProductGroupProductsResponse } from "@/lib/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: RouteContext) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const rl = rateLimit(`product-group-products:${ip}`, { limit: 30, windowMs: 60_000 });

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

  const { id } = await ctx.params;
  const baseQuery = supabase
    .from("product_groups")
    .select(PRODUCT_GROUP_SELECT)
    .eq("status", "published");
  const groupQuery = isUuid(id) ? baseQuery.eq("id", id) : baseQuery.eq("slug", id);
  const { data: groupData, error: groupError } = await groupQuery.single();

  if (groupError) {
    const status = groupError.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: groupError.message }, { status });
  }

  const group = mapProductGroupRow(groupData);
  const { data, error } = await supabase
    .from("product_group_products")
    .select(PRODUCT_GROUP_PRODUCT_SELECT)
    .eq("group_id", group.id)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const items = (data ?? [])
    .map((row) => mapProductGroupProductRow(row))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .filter((item) => !item.product.is_hidden);

  const response = NextResponse.json<ProductGroupProductsResponse>({
    data: items,
    count: items.length,
  });
  response.headers.set("X-RateLimit-Remaining", String(rl.remaining));
  response.headers.set("X-RateLimit-Reset", String(rl.resetAt));
  return response;
}

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import {
  PRODUCT_GROUP_SELECT,
  isUuid,
  mapProductGroupRow,
} from "@/lib/product-group-query";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: RouteContext) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const rl = rateLimit(`product-group:${ip}`, { limit: 30, windowMs: 60_000 });

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
  const query = isUuid(id) ? baseQuery.eq("id", id) : baseQuery.eq("slug", id);
  const { data, error } = await query.single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }

  const response = NextResponse.json(mapProductGroupRow(data));
  response.headers.set("X-RateLimit-Remaining", String(rl.remaining));
  response.headers.set("X-RateLimit-Reset", String(rl.resetAt));
  return response;
}

export type ProductImages = string[];

export type ProductStatus = "draft" | "published" | "archived";
export type ProductVisibilityStatus = ProductStatus | "hidden";

export type Brand = {
  id: string;
  name: string;
  productCount?: number;
};

export type ProductCode = {
  id: string;
  product_code_data: {
    generated?: string;
    clasificacion?: string;
    parte?: string;
    numero?: string;
    color?: string;
    aditamento?: string;
    [key: string]: unknown;
  };
  description_data: {
    generated?: string;
    parte?: string;
    posicion?: string;
    lado?: string;
    [key: string]: unknown;
  };
  compatibility_data: {
    generated?: string;
    items?: Array<{
      marca?: string;
      modelo?: string;
      subModelo?: string;
      version?: string;
      additional?: string;
    }>;
  };
  status: string | null;
  verified: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  product_code_id: string;
  price: number;
  stock: number;
  primary_brand_id: string | null;
  primary_brand: Brand | null;
  additional_brands: Brand[];
  model: string | null;
  subModel: string | null;
  images: ProductImages;
  status: ProductStatus;
  effective_status: ProductVisibilityStatus;
  is_hidden: boolean;
  hidden_reason: string | null;
  created_at: string;
  updated_at: string;
};

export type ProductWithSource = Product & {
  product_codes: ProductCode;
};

export type PaginatedResponse<T> = {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
};

export type BrandListResponse = {
  brands: Brand[];
};

export type SubModelListResponse = {
  subModels: string[];
};

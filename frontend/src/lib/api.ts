import type { ApiSuccess, Cart, Product, ProductsResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
console.log("API_URL",API_URL);

export class ApiClientError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
  }
}

type RequestOptions = RequestInit & {
  signal?: AbortSignal;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    throw new ApiClientError("Unable to reach the server. Is the API running?", 0);
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.success === false) {
    throw new ApiClientError(
      payload.message || "Something went wrong",
      response.status
    );
  }

  return (payload as ApiSuccess<T>).data;
}

export type ProductQuery = {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  signal?: AbortSignal;
};

export const api = {
  getProducts: ({
    search,
    category,
    sort,
    page,
    limit,
    signal,
  }: ProductQuery = {}) => {
    const query = new URLSearchParams();
    if (search?.trim()) query.set("search", search.trim());
    if (category && category !== "all") query.set("category", category);
    if (sort) query.set("sort", sort);
    if (page) query.set("page", String(page));
    if (limit) query.set("limit", String(limit));
    const qs = query.toString();
    return request<ProductsResponse>(`/api/products${qs ? `?${qs}` : ""}`, {
      signal,
    });
  },

  getProduct: (id: string, signal?: AbortSignal) =>
    request<Product>(`/api/products/${id}`, { signal }),

  getCart: (cartId: string, signal?: AbortSignal) =>
    request<Cart>(`/api/cart/${cartId}`, { signal }),

  addToCart: (body: {
    cartId?: string | null;
    productId: string;
    quantity?: number;
  }) =>
    request<Cart>("/api/cart", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateCartItem: (
    cartId: string,
    body: { itemId: string; quantity: number }
  ) =>
    request<Cart>(`/api/cart/${cartId}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
};

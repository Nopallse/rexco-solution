"use client";

import { getStoredAuth } from "./auth-client";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

type FetchOptions = Omit<RequestInit, "headers"> & { headers?: HeadersInit };

type ProductImage = { url: string };
type ProductStore = { name: string; productStore?: { name: string; urlStore: string }[] };
type ProductDocument = { type: 'MSDS' | 'TDS'; file?: string };
type ProductFeature = { text: string; order: number; icon?: string | null };
export type ProductDto = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  urlYoutube?: string | null;
  color?: string | null;
  primaryImage?: string | null;
  productImage?: ProductImage[];
  productStore?: ProductStore[];
  productDocument?: ProductDocument[];
  productFeature?: ProductFeature[];
};

async function parseJsonSafe(response: Response) {
  try {
    return await response.json();
  } catch (error) {
    console.warn("Failed to parse JSON response", error);
    return null;
  }
}

function unwrapData<T>(data: any): T {
  if (data && typeof data === "object" && "data" in data) return (data as any).data as T;
  return data as T;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await parseJsonSafe(response);
  if (!response.ok) {
    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        const { clearStoredAuth } = await import('./auth-client');
        clearStoredAuth();
        window.location.href = '/log8i8n738';
      }
      throw new Error('Session expired. Please login again.');
    }
    const message = (data as any)?.message || response.statusText || "Request failed";
    throw new Error(Array.isArray(message) ? message.join(", ") : String(message));
  }
  return unwrapData<T>(data);
}

function authFetch(input: string, init?: FetchOptions) {
  const session = getStoredAuth();
  const headers = new Headers(init?.headers);
  if (session?.token) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }
  return fetch(input, { ...init, headers });
}

export async function listProducts(): Promise<ProductDto[]> {
  const response = await fetch(`${API_BASE}/product`, { cache: "no-store" });
  return handleResponse<ProductDto[]>(response);
}

export async function listBestSellerProducts(): Promise<ProductDto[]> {
  const response = await fetch(`${API_BASE}/product/best-seller`, { cache: "no-store" });
  return handleResponse<ProductDto[]>(response);
}

export async function getProduct(id: string): Promise<ProductDto> {
  const response = await fetch(`${API_BASE}/product/${id}`, { cache: "no-store" });
  return handleResponse<ProductDto>(response);
}

export async function getProductBySlug(slug: string): Promise<ProductDto> {
  const response = await fetch(`${API_BASE}/product/slug/${encodeURIComponent(slug)}`, { cache: "no-store" });
  return handleResponse<ProductDto>(response);
}

export type ProductForm = {
  name: string;
  description?: string;
  urlYoutube?: string;
  color?: string;
  productFeature?: { text: string; order: number }[];
  productStore?: { name: string; stores?: { name: string; urlStore: string }[] }[];
  productDocument?: { type: 'MSDS' | 'TDS' }[];
};

export type ProductFiles = {
  primaryImage?: File | null;
  images?: File[];
  documents?: File[];
  icons?: File[];
};

function buildFormData(payload: ProductForm, files?: ProductFiles) {
  const formData = new FormData();
  if (payload.name) formData.append("name", payload.name);
  if (payload.description) formData.append("description", payload.description);
  if (payload.urlYoutube) formData.append("urlYoutube", payload.urlYoutube);
  if (payload.color) formData.append("color", payload.color);

  if (payload.productFeature?.length) {
    formData.append("productFeature", JSON.stringify(payload.productFeature));
  }

  if (payload.productStore?.length) {
    formData.append("productStore", JSON.stringify(payload.productStore));
  }

  if (payload.productDocument?.length) {
    formData.append("productDocument", JSON.stringify(payload.productDocument));
  }

  if (files?.primaryImage) {
    formData.append("primaryImage", files.primaryImage);
  }

  if (files?.images?.length) {
    files.images.forEach((file) => formData.append("images", file));
  }

  if (files?.documents?.length) {
    files.documents.forEach((file) => formData.append("documents", file));
  }

  if (files?.icons?.length) {
    files.icons.forEach((file) => formData.append("icon", file));
  }

  return formData;
}

export async function createProduct(payload: ProductForm, files?: ProductFiles) {
  const body = buildFormData(payload, files);
  const response = await authFetch(`${API_BASE}/product`, {
    method: "POST",
    body,
  });
  return handleResponse<ProductDto>(response);
}

export async function updateProduct(id: string, payload: Partial<ProductForm>, files?: ProductFiles) {
  const body = buildFormData(payload as ProductForm, files);
  const response = await authFetch(`${API_BASE}/product/${id}`, {
    method: "PATCH",
    body,
  });
  return handleResponse<ProductDto>(response);
}

export async function deleteProduct(id: string) {
  const response = await authFetch(`${API_BASE}/product/${id}`, {
    method: "DELETE",
  });
  return handleResponse<{ success: boolean }>(response);
}

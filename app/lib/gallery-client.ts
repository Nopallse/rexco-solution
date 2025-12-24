"use client";

import { getStoredAuth } from "./auth-client";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

type FetchOptions = Omit<RequestInit, "headers"> & { headers?: HeadersInit };

export type GalleryDto = {
  id: string;
  title?: string | null;
  image: string;
  link?: string | null;
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
        window.location.href = '/login';
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

export async function listGallery(): Promise<GalleryDto[]> {
  const response = await fetch(`${API_BASE}/gallery`, { cache: "no-store" });
  return handleResponse<GalleryDto[]>(response);
}

export type GalleryForm = {
  title?: string;
  link?: string;
};

export type GalleryFiles = {
  image?: File | null;
};

function buildFormData(payload: GalleryForm, files?: GalleryFiles) {
  const formData = new FormData();
  if (payload.title) formData.append("title", payload.title);
  if (payload.link) formData.append("link", payload.link);

  if (files?.image) {
    formData.append("file", files.image);
  }

  return formData;
}

export async function createGallery(payload: GalleryForm, files?: GalleryFiles) {
  const body = buildFormData(payload, files);
  const response = await authFetch(`${API_BASE}/gallery`, {
    method: "POST",
    body,
  });
  return handleResponse<GalleryDto>(response);
}

export async function updateGallery(id: string, payload: GalleryForm, files?: GalleryFiles) {
  const body = buildFormData(payload, files);
  const response = await authFetch(`${API_BASE}/gallery/${id}`, {
    method: "PATCH",
    body,
  });
  return handleResponse<GalleryDto>(response);
}

export async function deleteGallery(id: string) {
  const response = await authFetch(`${API_BASE}/gallery/${id}`, {
    method: "DELETE",
  });
  return handleResponse<{ success: boolean }>(response);
}

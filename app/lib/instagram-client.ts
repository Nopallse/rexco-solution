"use client";

import { getStoredAuth } from "./auth-client";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

type FetchOptions = Omit<RequestInit, "headers"> & { headers?: HeadersInit };

export type InstagramDto = {
  id: string;
  title?: string | null;
  link?: string | null;
  image?: string | null;
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

export async function listInstagram(): Promise<InstagramDto[]> {
  const response = await fetch(`${API_BASE}/instagram`, { cache: "no-store" });
  return handleResponse<InstagramDto[]>(response);
}

export type InstagramForm = {
  title?: string;
  link?: string;
  file?: File;
};

export async function createInstagram(payload: InstagramForm) {
  const formData = new FormData();
  if (payload.title) formData.append('title', payload.title);
  if (payload.link) formData.append('link', payload.link);
  if (payload.file) formData.append('file', payload.file);
  
  const response = await authFetch(`${API_BASE}/instagram`, {
    method: "POST",
    body: formData,
  });
  return handleResponse<InstagramDto>(response);
}

export async function updateInstagram(id: string, payload: InstagramForm) {
  const formData = new FormData();
  if (payload.title) formData.append('title', payload.title);
  if (payload.link) formData.append('link', payload.link);
  if (payload.file) formData.append('file', payload.file);
  
  const response = await authFetch(`${API_BASE}/instagram/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return handleResponse<InstagramDto>(response);
}

export async function deleteInstagram(id: string) {
  const response = await authFetch(`${API_BASE}/instagram/${id}`, {
    method: "DELETE",
  });
  return handleResponse<{ success: boolean }>(response);
}

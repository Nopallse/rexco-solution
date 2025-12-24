"use client";

import { getStoredAuth } from "./auth-client";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

type FetchOptions = Omit<RequestInit, "headers"> & { headers?: HeadersInit };

export type DocumentDto = {
  id: string;
  title: string;
  image?: string | null;
  file?: string | null;
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

export async function listDocuments(): Promise<DocumentDto[]> {
  const response = await fetch(`${API_BASE}/document/brosur`, { cache: "no-store" });
  return handleResponse<DocumentDto[]>(response);
}

export type DocumentForm = {
  title: string;
};

export type DocumentFiles = {
  image?: File | null;
  document?: File | null;
};

function buildFormData(payload: DocumentForm, files?: DocumentFiles) {
  const formData = new FormData();
  formData.append("title", payload.title);

  if (files?.image) {
    formData.append("images", files.image);
  }

  if (files?.document) {
    formData.append("documents", files.document);
  }

  return formData;
}

export async function createDocument(payload: DocumentForm, files?: DocumentFiles) {
  const body = buildFormData(payload, files);
  const response = await authFetch(`${API_BASE}/document/brosur`, {
    method: "POST",
    body,
  });
  return handleResponse<DocumentDto>(response);
}

export async function updateDocument(id: string, payload: DocumentForm, files?: DocumentFiles) {
  const body = buildFormData(payload, files);
  const response = await authFetch(`${API_BASE}/document/brosur/${id}`, {
    method: "PATCH",
    body,
  });
  return handleResponse<DocumentDto>(response);
}

export async function deleteDocument(id: string) {
  const response = await authFetch(`${API_BASE}/document/brosur/${id}`, {
    method: "DELETE",
  });
  return handleResponse<{ success: boolean }>(response);
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      error.error || error.message || `API Error: ${response.statusText}`
    );
  }

  return response.json();
}

export const api = {
  get: <T>(url: string) => apiRequest<T>(url),
  post: <T>(url: string, data: unknown) =>
    apiRequest<T>(url, { method: "POST", body: JSON.stringify(data) }),
  put: <T>(url: string, data: unknown) =>
    apiRequest<T>(url, { method: "PUT", body: JSON.stringify(data) }),
  patch: <T>(url: string, data: unknown) =>
    apiRequest<T>(url, { method: "PATCH", body: JSON.stringify(data) }),
  delete: <T>(url: string, data?: unknown) =>
    apiRequest<T>(url, { method: "DELETE", body: data ? JSON.stringify(data) : undefined }),
};

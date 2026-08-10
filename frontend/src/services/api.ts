const BASE_URL = import.meta.env.VITE_API_URL;

export async function api<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<T>;
}

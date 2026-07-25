const BASE_URL = import.meta.env.VITE_API_URL;

export async function api<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json();
}

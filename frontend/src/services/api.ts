const API_URL = import.meta.env.VITE_API_URL;

type ApiOptions = RequestInit & {
  skipAuth?: boolean;
};

export async function api<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { skipAuth = false, headers, ...requestOptions } = options;

  const authData = localStorage.getItem("keiju-auth");

  let token: string | null = null;

  if (authData) {
    try {
      const parsed = JSON.parse(authData);

      token = parsed?.state?.token ?? null;
    } catch {
      token = null;
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...requestOptions,

    headers: {
      "Content-Type": "application/json",

      ...(token && !skipAuth
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.error ?? `Request failed with status ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

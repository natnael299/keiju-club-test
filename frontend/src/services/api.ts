const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

type ApiOptions = RequestInit & {
  skipAuth?: boolean;
};

export async function api<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error("VITE_API_URL is missing from the environment variables.");
  }

  const { skipAuth = false, headers, ...requestOptions } = options;

  const token = getStoredToken();

  const requestHeaders = new Headers(headers);

  if (
    requestOptions.body &&
    !(requestOptions.body instanceof FormData) &&
    !requestHeaders.has("Content-Type")
  ) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token && !skipAuth) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...requestOptions,
    headers: requestHeaders,
  });

  if (response.status === 401 && !skipAuth) {
    clearExpiredSession();

    throw new Error("Your session has expired. Please sign in again.");
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.error ??
        errorBody?.message ??
        `Request failed with status ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function getStoredToken(): string | null {
  const authData = localStorage.getItem("keiju-auth");

  if (!authData) {
    return null;
  }

  try {
    const parsedAuthData = JSON.parse(authData) as {
      state?: {
        token?: unknown;
      };
    };

    return typeof parsedAuthData.state?.token === "string"
      ? parsedAuthData.state.token
      : null;
  } catch {
    return null;
  }
}

function clearExpiredSession(): void {
  localStorage.removeItem("keiju-auth");
  localStorage.removeItem("keiju-owner");

  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
}

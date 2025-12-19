import { BACKEND_URL, ENDPOINTS, LOCALSTORAGE_KEYS } from "./constants";

export const signIn = async (email: string, password: string) => {
  const response = await fetch(`${BACKEND_URL}${ENDPOINTS.AUTH.SIGNIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Sign in failed');
  }

  if (json.data?.session?.access_token) {
    localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, json.data.session.access_token);
  }

  return json.data;
};

export const signOut = async () => {
  const response = await fetch(`${BACKEND_URL}${ENDPOINTS.AUTH.SIGNOUT}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Sign out failed');
  }

  localStorage.removeItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);

  return json;
};
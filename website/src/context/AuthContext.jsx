import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY = 'da_token';

async function apiFetch(path, opts = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  const res = await fetch(path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { setLoading(false); return; }
    apiFetch('/api/auth/me')
      .then(d => setUser(d.user))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const signup = useCallback(async ({ email, password, name }) => {
    const d = await apiFetch('/api/auth/signup', { method: 'POST', body: { email, password, name } });
    localStorage.setItem(TOKEN_KEY, d.token);
    setUser(d.user);
    return d.user;
  }, []);

  const signin = useCallback(async ({ email, password }) => {
    const d = await apiFetch('/api/auth/signin', { method: 'POST', body: { email, password } });
    localStorage.setItem(TOKEN_KEY, d.token);
    setUser(d.user);
    return d.user;
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const api = useCallback((path, opts) => apiFetch(path, opts), []);

  return (
    <AuthContext.Provider value={{ user, loading, signup, signin, signout, api }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

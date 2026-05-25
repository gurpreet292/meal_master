const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TOKEN_KEY = 'mm_jwt_token_v1';
const PROFILE_KEY = 'mm_user_profile_v1';

const readJson = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const parseJwt = (token) => {
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(normalized);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;
  const payload = parseJwt(token);
  if (!payload) return null;
  const profile = readJson(PROFILE_KEY);
  const name = profile?.name || payload.name || payload.email?.split('@')[0] || 'User';
  return { id: payload.id, email: payload.email, role: payload.role, name };
};

const updateLocalProfile = (patch = {}) => {
  const current = readJson(PROFILE_KEY) || {};
  const updated = { ...current, ...patch };
  writeJson(PROFILE_KEY, updated);
  return updated;
};

const request = async (path, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || 'Request failed';
    const err = new Error(message);
    err.details = data?.data || null;
    err.status = res.status;
    throw err;
  }
  return data;
};

const api = {
  getCurrentUser,
  updateLocalProfile,
  getProfile: async () => request('/api/users/me'),
  updateProfile: async (patch) => {
    const data = await request('/api/users/me', {
      method: 'PATCH',
      body: JSON.stringify(patch)
    });
    updateLocalProfile({ name: data.name, preferences: data.preferences });
    return data;
  },
  getPlan: async () => request('/api/users/me/plan'),
  savePlan: async (plan) => request('/api/users/me/plan', {
    method: 'PUT',
    body: JSON.stringify({ plan })
  }),
  getLogs: async () => request('/api/users/me/logs'),
  logFood: async (entry) => request('/api/users/me/logs', {
    method: 'POST',
    body: JSON.stringify(entry)
  }),
  login: async ({ email, password }) => {
    const data = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    setToken(data.token);
    updateLocalProfile({ email });
    return getCurrentUser();
  },
  register: async ({ name, email, password, preferences = {} }) => {
    const data = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, preferences })
    });
    setToken(data.token);
    updateLocalProfile({ name, email });
    return getCurrentUser();
  },
  logout: () => {
    clearToken();
  },
  getMeals: async () => request('/api/meals'),
  createMeal: async (payload) => request('/api/meals', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
};

export default api;

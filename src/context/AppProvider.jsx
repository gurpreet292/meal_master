import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import mockApi from '@/lib/mockApi';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const normalizeRecipe = (item) => ({
    ...item,
    name: item.name || item.title || 'Untitled Meal'
  });
  const [user, setUser] = useState(() => api.getCurrentUser());
  const [recipes, setRecipes] = useState([]);
  const [plan, setPlan] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let active = true;
    api.getMeals()
      .then((data) => {
        if (active) {
          const list = Array.isArray(data) ? data.map(normalizeRecipe) : [];
          setRecipes(list);
        }
      })
      .catch(() => {
        if (active) setRecipes(mockApi.getRecipes());
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const userId = user?.id;
    let active = true;
    const loadUserData = async () => {
      if (!userId) {
        setPlan(null);
        setLogs([]);
        return;
      }
      try {
        const [planRes, logsRes, profileRes] = await Promise.all([
          api.getPlan(),
          api.getLogs(),
          api.getProfile()
        ]);
        if (!active) return;
        setPlan(planRes?.plan ?? null);
        setLogs(logsRes?.logs ?? []);
        if (profileRes) {
          setUser((prev) => {
            if (!prev) return prev;
            const next = {
              ...prev,
              name: profileRes.name ?? prev.name,
              preferences: profileRes.preferences ?? prev.preferences
            };
            if (next.name === prev.name && JSON.stringify(next.preferences) === JSON.stringify(prev.preferences)) {
              return prev;
            }
            return next;
          });
        }
      } catch {
        if (!active) return;
        setPlan(userId ? mockApi.getPlan(userId) : null);
        setLogs(userId ? mockApi.getLogs(userId) : []);
      }
    };
    loadUserData();
    return () => {
      active = false;
    };
  }, [user?.id]);

  const register = async (payload) => {
    const u = await api.register(payload);
    setUser(u);
    return u;
  };

  const login = async (payload) => {
    const u = await api.login(payload);
    setUser(u);
    return u;
  };

  const logout = () => {
    api.logout();
    setUser(null);
    setPlan(null);
    setLogs([]);
  };

  const createRecipe = async (data) => {
    try {
      const payload = {
        title: data.name || data.title || 'Untitled Meal',
        description: data.description || '',
        price: Number.isFinite(data.price) ? data.price : 0,
        image: data.image
      };
  const created = await api.createMeal(payload);
  const normalized = normalizeRecipe(created);
  setRecipes((prev) => [normalized, ...prev]);
  return normalized;
    } catch {
      const r = mockApi.addRecipe(data);
      setRecipes((prev) => [r, ...prev]);
      return r;
    }
  };

  const savePlan = async (p) => {
    if (!user) throw new Error('Not authenticated');
    const saved = await api.savePlan(p);
    setPlan(saved.plan ?? p);
  };

  const generateGroceryList = (p) => mockApi.generateGroceryList(p);

  const logFood = async (entry) => {
    if (!user) throw new Error('Not authenticated');
    const res = await api.logFood(entry);
    const updated = res.logs ?? [];
    setLogs(updated);
    return updated;
  };

  const updateProfile = async (patch) => {
    if (!user) throw new Error('Not authenticated');
    const updated = await api.updateProfile(patch);
    setUser((prev) => prev ? { ...prev, ...updated } : updated);
    return updated;
  };

  return (
    <AppContext.Provider value={{ user, recipes, plan, logs, register, login, logout, createRecipe, savePlan, generateGroceryList, logFood, updateProfile }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export default AppProvider;

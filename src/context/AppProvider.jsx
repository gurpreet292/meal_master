import React, { createContext, useContext, useEffect, useState } from 'react';
import mockApi from '@/lib/mockApi';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => mockApi.getCurrentUser());
  const [recipes, setRecipes] = useState(() => mockApi.getRecipes());
  const [plan, setPlan] = useState(() => (user ? mockApi.getPlan(user.id) : null));
  const [logs, setLogs] = useState(() => (user ? mockApi.getLogs(user.id) : []));

  useEffect(() => {
    if (user) setPlan(mockApi.getPlan(user.id));
    if (user) setLogs(mockApi.getLogs(user.id));
  }, [user]);

  const register = async (payload) => {
    const u = mockApi.register(payload);
    setUser(u);
    return u;
  };

  const login = async (payload) => {
    const u = mockApi.login(payload);
    setUser(u);
    return u;
  };

  const logout = () => {
    mockApi.logout();
    setUser(null);
    setPlan(null);
    setLogs([]);
  };

  const createRecipe = (data) => {
    const r = mockApi.addRecipe(data);
    setRecipes(prev => [r, ...prev]);
    return r;
  };

  const savePlan = (p) => {
    if (!user) throw new Error('Not authenticated');
    mockApi.savePlan(user.id, p);
    setPlan(p);
  };

  const generateGroceryList = (p) => mockApi.generateGroceryList(p);

  const logFood = (entry) => {
    if (!user) throw new Error('Not authenticated');
    const all = mockApi.logFood(user.id, entry);
    setLogs(all);
    return all;
  };

  const updateProfile = (patch) => {
    if (!user) throw new Error('Not authenticated');
    const updated = mockApi.updateProfile(user.id, patch);
    setUser(updated);
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

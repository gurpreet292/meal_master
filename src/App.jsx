import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';

import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Tracking from './pages/Tracking';
import Planner from './pages/Planner';
import Recipes from './pages/Recipes';
import Groceries from './pages/Groceries';
import Community from './pages/Community';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Protected Routes inside Layout */}
        <Route element={<PageLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/groceries" element={<Groceries />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

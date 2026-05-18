import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const PageLayout = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PageLayout;

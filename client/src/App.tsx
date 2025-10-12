import { useState } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { Dashboard } from './components/Dashboard.tsx';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNavigation = (item: string) => {
    setActiveItem(item);
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        activeItem={activeItem}
        onItemClick={handleNavigation}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeItem === 'dashboard' && <Dashboard />}
          {activeItem === 'courses' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Courses Management</h2>
              <p className="text-gray-600">Course management interface coming soon...</p>
            </div>
          )}
          {activeItem === 'tests' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tests & Assessments</h2>
              <p className="text-gray-600">Test management interface coming soon...</p>
            </div>
          )}
          {activeItem === 'employees' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Employee Management</h2>
              <p className="text-gray-600">Employee management interface coming soon...</p>
            </div>
          )}
          {activeItem === 'analytics' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analytics & Reports</h2>
              <p className="text-gray-600">Advanced analytics interface coming soon...</p>
            </div>
          )}
          {activeItem === 'settings' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Settings</h2>
              <p className="text-gray-600">System settings interface coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 
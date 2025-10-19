import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import LoginPage from './pages/LoginPage';
import CompaniesPage from './pages/CompaniesPage';

export default function App() {
  const { isAuthenticated, loading, role } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNavigation = (item: string) => {
    setActiveItem(item);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show different UI based on role
  if (role === 'root_admin') {
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
            {activeItem === 'companies' && <CompaniesPage />}
            {activeItem === 'system' && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">System Administration</h2>
                <p className="text-gray-600">System administration interface coming soon...</p>
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

  // For other roles, show simple dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {role === 'company_admin' ? 'Company Admin' : 'Employee'}!
          </h1>
          <p className="text-gray-600 mt-2">Your dashboard is being prepared...</p>
        </div>
      </div>
    </div>
  );
} 
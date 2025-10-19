import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import LoginPage from './pages/LoginPage';
import CompaniesPage from './pages/CompaniesPage';
import styles from './App.module.css';

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
      <div className={styles.loadingScreen}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading...</p>
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
      <div className={styles.mainLayout}>

        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
          activeItem={activeItem}
          onItemClick={handleNavigation}
        />

        {/* Main Content */}
        <div className={`${styles.mainContent} ${sidebarCollapsed ? styles.mainContentCollapsed : ''}`}>
          {/* Header */}
          <Header sidebarCollapsed={sidebarCollapsed} />

          {/* Page Content */}
          <main className={styles.pageContent}>
            {activeItem === 'dashboard' && <Dashboard />}
            {activeItem === 'courses' && (
              <div className={styles.placeholderSection}>
                <h2 className={styles.placeholderTitle}>Courses Management</h2>
                <p className={styles.placeholderText}>Course management interface coming soon...</p>
              </div>
            )}
            {activeItem === 'tests' && (
              <div className={styles.placeholderSection}>
                <h2 className={styles.placeholderTitle}>Tests & Assessments</h2>
                <p className={styles.placeholderText}>Test management interface coming soon...</p>
              </div>
            )}
            {activeItem === 'employees' && (
              <div className={styles.placeholderSection}>
                <h2 className={styles.placeholderTitle}>Employee Management</h2>
                <p className={styles.placeholderText}>Employee management interface coming soon...</p>
              </div>
            )}
            {activeItem === 'analytics' && (
              <div className={styles.placeholderSection}>
                <h2 className={styles.placeholderTitle}>Analytics & Reports</h2>
                <p className={styles.placeholderText}>Advanced analytics interface coming soon...</p>
              </div>
            )}
            {activeItem === 'companies' && <CompaniesPage />}
            {activeItem === 'system' && (
              <div className={styles.placeholderSection}>
                <h2 className={styles.placeholderTitle}>System Administration</h2>
                <p className={styles.placeholderText}>System administration interface coming soon...</p>
              </div>
            )}
            {activeItem === 'settings' && (
              <div className={styles.placeholderSection}>
                <h2 className={styles.placeholderTitle}>Settings</h2>
                <p className={styles.placeholderText}>System settings interface coming soon...</p>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  // For other roles, show simple dashboard
  return (
    <div className={styles.simpleDashboard}>
      <div className={styles.simpleDashboardContent}>
        <div className={styles.simpleDashboardInner}>
          <h1 className={styles.simpleDashboardTitle}>
            Welcome, {role === 'company_admin' ? 'Company Admin' : 'Employee'}!
          </h1>
          <p className={styles.simpleDashboardSubtitle}>Your dashboard is being prepared...</p>
        </div>
      </div>
    </div>
  );
} 
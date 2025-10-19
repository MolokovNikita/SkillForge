import {
  Home,
  BookOpen,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  Building2,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './Sidebar.module.css';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

const getNavigationItems = (role: string | null, t: (key: string) => string) => {
  const baseItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: Home },
    { id: 'courses', label: t('nav.courses'), icon: BookOpen },
    { id: 'tests', label: t('nav.tests'), icon: ClipboardList },
    { id: 'employees', label: t('nav.employees'), icon: Users },
    { id: 'analytics', label: t('nav.analytics'), icon: BarChart3 },
  ];

  if (role === 'root_admin') {
    return [
      ...baseItems,
      { id: 'companies', label: t('nav.companies'), icon: Building2 },
      { id: 'system', label: t('nav.system'), icon: Shield },
      { id: 'settings', label: t('nav.settings'), icon: Settings },
    ];
  }

  return [
    ...baseItems,
    { id: 'settings', label: t('nav.settings'), icon: Settings },
  ];
};

export function Sidebar({ collapsed, onToggle, activeItem, onItemClick }: SidebarProps) {
  const { user, role } = useAuth();
  const { t } = useLanguage();
  const navigationItems = getNavigationItems(role, t);

  const getRoleDisplayName = (role: string | null) => {
    switch (role) {
      case 'root_admin':
        return t('roles.rootAdmin');
      case 'company_admin':
        return t('roles.companyAdmin');
      case 'employee':
        return t('roles.employee');
      default:
        return t('roles.user');
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : styles.sidebarExpanded}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          {!collapsed && (
            <div className={styles.brand}>
              <div className={styles.logo}>
                <img
                  src="/logo.png"
                  alt="SkillForge Logo"
                  className={styles.logoImage}
                />
              </div>
              <span className={styles.brandText}>SkillForge</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={styles.toggleButton}
          >
            <ChevronLeft className={`${styles.toggleIcon} ${collapsed ? styles.toggleIconRotated : ''}`} />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <li key={item.id} className={styles.navItem}>
                <Button
                  variant="ghost"
                  className={`${styles.navButton} ${collapsed ? styles.navButtonCollapsed : ''} ${isActive ? styles.navButtonActive : styles.navButtonInactive}`}
                  onClick={() => onItemClick(item.id)}
                >
                  <Icon className={`${styles.navIcon} ${!collapsed ? styles.navIconWithText : ''}`} />
                  {!collapsed && <span className={styles.navText}>{item.label}</span>}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className={styles.userInfo}>
          <div className={styles.userContent}>
            <div className={styles.userAvatar}>
              <span className={styles.userInitials}>
                {getInitials(user?.full_name)}
              </span>
            </div>
            <div className={styles.userDetails}>
              <p className={styles.userName}>
                {user?.full_name || 'User'}
              </p>
              <p className={styles.userRole}>
                {getRoleDisplayName(role)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
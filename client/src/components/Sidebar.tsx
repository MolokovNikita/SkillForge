import {
  Home,
  BookOpen,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  GraduationCap,
  Building2,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

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
    <div className={`bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'
      }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900 font-semibold">SkillForge</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''
              }`} />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start h-10 ${collapsed ? 'px-2' : 'px-3'
                    } ${isActive
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  onClick={() => onItemClick(item.id)}
                >
                  <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {getInitials(user?.full_name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {getRoleDisplayName(role)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
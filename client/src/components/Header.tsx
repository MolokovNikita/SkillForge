import { Search, Bell, User, ChevronDown, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export function Header() {
    const { user, role, logout } = useAuth();
    const { t } = useLanguage();

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

    const getRoleColor = (role: string | null) => {
        switch (role) {
            case 'root_admin':
                return 'bg-red-600';
            case 'company_admin':
                return 'bg-blue-600';
            case 'employee':
                return 'bg-green-600';
            default:
                return 'bg-gray-600';
        }
    };

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
            {/* Search */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder={t('common.search') + '...'}
                        className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
                {/* Language Switcher */}
                <LanguageSwitcher />

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative p-2">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                        3
                    </Badge>
                </Button>

                {/* Company Selector - only for company_admin and employee */}
                {(role === 'company_admin' || role === 'employee') && (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                        <div className={`w-6 h-6 ${getRoleColor(role)} rounded-md flex items-center justify-center`}>
                            <span className="text-xs font-medium text-white">
                                {user?.company_id ? 'C' + user.company_id : 'C'}
                            </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                            Company {user?.company_id || 'N/A'}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                )}

                {/* User Profile */}
                <div className="flex items-center space-x-3">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{user?.full_name || 'User'}</p>
                        <p className="text-xs text-gray-500">{getRoleDisplayName(role)}</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                    </div>
                </div>

                {/* Logout Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-gray-600 hover:text-red-600"
                >
                    <LogOut className="w-4 h-4" />
                </Button>
            </div>
        </header>
    );
}
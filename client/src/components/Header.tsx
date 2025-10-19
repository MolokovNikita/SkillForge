import { Search, Bell, User, ChevronDown, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

interface HeaderProps {
    sidebarCollapsed?: boolean;
}

export function Header({ sidebarCollapsed = false }: HeaderProps) {
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

    const getRoleColorClass = (role: string | null) => {
        switch (role) {
            case 'root_admin':
                return styles.roleRootAdmin;
            case 'company_admin':
                return styles.roleCompanyAdmin;
            case 'employee':
                return styles.roleEmployee;
            default:
                return styles.roleDefault;
        }
    };

    return (
        <header className={`${styles.header} ${sidebarCollapsed ? styles.headerCollapsed : ''}`}>
            {/* Search */}
            <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} />
                    <Input
                        type="text"
                        placeholder={t('common.search') + '...'}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            {/* Right side */}
            <div className={styles.rightSection}>
                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Language Switcher */}
                <LanguageSwitcher />

                {/* Notifications */}
                <Button variant="ghost" size="sm" className={styles.notificationButton}>
                    <Bell className={styles.notificationIcon} />
                    <Badge
                        variant="destructive"
                        className={styles.notificationBadge}
                    >
                        3
                    </Badge>
                </Button>

                {/* Company Selector - only for company_admin and employee */}
                {(role === 'company_admin' || role === 'employee') && (
                    <div className={styles.companySelector}>
                        <div className={`${styles.companyIcon} ${getRoleColorClass(role)}`}>
                            <span className={styles.companyIconText}>
                                {user?.company_id ? 'C' + user.company_id : 'C'}
                            </span>
                        </div>
                        <span className={styles.companyText}>
                            Company {user?.company_id || 'N/A'}
                        </span>
                        <ChevronDown className={styles.companyChevron} />
                    </div>
                )}

                {/* User Profile */}
                <div className={styles.userProfile}>
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>{user?.full_name || 'User'}</p>
                        <p className={styles.userRole}>{getRoleDisplayName(role)}</p>
                    </div>
                    <div className={styles.userAvatar}>
                        <User className={styles.userAvatarIcon} />
                    </div>
                </div>

                {/* Logout Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className={styles.logoutButton}
                >
                    <LogOut className={styles.logoutIcon} />
                </Button>
            </div>
        </header>
    );
}
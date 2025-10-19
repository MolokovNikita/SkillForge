import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'ru';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Translations
const translations = {
    en: {
        // Common
        'common.loading': 'Loading...',
        'common.cancel': 'Cancel',
        'common.save': 'Save',
        'common.delete': 'Delete',
        'common.edit': 'Edit',
        'common.create': 'Create',
        'common.update': 'Update',
        'common.close': 'Close',
        'common.search': 'Search',
        'common.add': 'Add',
        'common.yes': 'Yes',
        'common.no': 'No',
        'common.confirm': 'Confirm',
        'common.success': 'Success',
        'common.error': 'Error',
        'common.warning': 'Warning',
        'common.info': 'Info',

        // Navigation
        'nav.dashboard': 'Dashboard',
        'nav.courses': 'Courses',
        'nav.tests': 'Tests',
        'nav.employees': 'Employees',
        'nav.analytics': 'Analytics',
        'nav.companies': 'Companies',
        'nav.system': 'System',
        'nav.settings': 'Settings',

        // Auth
        'auth.login': 'Login',
        'auth.logout': 'Logout',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.signIn': 'Sign in',
        'auth.signingIn': 'Signing in...',
        'auth.welcome': 'Welcome back',
        'auth.loginFailed': 'Login failed',
        'auth.invalidCredentials': 'Invalid credentials',

        // Companies
        'companies.title': 'Companies',
        'companies.subtitle': 'Manage company information and settings',
        'companies.addCompany': 'Add Company',
        'companies.editCompany': 'Edit Company',
        'companies.createCompany': 'Create New Company',
        'companies.updateCompany': 'Update Company',
        'companies.deleteCompany': 'Delete Company',
        'companies.companyName': 'Company Name',
        'companies.subdomain': 'Subdomain',
        'companies.contactEmail': 'Contact Email',
        'companies.contactPhone': 'Contact Phone',
        'companies.subscriptionStatus': 'Subscription Status',
        'companies.maxEmployees': 'Max Employees',
        'companies.subscriptionStartDate': 'Subscription Start Date',
        'companies.subscriptionEndDate': 'Subscription End Date',
        'companies.logoUrl': 'Logo URL',
        'companies.created': 'Created',
        'companies.actions': 'Actions',
        'companies.noCompanies': 'No companies found',
        'companies.noCompaniesDesc': 'Get started by creating a new company.',
        'companies.searchPlaceholder': 'Search companies...',
        'companies.deleteConfirm': 'Are you sure you want to delete this company?',
        'companies.deleteConfirmWithName': 'Are you sure you want to delete "{name}"? This action cannot be undone.',
        'companies.unlimited': 'Unlimited',
        'companies.placeholder.companyName': 'Enter company name',
        'companies.placeholder.subdomain': 'company-subdomain',
        'companies.placeholder.contactEmail': 'admin@company.com',
        'companies.placeholder.contactPhone': '+1 (555) 123-4567',
        'companies.placeholder.maxEmployees': '0 for unlimited',
        'companies.placeholder.logoUrl': 'https://example.com/logo.png',

        // Form validation
        'validation.required': 'This field is required',
        'validation.email': 'Please enter a valid email address',
        'validation.subdomain': 'Subdomain can only contain lowercase letters, numbers, and hyphens',
        'validation.subdomainTaken': 'This subdomain is already taken',
        'validation.fixErrors': 'Please fix the errors below',
        'validation.someFieldsInvalid': 'Some required fields are missing or invalid',

        // Notifications
        'notifications.companyCreated': 'Company created successfully',
        'notifications.companyUpdated': 'Company updated successfully',
        'notifications.companyDeleted': 'Company deleted successfully',
        'notifications.companyCreateError': 'Failed to create company',
        'notifications.companyUpdateError': 'Failed to update company',
        'notifications.companyDeleteError': 'Failed to delete company',
        'notifications.loadCompaniesError': 'Failed to load companies',
        'notifications.tryAgainLater': 'Please try again later',

        // Subscription status
        'subscription.active': 'Active',
        'subscription.inactive': 'Inactive',
        'subscription.suspended': 'Suspended',

        // User roles
        'roles.rootAdmin': 'Root Administrator',
        'roles.companyAdmin': 'Company Administrator',
        'roles.employee': 'Employee',
        'roles.user': 'User',
    },
    ru: {
        // Common
        'common.loading': 'Загрузка...',
        'common.cancel': 'Отмена',
        'common.save': 'Сохранить',
        'common.delete': 'Удалить',
        'common.edit': 'Редактировать',
        'common.create': 'Создать',
        'common.update': 'Обновить',
        'common.close': 'Закрыть',
        'common.search': 'Поиск',
        'common.add': 'Добавить',
        'common.yes': 'Да',
        'common.no': 'Нет',
        'common.confirm': 'Подтвердить',
        'common.success': 'Успешно',
        'common.error': 'Ошибка',
        'common.warning': 'Предупреждение',
        'common.info': 'Информация',

        // Navigation
        'nav.dashboard': 'Панель управления',
        'nav.courses': 'Курсы',
        'nav.tests': 'Тесты',
        'nav.employees': 'Сотрудники',
        'nav.analytics': 'Аналитика',
        'nav.companies': 'Компании',
        'nav.system': 'Система',
        'nav.settings': 'Настройки',

        // Auth
        'auth.login': 'Войти',
        'auth.logout': 'Выйти',
        'auth.email': 'Email',
        'auth.password': 'Пароль',
        'auth.signIn': 'Войти в систему',
        'auth.signingIn': 'Вход в систему...',
        'auth.welcome': 'Добро пожаловать',
        'auth.loginFailed': 'Ошибка входа',
        'auth.invalidCredentials': 'Неверные учетные данные',

        // Companies
        'companies.title': 'Компании',
        'companies.subtitle': 'Управление информацией о компаниях и настройками',
        'companies.addCompany': 'Добавить компанию',
        'companies.editCompany': 'Редактировать компанию',
        'companies.createCompany': 'Создать новую компанию',
        'companies.updateCompany': 'Обновить компанию',
        'companies.deleteCompany': 'Удалить компанию',
        'companies.companyName': 'Название компании',
        'companies.subdomain': 'Поддомен',
        'companies.contactEmail': 'Контактный email',
        'companies.contactPhone': 'Контактный телефон',
        'companies.subscriptionStatus': 'Статус подписки',
        'companies.maxEmployees': 'Максимум сотрудников',
        'companies.subscriptionStartDate': 'Дата начала подписки',
        'companies.subscriptionEndDate': 'Дата окончания подписки',
        'companies.logoUrl': 'URL логотипа',
        'companies.created': 'Создано',
        'companies.actions': 'Действия',
        'companies.noCompanies': 'Компании не найдены',
        'companies.noCompaniesDesc': 'Начните с создания новой компании.',
        'companies.searchPlaceholder': 'Поиск компаний...',
        'companies.deleteConfirm': 'Вы уверены, что хотите удалить эту компанию?',
        'companies.deleteConfirmWithName': 'Вы уверены, что хотите удалить "{name}"? Это действие нельзя отменить.',
        'companies.unlimited': 'Неограниченно',
        'companies.placeholder.companyName': 'Введите название компании',
        'companies.placeholder.subdomain': 'поддомен-компании',
        'companies.placeholder.contactEmail': 'admin@company.com',
        'companies.placeholder.contactPhone': '+1 (555) 123-4567',
        'companies.placeholder.maxEmployees': '0 для неограниченного',
        'companies.placeholder.logoUrl': 'https://example.com/logo.png',

        // Form validation
        'validation.required': 'Это поле обязательно',
        'validation.email': 'Пожалуйста, введите корректный email адрес',
        'validation.subdomain': 'Поддомен может содержать только строчные буквы, цифры и дефисы',
        'validation.subdomainTaken': 'Этот поддомен уже занят',
        'validation.fixErrors': 'Пожалуйста, исправьте ошибки ниже',
        'validation.someFieldsInvalid': 'Некоторые обязательные поля отсутствуют или неверны',

        // Notifications
        'notifications.companyCreated': 'Компания успешно создана',
        'notifications.companyUpdated': 'Компания успешно обновлена',
        'notifications.companyDeleted': 'Компания успешно удалена',
        'notifications.companyCreateError': 'Ошибка создания компании',
        'notifications.companyUpdateError': 'Ошибка обновления компании',
        'notifications.companyDeleteError': 'Ошибка удаления компании',
        'notifications.loadCompaniesError': 'Ошибка загрузки компаний',
        'notifications.tryAgainLater': 'Попробуйте позже',

        // Subscription status
        'subscription.active': 'Активна',
        'subscription.inactive': 'Неактивна',
        'subscription.suspended': 'Приостановлена',

        // User roles
        'roles.rootAdmin': 'Главный администратор',
        'roles.companyAdmin': 'Администратор компании',
        'roles.employee': 'Сотрудник',
        'roles.user': 'Пользователь',
    }
};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');

    // Load language from localStorage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations[typeof language]] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

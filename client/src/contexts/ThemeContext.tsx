import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        // Проверяем сохраненную тему в localStorage
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            return savedTheme;
        }

        // Проверяем системную тему
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    });

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        const root = window.document.documentElement;

        // Удаляем предыдущие классы темы
        root.classList.remove('light', 'dark');

        // Добавляем новый класс темы
        root.classList.add(theme);

        // Устанавливаем data-атрибут для CSS переменных
        root.setAttribute('data-theme', theme);

        // Принудительно обновляем CSS переменные
        if (theme === 'dark') {
            root.style.setProperty('--background', '#0f172a');
            root.style.setProperty('--foreground', '#f8fafc');
            root.style.setProperty('--card', '#1e293b');
            root.style.setProperty('--card-foreground', '#f8fafc');
            root.style.setProperty('--sidebar', '#1e293b');
            root.style.setProperty('--sidebar-foreground', '#f8fafc');
            root.style.setProperty('--header', '#1e293b');
            root.style.setProperty('--header-foreground', '#f8fafc');
            root.style.setProperty('--border', '#334155');
            root.style.setProperty('--muted', '#334155');
            root.style.setProperty('--muted-foreground', '#94a3b8');
            root.style.setProperty('--primary', '#3b82f6');
            root.style.setProperty('--primary-foreground', '#ffffff');
        } else {
            root.style.setProperty('--background', '#ffffff');
            root.style.setProperty('--foreground', '#0f172a');
            root.style.setProperty('--card', '#ffffff');
            root.style.setProperty('--card-foreground', '#0f172a');
            root.style.setProperty('--sidebar', '#f8fafc');
            root.style.setProperty('--sidebar-foreground', '#0f172a');
            root.style.setProperty('--header', '#ffffff');
            root.style.setProperty('--header-foreground', '#0f172a');
            root.style.setProperty('--border', '#e2e8f0');
            root.style.setProperty('--muted', '#f1f5f9');
            root.style.setProperty('--muted-foreground', '#64748b');
            root.style.setProperty('--primary', '#3b82f6');
            root.style.setProperty('--primary-foreground', '#ffffff');
        }

        // Принудительно перерисовываем
        root.style.display = 'none';
        root.offsetHeight; // Trigger reflow
        root.style.display = '';
    }, [theme]);

    // Слушаем изменения системной темы
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            // Обновляем тему только если пользователь не выбрал тему вручную
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const value = {
        theme,
        setTheme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

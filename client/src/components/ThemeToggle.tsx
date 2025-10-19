import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={styles.toggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <div className={styles.toggleTrack}>
                <div className={`${styles.toggleThumb} ${theme === 'dark' ? styles.toggleThumbDark : ''}`}>
                    {theme === 'light' ? (
                        <Sun className={styles.icon} />
                    ) : (
                        <Moon className={styles.icon} />
                    )}
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;

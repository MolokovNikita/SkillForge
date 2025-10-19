import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'en', name: 'ENG', countryCode: 'US' },
        { code: 'ru', name: 'RUS', countryCode: 'RU' }
    ] as const;

    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLanguageSelect = (langCode: 'en' | 'ru') => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className={styles.container} ref={dropdownRef}>
            <div
                className={styles.selectTrigger}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={styles.selectedLanguage}>
                    <div className={styles.flagContainer}>
                        <img
                            src={`https://flagcdn.com/w20/${currentLanguage.countryCode.toLowerCase()}.png`}
                            alt={currentLanguage.name}
                            className={styles.flag}
                        />
                    </div>
                    <span className={styles.languageName}>{currentLanguage.name}</span>
                </div>
                <ChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    {languages.map((lang) => (
                        <div
                            key={lang.code}
                            onClick={() => handleLanguageSelect(lang.code as 'en' | 'ru')}
                            className={`${styles.option} ${language === lang.code ? styles.optionSelected : ''}`}
                        >
                            <div className={styles.flagContainer}>
                                <img
                                    src={`https://flagcdn.com/w20/${lang.countryCode.toLowerCase()}.png`}
                                    alt={lang.name}
                                    className={styles.flag}
                                />
                            </div>
                            <span className={styles.languageName}>{lang.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;

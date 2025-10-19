import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { t } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.loginHeader}>
                        <h1 className={styles.loginTitle}>SkillForge {t('auth.login')}</h1>
                        <p className={styles.loginSubtitle}>{t('auth.signIn')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div className={styles.formField}>
                            <label htmlFor="email" className={styles.formLabel}>
                                {t('auth.email')}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.formInput}
                                placeholder="Enter your email"
                                disabled={loading}
                            />
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="password" className={styles.formLabel}>
                                {t('auth.password')}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.formInput}
                                placeholder="Enter your password"
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.loginButton}
                        >
                            {loading ? (
                                <>
                                    <div className={styles.loadingSpinner}></div>
                                    {t('auth.signingIn')}
                                </>
                            ) : (
                                t('auth.signIn')
                            )}
                        </button>
                    </form>

                    {/* Test Credentials */}
                    <div className={styles.testCredentials}>
                        <h3 className={styles.testCredentialsTitle}>Test Credentials:</h3>
                        <div className={styles.testCredentialsList}>
                            <div><strong>Root Admin:</strong> admin@skillforge.com / admin123</div>
                            <div><strong>Company Admin:</strong> Create via API</div>
                            <div><strong>Employee:</strong> Create via API</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Building2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { companiesService, type Company } from '../services/companies';
import { useToast } from '../contexts/ToastContext';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './CompaniesPage.module.css';

interface CompanyFormData {
    name: string;
    subdomain: string;
    contact_email: string;
    contact_phone: string;
    subscription_plan_id: number;
    subscription_status: string;
    subscription_start_date: string;
    subscription_end_date: string;
    max_employees: number;
    logo_url: string;
}

interface FieldErrors {
    [key: string]: string;
}

const CompaniesPage: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingCompany, setEditingCompany] = useState<Company | null>(null);
    const [formData, setFormData] = useState<CompanyFormData>({
        name: '',
        subdomain: '',
        contact_email: '',
        contact_phone: '',
        subscription_plan_id: 1,
        subscription_status: 'active',
        subscription_start_date: new Date().toISOString().split('T')[0],
        subscription_end_date: '',
        max_employees: 0,
        logo_url: ''
    });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showSuccess, showError, showWarning } = useToast();
    const { t } = useLanguage();

    // Load companies from API
    useEffect(() => {
        loadCompanies();
    }, []);

    // Block body scroll when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);

    const validateForm = (): boolean => {
        const errors: FieldErrors = {};

        // Required fields validation
        if (!formData.name.trim()) {
            errors.name = t('validation.required');
        }

        if (!formData.subdomain.trim()) {
            errors.subdomain = t('validation.required');
        } else if (!/^[a-z0-9-]+$/.test(formData.subdomain)) {
            errors.subdomain = t('validation.subdomain');
        }

        if (!formData.contact_email.trim()) {
            errors.contact_email = t('validation.required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
            errors.contact_email = t('validation.email');
        }

        // Check for duplicate subdomain
        const existingCompany = companies.find(company =>
            company.subdomain === formData.subdomain &&
            (!editingCompany || company.id !== editingCompany.id)
        );
        if (existingCompany) {
            errors.subdomain = t('validation.subdomainTaken');
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const loadCompanies = async () => {
        try {
            setLoading(true);
            const data = await companiesService.getCompanies();
            setCompanies(data);
        } catch (error) {
            console.error('Failed to load companies:', error);
            showError(t('notifications.loadCompaniesError'), t('notifications.tryAgainLater'));
            // Fallback to mock data if API fails
            const mockCompanies: Company[] = [
                {
                    id: 1,
                    name: 'TechCorp Inc.',
                    subdomain: 'techcorp',
                    logo_url: null,
                    subscription_plan_id: 1,
                    subscription_status: 'active',
                    subscription_start_date: '2024-01-15T10:30:00Z',
                    subscription_end_date: null,
                    max_employees: null,
                    contact_email: 'admin@techcorp.com',
                    contact_phone: null,
                    created_at: '2024-01-15T10:30:00Z',
                    updated_at: '2024-01-15T10:30:00Z',
                    settings: null
                },
                {
                    id: 2,
                    name: 'StartupXYZ',
                    subdomain: 'startupxyz',
                    logo_url: null,
                    subscription_plan_id: 1,
                    subscription_status: 'active',
                    subscription_start_date: '2024-01-20T14:15:00Z',
                    subscription_end_date: null,
                    max_employees: null,
                    contact_email: 'admin@startupxyz.com',
                    contact_phone: null,
                    created_at: '2024-01-20T14:15:00Z',
                    updated_at: '2024-01-20T14:15:00Z',
                    settings: null
                }
            ];
            setCompanies(mockCompanies);
        } finally {
            setLoading(false);
        }
    };

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.subdomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.contact_email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateCompany = () => {
        setEditingCompany(null);
        setFormData({
            name: '',
            subdomain: '',
            contact_email: '',
            contact_phone: '',
            subscription_plan_id: 1,
            subscription_status: 'active',
            subscription_start_date: new Date().toISOString().split('T')[0],
            subscription_end_date: '',
            max_employees: 0,
            logo_url: ''
        });
        setFieldErrors({});
        setShowModal(true);
    };

    const handleEditCompany = (company: Company) => {
        setEditingCompany(company);
        setFormData({
            name: company.name,
            subdomain: company.subdomain,
            contact_email: company.contact_email,
            contact_phone: company.contact_phone || '',
            subscription_plan_id: company.subscription_plan_id,
            subscription_status: company.subscription_status,
            subscription_start_date: company.subscription_start_date.split('T')[0],
            subscription_end_date: company.subscription_end_date ? company.subscription_end_date.split('T')[0] : '',
            max_employees: company.max_employees || 0,
            logo_url: company.logo_url || ''
        });
        setFieldErrors({});
        setShowModal(true);
    };

    const handleSaveCompany = async () => {
        // Validate form before submitting
        if (!validateForm()) {
            showWarning(t('validation.fixErrors'), t('validation.someFieldsInvalid'));
            return;
        }

        try {
            setIsSubmitting(true);

            // Prepare data with proper validation
            const companyData = {
                name: formData.name,
                subdomain: formData.subdomain,
                contact_email: formData.contact_email,
                contact_phone: formData.contact_phone || null,
                subscription_plan_id: formData.subscription_plan_id || 1,
                subscription_status: formData.subscription_status,
                subscription_start_date: formData.subscription_start_date ?
                    new Date(formData.subscription_start_date).toISOString() :
                    new Date().toISOString(),
                subscription_end_date: formData.subscription_end_date ?
                    new Date(formData.subscription_end_date).toISOString() :
                    null,
                max_employees: formData.max_employees || null,
                logo_url: formData.logo_url || null,
            };

            if (editingCompany) {
                // Update existing company
                const updatedCompany = await companiesService.updateCompany(editingCompany.id, companyData);
                setCompanies(prev => prev.map(company =>
                    company.id === editingCompany.id ? updatedCompany : company
                ));
                showSuccess(t('notifications.companyUpdated'), `${updatedCompany.name} ${t('notifications.companyUpdated').toLowerCase()}`);
            } else {
                // Create new company
                const newCompany = await companiesService.createCompany(companyData);
                setCompanies(prev => [...prev, newCompany]);
                showSuccess(t('notifications.companyCreated'), `${newCompany.name} ${t('notifications.companyCreated').toLowerCase()}`);
            }
            setShowModal(false);
            setFieldErrors({});
        } catch (error: any) {
            console.error('Failed to save company:', error);
            const errorMessage = error.response?.data?.error || error.message || 'An unexpected error occurred';
            showError(editingCompany ? t('notifications.companyUpdateError') : t('notifications.companyCreateError'), errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCompany = async (id: number) => {
        const company = companies.find(c => c.id === id);
        if (window.confirm(t('companies.deleteConfirmWithName').replace('{name}', company?.name || ''))) {
            try {
                await companiesService.deleteCompany(id);
                setCompanies(prev => prev.filter(company => company.id !== id));
                showSuccess(t('notifications.companyDeleted'), `${company?.name} ${t('notifications.companyDeleted').toLowerCase()}`);
            } catch (error: any) {
                console.error('Failed to delete company:', error);
                const errorMessage = error.response?.data?.error || error.message || 'An unexpected error occurred';
                showError(t('notifications.companyDeleteError'), errorMessage);
            }
        }
    };


    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>{t('companies.title')}</h1>
                    <p>{t('companies.subtitle')}</p>
                </div>
                <Button onClick={handleCreateCompany} className={styles.addButton}>
                    <Plus className={styles.addButtonIcon} />
                    {t('companies.addCompany')}
                </Button>
            </div>

            {/* Search and Filters */}
            <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} />
                    <Input
                        placeholder={t('companies.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            {/* Companies Table */}
            <div className={styles.tableContainer}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr>
                                <th>
                                    {t('companies.companyName')}
                                </th>
                                <th>
                                    {t('companies.subdomain')}
                                </th>
                                <th>
                                    {t('companies.contactEmail')}
                                </th>
                                <th>
                                    {t('companies.subscriptionStatus')}
                                </th>
                                <th>
                                    {t('companies.maxEmployees')}
                                </th>
                                <th>
                                    {t('companies.created')}
                                </th>
                                <th className={styles.tableCellRight}>
                                    {t('companies.actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {filteredCompanies.map((company) => (
                                <tr key={company.id} className={styles.tableRow}>
                                    <td className={styles.tableCell}>
                                        <div className={styles.companyCell}>
                                            <div className={styles.companyIcon}>
                                                <div className={styles.companyIconWrapper}>
                                                    <Building2 className={styles.companyIconSvg} />
                                                </div>
                                            </div>
                                            <div className={styles.companyInfo}>
                                                <div className={styles.companyName}>
                                                    {company.name}
                                                </div>
                                                <div className={styles.companyId}>
                                                    ID: {company.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <span className={styles.companyText}>{company.subdomain}</span>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <span className={styles.companyText}>{company.contact_email}</span>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <Badge className={company.subscription_status === 'active' ? styles.badgeActive : styles.badgeInactive}>
                                            {t(`subscription.${company.subscription_status}`)}
                                        </Badge>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <span className={styles.companyText}>{company.max_employees || t('companies.unlimited')}</span>
                                    </td>
                                    <td className={styles.tableCell}>
                                        {new Date(company.created_at).toLocaleDateString()}
                                    </td>
                                    <td className={`${styles.tableCell} ${styles.tableCellRight}`}>
                                        <div className={styles.actions}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEditCompany(company)}
                                                className={`${styles.actionButton} ${styles.actionButtonEdit}`}
                                            >
                                                <Edit className={styles.actionIcon} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteCompany(company.id)}
                                                className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                                            >
                                                <Trash2 className={styles.actionIcon} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredCompanies.length === 0 && (
                <div className={styles.emptyState}>
                    <Building2 className={styles.emptyIcon} />
                    <h3 className={styles.emptyTitle}>{t('companies.noCompanies')}</h3>
                    <p className={styles.emptyDescription}>
                        {searchTerm ? 'Try adjusting your search terms.' : t('companies.noCompaniesDesc')}
                    </p>
                    {!searchTerm && (
                        <div className={styles.emptyButton}>
                            <Button onClick={handleCreateCompany}>
                                <Plus className={styles.addButtonIcon} />
                                {t('companies.addCompany')}
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div
                    className={styles.modal}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowModal(false);
                        }
                    }}
                >
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalTitle}>
                                <h3>
                                    {editingCompany ? t('companies.editCompany') : t('companies.createCompany')}
                                </h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className={styles.closeButton}
                                >
                                    <svg className={styles.closeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.formField}>
                                    <label className={styles.formLabel}>
                                        {t('companies.companyName')} *
                                    </label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if (fieldErrors.name) {
                                                setFieldErrors(prev => ({ ...prev, name: '' }));
                                            }
                                        }}
                                        placeholder={t('companies.placeholder.companyName')}
                                        className={`${styles.formInput} ${fieldErrors.name ? styles.formInputError : ''}`}
                                    />
                                    {fieldErrors.name && (
                                        <p className={styles.formError}>{fieldErrors.name}</p>
                                    )}
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.formLabel}>
                                        {t('companies.subdomain')} *
                                    </label>
                                    <Input
                                        value={formData.subdomain}
                                        onChange={(e) => {
                                            setFormData({ ...formData, subdomain: e.target.value.toLowerCase() });
                                            if (fieldErrors.subdomain) {
                                                setFieldErrors(prev => ({ ...prev, subdomain: '' }));
                                            }
                                        }}
                                        placeholder={t('companies.placeholder.subdomain')}
                                        className={`${styles.formInput} ${fieldErrors.subdomain ? styles.formInputError : ''}`}
                                    />
                                    {fieldErrors.subdomain && (
                                        <p className={styles.formError}>{fieldErrors.subdomain}</p>
                                    )}
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.formLabel}>
                                        {t('companies.contactEmail')} *
                                    </label>
                                    <Input
                                        value={formData.contact_email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, contact_email: e.target.value });
                                            if (fieldErrors.contact_email) {
                                                setFieldErrors(prev => ({ ...prev, contact_email: '' }));
                                            }
                                        }}
                                        placeholder={t('companies.placeholder.contactEmail')}
                                        type="email"
                                        className={`${styles.formInput} ${fieldErrors.contact_email ? styles.formInputError : ''}`}
                                    />
                                    {fieldErrors.contact_email && (
                                        <p className={styles.formError}>{fieldErrors.contact_email}</p>
                                    )}
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.formLabel}>
                                        {t('companies.contactPhone')}
                                    </label>
                                    <Input
                                        value={formData.contact_phone}
                                        onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                                        placeholder={t('companies.placeholder.contactPhone')}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.formLabel}>
                                        {t('companies.subscriptionStatus')}
                                    </label>
                                    <select
                                        value={formData.subscription_status}
                                        onChange={(e) => setFormData({ ...formData, subscription_status: e.target.value })}
                                        className={styles.formSelect}
                                    >
                                        <option value="active">{t('subscription.active')}</option>
                                        <option value="inactive">{t('subscription.inactive')}</option>
                                        <option value="suspended">{t('subscription.suspended')}</option>
                                    </select>
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.formLabel}>
                                        {t('companies.maxEmployees')}
                                    </label>
                                    <Input
                                        value={formData.max_employees}
                                        onChange={(e) => setFormData({ ...formData, max_employees: parseInt(e.target.value) || 0 })}
                                        placeholder={t('companies.placeholder.maxEmployees')}
                                        type="number"
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.formLabel}>
                                        {t('companies.subscriptionStartDate')}
                                    </label>
                                    <Input
                                        value={formData.subscription_start_date}
                                        onChange={(e) => setFormData({ ...formData, subscription_start_date: e.target.value })}
                                        type="date"
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.formLabel}>
                                        {t('companies.subscriptionEndDate')}
                                    </label>
                                    <Input
                                        value={formData.subscription_end_date}
                                        onChange={(e) => setFormData({ ...formData, subscription_end_date: e.target.value })}
                                        type="date"
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={`${styles.formField} ${styles.formFieldFull}`}>
                                    <label className={styles.formLabel}>
                                        {t('companies.logoUrl')}
                                    </label>
                                    <Input
                                        value={formData.logo_url}
                                        onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                                        placeholder={t('companies.placeholder.logoUrl')}
                                        className={styles.formInput}
                                    />
                                </div>
                            </div>

                            <div className={styles.formActions}>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowModal(false)}
                                    className={styles.formButtonOutline}
                                    disabled={isSubmitting}
                                >
                                    {t('common.cancel')}
                                </Button>
                                <Button
                                    onClick={handleSaveCompany}
                                    disabled={isSubmitting || !formData.name.trim() || !formData.subdomain.trim() || !formData.contact_email.trim()}
                                    className={styles.formButtonPrimary}
                                >
                                    {isSubmitting ? (
                                        <div className={styles.loadingContainer}>
                                            <div className={styles.loadingSpinner}></div>
                                            {editingCompany ? t('common.update') + '...' : t('common.create') + '...'}
                                        </div>
                                    ) : (
                                        editingCompany ? t('companies.updateCompany') : t('companies.createCompany')
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompaniesPage;

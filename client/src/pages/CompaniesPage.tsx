import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Building2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { companiesService, type Company, type CreateCompanyData } from '../services/companies';
import { useToast } from '../contexts/ToastContext';
import { useLanguage } from '../contexts/LanguageContext';

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
                subscription_plan_id: formData.subscription_plan_id || null,
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
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('companies.title')}</h1>
                    <p className="text-gray-600">{t('companies.subtitle')}</p>
                </div>
                <Button onClick={handleCreateCompany} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    {t('companies.addCompany')}
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4 mt-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder={t('companies.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Companies Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('companies.companyName')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('companies.subdomain')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('companies.contactEmail')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('companies.subscriptionStatus')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('companies.maxEmployees')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('companies.created')}
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('companies.actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCompanies.map((company) => (
                                <tr key={company.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                                    <Building2 className="h-5 w-5 text-blue-600" />
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {company.name}
                                                </div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    ID: {company.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{company.subdomain}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{company.contact_email}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge className={company.subscription_status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                            {t(`subscription.${company.subscription_status}`)}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{company.max_employees || t('companies.unlimited')}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(company.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEditCompany(company)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteCompany(company.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="w-4 h-4" />
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
                <div className="text-center py-12 mt-6">
                    <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">{t('companies.noCompanies')}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {searchTerm ? 'Try adjusting your search terms.' : t('companies.noCompaniesDesc')}
                    </p>
                    {!searchTerm && (
                        <div className="mt-6">
                            <Button onClick={handleCreateCompany}>
                                <Plus className="w-4 h-4 mr-2" />
                                {t('companies.addCompany')}
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowModal(false);
                        }
                    }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        overflow: 'hidden',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                    }}
                >
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {editingCompany ? t('companies.editCompany') : t('companies.createCompany')}
                                </h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                        className={`w-full ${fieldErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {fieldErrors.name && (
                                        <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                        className={`w-full ${fieldErrors.subdomain ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {fieldErrors.subdomain && (
                                        <p className="mt-1 text-sm text-red-600">{fieldErrors.subdomain}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                        className={`w-full ${fieldErrors.contact_email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {fieldErrors.contact_email && (
                                        <p className="mt-1 text-sm text-red-600">{fieldErrors.contact_email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('companies.contactPhone')}
                                    </label>
                                    <Input
                                        value={formData.contact_phone}
                                        onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                                        placeholder={t('companies.placeholder.contactPhone')}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('companies.subscriptionStatus')}
                                    </label>
                                    <select
                                        value={formData.subscription_status}
                                        onChange={(e) => setFormData({ ...formData, subscription_status: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="active">{t('subscription.active')}</option>
                                        <option value="inactive">{t('subscription.inactive')}</option>
                                        <option value="suspended">{t('subscription.suspended')}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('companies.maxEmployees')}
                                    </label>
                                    <Input
                                        value={formData.max_employees}
                                        onChange={(e) => setFormData({ ...formData, max_employees: parseInt(e.target.value) || 0 })}
                                        placeholder={t('companies.placeholder.maxEmployees')}
                                        type="number"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('companies.subscriptionStartDate')}
                                    </label>
                                    <Input
                                        value={formData.subscription_start_date}
                                        onChange={(e) => setFormData({ ...formData, subscription_start_date: e.target.value })}
                                        type="date"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('companies.subscriptionEndDate')}
                                    </label>
                                    <Input
                                        value={formData.subscription_end_date}
                                        onChange={(e) => setFormData({ ...formData, subscription_end_date: e.target.value })}
                                        type="date"
                                        className="w-full"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('companies.logoUrl')}
                                    </label>
                                    <Input
                                        value={formData.logo_url}
                                        onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                                        placeholder={t('companies.placeholder.logoUrl')}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowModal(false)}
                                    className="px-6"
                                    disabled={isSubmitting}
                                >
                                    {t('common.cancel')}
                                </Button>
                                <Button
                                    onClick={handleSaveCompany}
                                    disabled={isSubmitting || !formData.name.trim() || !formData.subdomain.trim() || !formData.contact_email.trim()}
                                    className="px-6"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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

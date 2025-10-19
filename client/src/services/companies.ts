import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Create axios instance with auth headers
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface Company {
    id: number;
    name: string;
    subdomain: string;
    logo_url: string | null;
    subscription_plan_id: number;
    subscription_status: string;
    subscription_start_date: string;
    subscription_end_date: string | null;
    max_employees: number | null;
    contact_email: string;
    contact_phone: string | null;
    created_at: string;
    updated_at: string;
    settings: any | null;
}

export interface CreateCompanyData {
    name: string;
    subdomain: string;
    contact_email: string;
    contact_phone?: string | null;
    subscription_plan_id: number;
    subscription_status: string;
    subscription_start_date: string;
    subscription_end_date?: string | null;
    max_employees?: number | null;
    logo_url?: string | null;
    settings?: any;
}

export interface UpdateCompanyData extends CreateCompanyData {
    id: number;
}

export const companiesService = {
    // Get all companies
    async getCompanies(): Promise<Company[]> {
        const response = await api.get('/companies');
        return response.data;
    },

    // Get company by ID
    async getCompany(id: number): Promise<Company> {
        const response = await api.get(`/companies/${id}`);
        return response.data;
    },

    // Create new company
    async createCompany(data: CreateCompanyData): Promise<Company> {
        const response = await api.post('/companies', data);
        return response.data;
    },

    // Update company
    async updateCompany(id: number, data: CreateCompanyData): Promise<Company> {
        const response = await api.put(`/companies/${id}`, data);
        return response.data;
    },

    // Delete company
    async deleteCompany(id: number): Promise<void> {
        await api.delete(`/companies/${id}`);
    },
};

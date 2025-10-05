import { prisma } from "../db/prisma";

type CompanyRecord = {
    id: number;
    name: string;
    subdomain: string;
    logo_url?: string | null;
    subscription_plan_id: number | null;
    subscription_status: string | null;
    subscription_start_date: Date;
    subscription_end_date?: Date | null;
    max_employees?: number | null;
    contact_email: string;
    contact_phone?: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    settings?: unknown | null;
};

export class Company {
    id: number;
    name: string;
    subdomain: string;
    logo_url?: string | null;
    subscription_plan_id: number;
    subscription_status: string;
    subscription_start_date: Date;
    subscription_end_date?: Date | null;
    max_employees?: number | null;
    contact_email: string;
    contact_phone?: string | null;
    created_at: Date;
    updated_at: Date;
    settings?: unknown | null;

    constructor(data: CompanyRecord) {
        this.id = data.id;
        this.name = data.name;
        this.subdomain = data.subdomain;
        this.logo_url = data.logo_url;
        this.subscription_plan_id = (data.subscription_plan_id ?? 0);
        this.subscription_status = (data.subscription_status ?? "active");
        this.subscription_start_date = data.subscription_start_date;
        this.subscription_end_date = data.subscription_end_date;
        this.max_employees = data.max_employees;
        this.contact_email = data.contact_email;
        this.contact_phone = data.contact_phone;
        this.created_at = (data.created_at ?? new Date());
        this.updated_at = (data.updated_at ?? new Date());
        this.settings = data.settings;
    }

    // Получить все компании
    static async findAll() {
        const companies = await prisma.companies.findMany();
        return companies.map((c: CompanyRecord) => new Company(c));
    }

    // Найти компанию по ID
    static async findById(id: number) {
        const company = await prisma.companies.findUnique({ where: { id } });
        return company ? new Company(company) : null;
    }

    // Создать новую компанию
    static async create(data: {
        name: string;
        subdomain: string;
        contact_email: string;
        subscription_plan_id: number;
    }) {
        const company = await prisma.companies.create({
            data: {
                ...data,
                subscription_start_date: new Date(),
            },
        });
        return new Company(company);
    }

    // Обновить компанию
    static async update(id: number, data: Partial<Company>) {
        const company = await prisma.companies.update({
            where: { id },
            data,
        });
        return new Company(company);
    }

    // Удалить компанию
    static async delete(id: number) {
        await prisma.companies.delete({ where: { id } });
        return true;
    }
}

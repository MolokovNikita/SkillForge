import { Request, Response } from "express";
import { Company } from "../models/Company";
// Получить список всех компаний
export const getCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await Company.findAll();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch companies", details: error });
    }
};

// Создать новую компанию
export const createCompany = async (req: Request, res: Response) => {
    const { name, subdomain, contact_email, subscription_plan_id } = req.body;

    try {
        const company = await Company.create({
            name,
            subdomain,
            contact_email,
            subscription_plan_id,
        });
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ error: "Failed to create company", details: error });
    }
};

export const getCompanyById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const company = await Company.findById(parseInt(id));
    res.json(company);
};

export const updateCompany = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, subdomain, contact_email, subscription_plan_id } = req.body;
    const company = await Company.update(parseInt(id), { name, subdomain, contact_email, subscription_plan_id });
    res.json(company);
};

export const deleteCompany = async (req: Request, res: Response) => {
    const { id } = req.params;
    await Company.delete(parseInt(id));
    res.json({ message: "Company deleted successfully" });
};
import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех компаний
export const getCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await prisma.companies.findMany();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch companies", details: error });
    }
};

// Создать новую компанию
export const createCompany = async (req: Request, res: Response) => {
    try {
        console.log('Creating company with data:', req.body);
        const company = await prisma.companies.create({
            data: req.body,
        });
        res.status(201).json(company);
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ error: "Failed to create company", details: error });
    }
};

export const getCompanyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const company = await prisma.companies.findUnique({ where: { id: parseInt(id) } });
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch company", details: error });
    }
};

export const updateCompany = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const company = await prisma.companies.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: "Failed to update company", details: error });
    }
};

export const deleteCompany = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.companies.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Company deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete company", details: error });
    }
};
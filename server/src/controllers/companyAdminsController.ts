import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех company admins
export const getcompanyAdmins = async (req: Request, res: Response) => {
    try {
        const companyadmins = await prisma.company_admins.findMany();
        res.json(companyadmins);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch company admins", details: error });
    }
};

// Создать новый company admin
export const createcompanyAdmin = async (req: Request, res: Response) => {
    try {
        const companyadmin = await prisma.company_admins.create({
            data: req.body,
        });
        res.status(201).json(companyadmin);
    } catch (error) {
        res.status(500).json({ error: "Failed to create company admin", details: error });
    }
};

export const getcompanyAdminById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const companyadmin = await prisma.company_admins.findUnique({ where: { id: parseInt(id) } });
        if (!companyadmin) {
            return res.status(404).json({ error: "Company Admin not found" });
        }
        res.json(companyadmin);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch company admin", details: error });
    }
};

export const updatecompanyAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const companyadmin = await prisma.company_admins.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(companyadmin);
    } catch (error) {
        res.status(500).json({ error: "Failed to update company admin", details: error });
    }
};

export const deletecompanyAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.company_admins.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Company Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete company admin", details: error });
    }
};

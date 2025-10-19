import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех root admins
export const getrootAdmins = async (req: Request, res: Response) => {
    try {
        const rootadmins = await prisma.root_admins.findMany();
        res.json(rootadmins);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch root admins", details: error });
    }
};

// Создать новый root admin
export const createrootAdmin = async (req: Request, res: Response) => {
    try {
        const rootadmin = await prisma.root_admins.create({
            data: req.body,
        });
        res.status(201).json(rootadmin);
    } catch (error) {
        res.status(500).json({ error: "Failed to create root admin", details: error });
    }
};

export const getrootAdminById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rootadmin = await prisma.root_admins.findUnique({ where: { id: parseInt(id) } });
        if (!rootadmin) {
            return res.status(404).json({ error: "Root Admin not found" });
        }
        res.json(rootadmin);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch root admin", details: error });
    }
};

export const updaterootAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rootadmin = await prisma.root_admins.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(rootadmin);
    } catch (error) {
        res.status(500).json({ error: "Failed to update root admin", details: error });
    }
};

export const deleterootAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.root_admins.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Root Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete root admin", details: error });
    }
};

import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех company statisticss
export const getcompanyStatistics = async (req: Request, res: Response) => {
    try {
        const companystatistics = await prisma.company_statistics.findMany();
        res.json(companystatistics);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch company statisticss", details: error });
    }
};

// Создать новый company statistics
export const createcompanyStatistic = async (req: Request, res: Response) => {
    try {
        const companystatistic = await prisma.company_statistics.create({
            data: req.body,
        });
        res.status(201).json(companystatistic);
    } catch (error) {
        res.status(500).json({ error: "Failed to create company statistics", details: error });
    }
};

export const getcompanyStatisticById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const companystatistic = await prisma.company_statistics.findUnique({ where: { id: parseInt(id) } });
        if (!companystatistic) {
            return res.status(404).json({ error: "Company Statistics not found" });
        }
        res.json(companystatistic);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch company statistics", details: error });
    }
};

export const updatecompanyStatistic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const companystatistic = await prisma.company_statistics.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(companystatistic);
    } catch (error) {
        res.status(500).json({ error: "Failed to update company statistics", details: error });
    }
};

export const deletecompanyStatistic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.company_statistics.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Company Statistics deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete company statistics", details: error });
    }
};

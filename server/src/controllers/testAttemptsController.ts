import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех test attempts
export const gettestAttempts = async (req: Request, res: Response) => {
    try {
        const testattempts = await prisma.test_attempts.findMany();
        res.json(testattempts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch test attempts", details: error });
    }
};

// Создать новый test attempt
export const createtestAttempt = async (req: Request, res: Response) => {
    try {
        const testattempt = await prisma.test_attempts.create({
            data: req.body,
        });
        res.status(201).json(testattempt);
    } catch (error) {
        res.status(500).json({ error: "Failed to create test attempt", details: error });
    }
};

export const gettestAttemptById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const testattempt = await prisma.test_attempts.findUnique({ where: { id: parseInt(id) } });
        if (!testattempt) {
            return res.status(404).json({ error: "Test Attempt not found" });
        }
        res.json(testattempt);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch test attempt", details: error });
    }
};

export const updatetestAttempt = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const testattempt = await prisma.test_attempts.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(testattempt);
    } catch (error) {
        res.status(500).json({ error: "Failed to update test attempt", details: error });
    }
};

export const deletetestAttempt = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.test_attempts.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Test Attempt deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete test attempt", details: error });
    }
};

import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех tests
export const gettests = async (req: Request, res: Response) => {
    try {
        const tests = await prisma.tests.findMany();
        res.json(tests);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tests", details: error });
    }
};

// Создать новый test
export const createtest = async (req: Request, res: Response) => {
    try {
        const test = await prisma.tests.create({
            data: req.body,
        });
        res.status(201).json(test);
    } catch (error) {
        res.status(500).json({ error: "Failed to create test", details: error });
    }
};

export const gettestById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const test = await prisma.tests.findUnique({ where: { id: parseInt(id) } });
        if (!test) {
            return res.status(404).json({ error: "Test not found" });
        }
        res.json(test);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch test", details: error });
    }
};

export const updatetest = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const test = await prisma.tests.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(test);
    } catch (error) {
        res.status(500).json({ error: "Failed to update test", details: error });
    }
};

export const deletetest = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.tests.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Test deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete test", details: error });
    }
};

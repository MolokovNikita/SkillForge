import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех test answers
export const gettestAnswers = async (req: Request, res: Response) => {
    try {
        const testanswers = await prisma.test_answers.findMany();
        res.json(testanswers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch test answers", details: error });
    }
};

// Создать новый test answer
export const createtestAnswer = async (req: Request, res: Response) => {
    try {
        const testanswer = await prisma.test_answers.create({
            data: req.body,
        });
        res.status(201).json(testanswer);
    } catch (error) {
        res.status(500).json({ error: "Failed to create test answer", details: error });
    }
};

export const gettestAnswerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const testanswer = await prisma.test_answers.findUnique({ where: { id: parseInt(id) } });
        if (!testanswer) {
            return res.status(404).json({ error: "Test Answer not found" });
        }
        res.json(testanswer);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch test answer", details: error });
    }
};

export const updatetestAnswer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const testanswer = await prisma.test_answers.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(testanswer);
    } catch (error) {
        res.status(500).json({ error: "Failed to update test answer", details: error });
    }
};

export const deletetestAnswer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.test_answers.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Test Answer deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete test answer", details: error });
    }
};

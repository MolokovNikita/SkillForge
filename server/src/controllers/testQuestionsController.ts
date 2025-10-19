import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех test questions
export const gettestQuestions = async (req: Request, res: Response) => {
    try {
        const testquestions = await prisma.test_questions.findMany();
        res.json(testquestions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch test questions", details: error });
    }
};

// Создать новый test question
export const createtestQuestion = async (req: Request, res: Response) => {
    try {
        const testquestion = await prisma.test_questions.create({
            data: req.body,
        });
        res.status(201).json(testquestion);
    } catch (error) {
        res.status(500).json({ error: "Failed to create test question", details: error });
    }
};

export const gettestQuestionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const testquestion = await prisma.test_questions.findUnique({ where: { id: parseInt(id) } });
        if (!testquestion) {
            return res.status(404).json({ error: "Test Question not found" });
        }
        res.json(testquestion);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch test question", details: error });
    }
};

export const updatetestQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const testquestion = await prisma.test_questions.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(testquestion);
    } catch (error) {
        res.status(500).json({ error: "Failed to update test question", details: error });
    }
};

export const deletetestQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.test_questions.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Test Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete test question", details: error });
    }
};

import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех question options
export const getquestionOptions = async (req: Request, res: Response) => {
    try {
        const questionoptions = await prisma.question_options.findMany();
        res.json(questionoptions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch question options", details: error });
    }
};

// Создать новый question option
export const createquestionOption = async (req: Request, res: Response) => {
    try {
        const questionoption = await prisma.question_options.create({
            data: req.body,
        });
        res.status(201).json(questionoption);
    } catch (error) {
        res.status(500).json({ error: "Failed to create question option", details: error });
    }
};

export const getquestionOptionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const questionoption = await prisma.question_options.findUnique({ where: { id: parseInt(id) } });
        if (!questionoption) {
            return res.status(404).json({ error: "Question Option not found" });
        }
        res.json(questionoption);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch question option", details: error });
    }
};

export const updatequestionOption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const questionoption = await prisma.question_options.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(questionoption);
    } catch (error) {
        res.status(500).json({ error: "Failed to update question option", details: error });
    }
};

export const deletequestionOption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.question_options.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Question Option deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete question option", details: error });
    }
};

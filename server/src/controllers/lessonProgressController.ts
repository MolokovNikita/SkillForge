import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех lesson progresss
export const getlessonProgress = async (req: Request, res: Response) => {
    try {
        const lessonprogress = await prisma.lesson_progress.findMany();
        res.json(lessonprogress);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lesson progresss", details: error });
    }
};

// Создать новый lesson progress
export const createlessonProgres = async (req: Request, res: Response) => {
    try {
        const lessonprogres = await prisma.lesson_progress.create({
            data: req.body,
        });
        res.status(201).json(lessonprogres);
    } catch (error) {
        res.status(500).json({ error: "Failed to create lesson progress", details: error });
    }
};

export const getlessonProgresById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const lessonprogres = await prisma.lesson_progress.findUnique({ where: { id: parseInt(id) } });
        if (!lessonprogres) {
            return res.status(404).json({ error: "Lesson Progress not found" });
        }
        res.json(lessonprogres);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lesson progress", details: error });
    }
};

export const updatelessonProgres = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const lessonprogres = await prisma.lesson_progress.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(lessonprogres);
    } catch (error) {
        res.status(500).json({ error: "Failed to update lesson progress", details: error });
    }
};

export const deletelessonProgres = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.lesson_progress.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Lesson Progress deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete lesson progress", details: error });
    }
};

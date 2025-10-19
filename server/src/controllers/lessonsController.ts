import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех lessons
export const getlessons = async (req: Request, res: Response) => {
    try {
        const lessons = await prisma.lessons.findMany();
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lessons", details: error });
    }
};

// Создать новый lesson
export const createlesson = async (req: Request, res: Response) => {
    try {
        const lesson = await prisma.lessons.create({
            data: req.body,
        });
        res.status(201).json(lesson);
    } catch (error) {
        res.status(500).json({ error: "Failed to create lesson", details: error });
    }
};

export const getlessonById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const lesson = await prisma.lessons.findUnique({ where: { id: parseInt(id) } });
        if (!lesson) {
            return res.status(404).json({ error: "Lesson not found" });
        }
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lesson", details: error });
    }
};

export const updatelesson = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const lesson = await prisma.lessons.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ error: "Failed to update lesson", details: error });
    }
};

export const deletelesson = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.lessons.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Lesson deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete lesson", details: error });
    }
};

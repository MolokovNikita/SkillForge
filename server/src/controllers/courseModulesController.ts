import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех course modules
export const getcourseModules = async (req: Request, res: Response) => {
    try {
        const coursemodules = await prisma.course_modules.findMany();
        res.json(coursemodules);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch course modules", details: error });
    }
};

// Создать новый course module
export const createcourseModule = async (req: Request, res: Response) => {
    try {
        const coursemodule = await prisma.course_modules.create({
            data: req.body,
        });
        res.status(201).json(coursemodule);
    } catch (error) {
        res.status(500).json({ error: "Failed to create course module", details: error });
    }
};

export const getcourseModuleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const coursemodule = await prisma.course_modules.findUnique({ where: { id: parseInt(id) } });
        if (!coursemodule) {
            return res.status(404).json({ error: "Course Module not found" });
        }
        res.json(coursemodule);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch course module", details: error });
    }
};

export const updatecourseModule = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const coursemodule = await prisma.course_modules.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(coursemodule);
    } catch (error) {
        res.status(500).json({ error: "Failed to update course module", details: error });
    }
};

export const deletecourseModule = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.course_modules.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Course Module deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete course module", details: error });
    }
};

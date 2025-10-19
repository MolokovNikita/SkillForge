import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех lesson materials
export const getlessonMaterials = async (req: Request, res: Response) => {
    try {
        const lessonmaterials = await prisma.lesson_materials.findMany();
        res.json(lessonmaterials);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lesson materials", details: error });
    }
};

// Создать новый lesson material
export const createlessonMaterial = async (req: Request, res: Response) => {
    try {
        const lessonmaterial = await prisma.lesson_materials.create({
            data: req.body,
        });
        res.status(201).json(lessonmaterial);
    } catch (error) {
        res.status(500).json({ error: "Failed to create lesson material", details: error });
    }
};

export const getlessonMaterialById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const lessonmaterial = await prisma.lesson_materials.findUnique({ where: { id: parseInt(id) } });
        if (!lessonmaterial) {
            return res.status(404).json({ error: "Lesson Material not found" });
        }
        res.json(lessonmaterial);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lesson material", details: error });
    }
};

export const updatelessonMaterial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const lessonmaterial = await prisma.lesson_materials.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(lessonmaterial);
    } catch (error) {
        res.status(500).json({ error: "Failed to update lesson material", details: error });
    }
};

export const deletelessonMaterial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.lesson_materials.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Lesson Material deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete lesson material", details: error });
    }
};

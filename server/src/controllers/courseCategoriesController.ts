import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех course categorys
export const getcourseCategories = async (req: Request, res: Response) => {
    try {
        const coursecategories = await prisma.course_categories.findMany();
        res.json(coursecategories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch course categorys", details: error });
    }
};

// Создать новый course category
export const createcourseCategorie = async (req: Request, res: Response) => {
    try {
        const coursecategorie = await prisma.course_categories.create({
            data: req.body,
        });
        res.status(201).json(coursecategorie);
    } catch (error) {
        res.status(500).json({ error: "Failed to create course category", details: error });
    }
};

export const getcourseCategorieById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const coursecategorie = await prisma.course_categories.findUnique({ where: { id: parseInt(id) } });
        if (!coursecategorie) {
            return res.status(404).json({ error: "Course Category not found" });
        }
        res.json(coursecategorie);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch course category", details: error });
    }
};

export const updatecourseCategorie = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const coursecategorie = await prisma.course_categories.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(coursecategorie);
    } catch (error) {
        res.status(500).json({ error: "Failed to update course category", details: error });
    }
};

export const deletecourseCategorie = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.course_categories.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Course Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete course category", details: error });
    }
};

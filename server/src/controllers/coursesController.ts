import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех courses
export const getcourses = async (req: Request, res: Response) => {
    try {
        const courses = await prisma.courses.findMany();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch courses", details: error });
    }
};

// Создать новый course
export const createcourse = async (req: Request, res: Response) => {
    try {
        const course = await prisma.courses.create({
            data: req.body,
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: "Failed to create course", details: error });
    }
};

export const getcourseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const course = await prisma.courses.findUnique({ where: { id: parseInt(id) } });
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch course", details: error });
    }
};

export const updatecourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const course = await prisma.courses.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: "Failed to update course", details: error });
    }
};

export const deletecourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.courses.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete course", details: error });
    }
};

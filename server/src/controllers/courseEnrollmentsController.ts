import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех course enrollments
export const getcourseEnrollments = async (req: Request, res: Response) => {
    try {
        const courseenrollments = await prisma.course_enrollments.findMany();
        res.json(courseenrollments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch course enrollments", details: error });
    }
};

// Создать новый course enrollment
export const createcourseEnrollment = async (req: Request, res: Response) => {
    try {
        const courseenrollment = await prisma.course_enrollments.create({
            data: req.body,
        });
        res.status(201).json(courseenrollment);
    } catch (error) {
        res.status(500).json({ error: "Failed to create course enrollment", details: error });
    }
};

export const getcourseEnrollmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const courseenrollment = await prisma.course_enrollments.findUnique({ where: { id: parseInt(id) } });
        if (!courseenrollment) {
            return res.status(404).json({ error: "Course Enrollment not found" });
        }
        res.json(courseenrollment);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch course enrollment", details: error });
    }
};

export const updatecourseEnrollment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const courseenrollment = await prisma.course_enrollments.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(courseenrollment);
    } catch (error) {
        res.status(500).json({ error: "Failed to update course enrollment", details: error });
    }
};

export const deletecourseEnrollment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.course_enrollments.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Course Enrollment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete course enrollment", details: error });
    }
};

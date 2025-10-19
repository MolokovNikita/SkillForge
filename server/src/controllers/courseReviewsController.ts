import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех course reviews
export const getcourseReviews = async (req: Request, res: Response) => {
    try {
        const coursereviews = await prisma.course_reviews.findMany();
        res.json(coursereviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch course reviews", details: error });
    }
};

// Создать новый course review
export const createcourseReview = async (req: Request, res: Response) => {
    try {
        const coursereview = await prisma.course_reviews.create({
            data: req.body,
        });
        res.status(201).json(coursereview);
    } catch (error) {
        res.status(500).json({ error: "Failed to create course review", details: error });
    }
};

export const getcourseReviewById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const coursereview = await prisma.course_reviews.findUnique({ where: { id: parseInt(id) } });
        if (!coursereview) {
            return res.status(404).json({ error: "Course Review not found" });
        }
        res.json(coursereview);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch course review", details: error });
    }
};

export const updatecourseReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const coursereview = await prisma.course_reviews.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(coursereview);
    } catch (error) {
        res.status(500).json({ error: "Failed to update course review", details: error });
    }
};

export const deletecourseReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.course_reviews.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Course Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete course review", details: error });
    }
};

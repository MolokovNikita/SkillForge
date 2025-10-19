import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех departments
export const getdepartments = async (req: Request, res: Response) => {
    try {
        const departments = await prisma.departments.findMany();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch departments", details: error });
    }
};

// Создать новый department
export const createdepartment = async (req: Request, res: Response) => {
    try {
        const department = await prisma.departments.create({
            data: req.body,
        });
        res.status(201).json(department);
    } catch (error) {
        res.status(500).json({ error: "Failed to create department", details: error });
    }
};

export const getdepartmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const department = await prisma.departments.findUnique({ where: { id: parseInt(id) } });
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        res.json(department);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch department", details: error });
    }
};

export const updatedepartment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const department = await prisma.departments.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(department);
    } catch (error) {
        res.status(500).json({ error: "Failed to update department", details: error });
    }
};

export const deletedepartment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.departments.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete department", details: error });
    }
};

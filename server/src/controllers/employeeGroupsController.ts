import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех employee groups
export const getemployeeGroups = async (req: Request, res: Response) => {
    try {
        const employeegroups = await prisma.employee_groups.findMany();
        res.json(employeegroups);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employee groups", details: error });
    }
};

// Создать новый employee group
export const createemployeeGroup = async (req: Request, res: Response) => {
    try {
        const employeegroup = await prisma.employee_groups.create({
            data: req.body,
        });
        res.status(201).json(employeegroup);
    } catch (error) {
        res.status(500).json({ error: "Failed to create employee group", details: error });
    }
};

export const getemployeeGroupById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employeegroup = await prisma.employee_groups.findUnique({ where: { id: parseInt(id) } });
        if (!employeegroup) {
            return res.status(404).json({ error: "Employee Group not found" });
        }
        res.json(employeegroup);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employee group", details: error });
    }
};

export const updateemployeeGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employeegroup = await prisma.employee_groups.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(employeegroup);
    } catch (error) {
        res.status(500).json({ error: "Failed to update employee group", details: error });
    }
};

export const deleteemployeeGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.employee_groups.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Employee Group deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete employee group", details: error });
    }
};

import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех employees
export const getemployees = async (req: Request, res: Response) => {
    try {
        const employees = await prisma.employees.findMany();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employees", details: error });
    }
};

// Создать новый employee
export const createemployee = async (req: Request, res: Response) => {
    try {
        const employee = await prisma.employees.create({
            data: req.body,
        });
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: "Failed to create employee", details: error });
    }
};

export const getemployeeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employee = await prisma.employees.findUnique({ where: { id: parseInt(id) } });
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employee", details: error });
    }
};

export const updateemployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employee = await prisma.employees.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: "Failed to update employee", details: error });
    }
};

export const deleteemployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.employees.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete employee", details: error });
    }
};

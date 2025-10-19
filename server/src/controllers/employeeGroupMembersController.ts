import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех employee group members
export const getemployeeGroupMembers = async (req: Request, res: Response) => {
    try {
        const employeegroupmembers = await prisma.employee_group_members.findMany();
        res.json(employeegroupmembers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employee group members", details: error });
    }
};

// Создать новый employee group member
export const createemployeeGroupMember = async (req: Request, res: Response) => {
    try {
        const employeegroupmember = await prisma.employee_group_members.create({
            data: req.body,
        });
        res.status(201).json(employeegroupmember);
    } catch (error) {
        res.status(500).json({ error: "Failed to create employee group member", details: error });
    }
};

export const getemployeeGroupMemberById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employeegroupmember = await prisma.employee_group_members.findUnique({ where: { id: parseInt(id) } });
        if (!employeegroupmember) {
            return res.status(404).json({ error: "Employee Group Member not found" });
        }
        res.json(employeegroupmember);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employee group member", details: error });
    }
};

export const updateemployeeGroupMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employeegroupmember = await prisma.employee_group_members.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(employeegroupmember);
    } catch (error) {
        res.status(500).json({ error: "Failed to update employee group member", details: error });
    }
};

export const deleteemployeeGroupMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.employee_group_members.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Employee Group Member deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete employee group member", details: error });
    }
};

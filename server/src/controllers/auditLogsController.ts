import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех аудит логов
export const getAuditLogs = async (req: Request, res: Response) => {
    try {
        const auditLogs = await prisma.audit_logs.findMany();
        res.json(auditLogs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch audit logs", details: error });
    }
};

// Создать новый аудит лог
export const createAuditLog = async (req: Request, res: Response) => {
    try {
        const auditLog = await prisma.audit_logs.create({
            data: req.body,
        });
        res.status(201).json(auditLog);
    } catch (error) {
        res.status(500).json({ error: "Failed to create audit log", details: error });
    }
};

export const getAuditLogById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const auditLog = await prisma.audit_logs.findUnique({ where: { id: parseInt(id) } });
        if (!auditLog) {
            return res.status(404).json({ error: "Audit log not found" });
        }
        res.json(auditLog);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch audit log", details: error });
    }
};

export const updateAuditLog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const auditLog = await prisma.audit_logs.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(auditLog);
    } catch (error) {
        res.status(500).json({ error: "Failed to update audit log", details: error });
    }
};

export const deleteAuditLog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.audit_logs.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Audit log deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete audit log", details: error });
    }
};


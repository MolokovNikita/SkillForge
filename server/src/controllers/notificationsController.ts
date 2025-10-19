import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех notifications
export const getnotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await prisma.notifications.findMany();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notifications", details: error });
    }
};

// Создать новый notification
export const createnotification = async (req: Request, res: Response) => {
    try {
        const notification = await prisma.notifications.create({
            data: req.body,
        });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: "Failed to create notification", details: error });
    }
};

export const getnotificationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notification = await prisma.notifications.findUnique({ where: { id: parseInt(id) } });
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notification", details: error });
    }
};

export const updatenotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notification = await prisma.notifications.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: "Failed to update notification", details: error });
    }
};

export const deletenotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.notifications.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete notification", details: error });
    }
};

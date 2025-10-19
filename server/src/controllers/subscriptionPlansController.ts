import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех subscription plans
export const getsubscriptionPlans = async (req: Request, res: Response) => {
    try {
        const subscriptionplans = await prisma.subscription_plans.findMany();
        res.json(subscriptionplans);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch subscription plans", details: error });
    }
};

// Создать новый subscription plan
export const createsubscriptionPlan = async (req: Request, res: Response) => {
    try {
        const subscriptionplan = await prisma.subscription_plans.create({
            data: req.body,
        });
        res.status(201).json(subscriptionplan);
    } catch (error) {
        res.status(500).json({ error: "Failed to create subscription plan", details: error });
    }
};

export const getsubscriptionPlanById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const subscriptionplan = await prisma.subscription_plans.findUnique({ where: { id: parseInt(id) } });
        if (!subscriptionplan) {
            return res.status(404).json({ error: "Subscription Plan not found" });
        }
        res.json(subscriptionplan);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch subscription plan", details: error });
    }
};

export const updatesubscriptionPlan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const subscriptionplan = await prisma.subscription_plans.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(subscriptionplan);
    } catch (error) {
        res.status(500).json({ error: "Failed to update subscription plan", details: error });
    }
};

export const deletesubscriptionPlan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.subscription_plans.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Subscription Plan deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete subscription plan", details: error });
    }
};

import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// Получить список всех сертификатов
export const getCertificates = async (req: Request, res: Response) => {
    try {
        const certificates = await prisma.certificates.findMany();
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch certificates", details: error });
    }
};

// Создать новый сертификат
export const createCertificate = async (req: Request, res: Response) => {
    try {
        const certificate = await prisma.certificates.create({
            data: req.body,
        });
        res.status(201).json(certificate);
    } catch (error) {
        res.status(500).json({ error: "Failed to create certificate", details: error });
    }
};

export const getCertificateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const certificate = await prisma.certificates.findUnique({ where: { id: parseInt(id) } });
        if (!certificate) {
            return res.status(404).json({ error: "Certificate not found" });
        }
        res.json(certificate);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch certificate", details: error });
    }
};

export const updateCertificate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const certificate = await prisma.certificates.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(certificate);
    } catch (error) {
        res.status(500).json({ error: "Failed to update certificate", details: error });
    }
};

export const deleteCertificate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.certificates.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Certificate deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete certificate", details: error });
    }
};


import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { signJwt } from "../middlewares/auth";
import bcrypt from "bcryptjs";

async function verifyPassword(hash: string, password: string) {
    return bcrypt.compare(password, hash);
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Try to find user in root_admins first
        let user = await prisma.root_admins.findUnique({ where: { email } });
        if (user && user.password_hash) {
            const ok = await verifyPassword(user.password_hash, password);
            if (ok) {
                const token = signJwt({ sub: user.id, role: "root_admin" });
                return res.json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        full_name: user.full_name
                    },
                    role: "root_admin"
                });
            }
        }

        // Try company_admins
        user = await prisma.company_admins.findUnique({ where: { email } });
        if (user && user.password_hash) {
            const ok = await verifyPassword(user.password_hash, password);
            if (ok) {
                const token = signJwt({ sub: user.id, role: "company_admin", companyId: user.company_id });
                return res.json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        full_name: user.full_name,
                        company_id: user.company_id
                    },
                    role: "company_admin"
                });
            }
        }

        // Try employees
        user = await prisma.employees.findUnique({ where: { email } });
        if (user && user.password_hash) {
            const ok = await verifyPassword(user.password_hash, password);
            if (ok) {
                const token = signJwt({ sub: user.id, role: "employee", companyId: user.company_id });
                return res.json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        full_name: user.full_name,
                        company_id: user.company_id
                    },
                    role: "employee"
                });
            }
        }

        // If no user found or password doesn't match
        return res.status(401).json({ error: "Invalid credentials" });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


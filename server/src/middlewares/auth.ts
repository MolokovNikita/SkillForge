import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as JwtStd, Secret, SignOptions } from "jsonwebtoken";

type AuthClaims = JwtStd & {
    sub: number;
    role: "root_admin" | "company_admin" | "employee";
    companyId?: number;
};

const JWT_SECRET: Secret = (process.env.JWT_SECRET as string) || "dev-secret";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid authorization header" });
    }

    const token = authHeader.slice("Bearer ".length);
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtStd | string;
        if (!decoded || typeof decoded !== "object" || !("role" in decoded)) {
            return res.status(401).json({ error: "Invalid token payload" });
        }
        (req as any).user = decoded as AuthClaims;
        next();
    } catch (e) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

export function requireRole(...roles: AuthClaims["role"][]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user as AuthClaims | undefined;
        if (!user) return res.status(401).json({ error: "Unauthorized" });
        if (!roles.includes(user.role)) return res.status(403).json({ error: "Forbidden" });
        next();
    };
}

export function signJwt(payload: AuthClaims, expiresIn: SignOptions["expiresIn"] = "7d") {
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload as object, JWT_SECRET, options);
}

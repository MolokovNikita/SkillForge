import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import mainRouter from "./routes/mainRouter";
import authRoutes from "./routes/authRoutes";

const prisma = new PrismaClient();
const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "SkillForge API is running " });
});
// Главный роутер
app.use("/api/auth", authRoutes);
app.use("/api", mainRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
});

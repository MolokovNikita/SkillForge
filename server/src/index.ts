import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import mainRouter from "./routes/mainRouter";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "SkillForge API is running " });
});
// Главный роутер
app.use("/api", mainRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
});

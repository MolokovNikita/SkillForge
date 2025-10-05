import express from "express";
import companyRoutes from "./companyRoutes";

const router = express.Router();

router.use("/companies", companyRoutes);

export default router;
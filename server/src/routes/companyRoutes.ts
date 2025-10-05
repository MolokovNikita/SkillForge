import express from "express";
import { getCompanies, createCompany, deleteCompany, getCompanyById, updateCompany } from "../controllers/companyController";

const router = express.Router();

router.get("/", getCompanies);
router.post("/", createCompany);
router.get("/:id", getCompanyById);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;

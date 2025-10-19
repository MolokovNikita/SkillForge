import express from "express";
import { 
    getdepartments, 
    createdepartment, 
    getdepartmentById, 
    updatedepartment, 
    deletedepartment 
} from "../controllers/departmentsController";

const router = express.Router();

router.get("/", getdepartments);
router.get("/:id", getdepartmentById);
router.post("/", createdepartment);
router.put("/:id", updatedepartment);
router.delete("/:id", deletedepartment);

export default router;

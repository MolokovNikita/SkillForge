import express from "express";
import { 
    getemployees, 
    createemployee, 
    getemployeeById, 
    updateemployee, 
    deleteemployee 
} from "../controllers/employeesController";

const router = express.Router();

router.get("/", getemployees);
router.get("/:id", getemployeeById);
router.post("/", createemployee);
router.put("/:id", updateemployee);
router.delete("/:id", deleteemployee);

export default router;

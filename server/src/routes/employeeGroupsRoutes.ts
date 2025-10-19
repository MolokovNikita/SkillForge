import express from "express";
import { 
    getemployeeGroups, 
    createemployeeGroup, 
    getemployeeGroupById, 
    updateemployeeGroup, 
    deleteemployeeGroup 
} from "../controllers/employeeGroupsController";

const router = express.Router();

router.get("/", getemployeeGroups);
router.get("/:id", getemployeeGroupById);
router.post("/", createemployeeGroup);
router.put("/:id", updateemployeeGroup);
router.delete("/:id", deleteemployeeGroup);

export default router;

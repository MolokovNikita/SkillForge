import express from "express";
import { 
    getemployeeGroupMembers, 
    createemployeeGroupMember, 
    getemployeeGroupMemberById, 
    updateemployeeGroupMember, 
    deleteemployeeGroupMember 
} from "../controllers/employeeGroupMembersController";

const router = express.Router();

router.get("/", getemployeeGroupMembers);
router.get("/:id", getemployeeGroupMemberById);
router.post("/", createemployeeGroupMember);
router.put("/:id", updateemployeeGroupMember);
router.delete("/:id", deleteemployeeGroupMember);

export default router;

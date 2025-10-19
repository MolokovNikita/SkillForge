import express from "express";
import { 
    getcompanyAdmins, 
    createcompanyAdmin, 
    getcompanyAdminById, 
    updatecompanyAdmin, 
    deletecompanyAdmin 
} from "../controllers/companyAdminsController";

const router = express.Router();

router.get("/", getcompanyAdmins);
router.get("/:id", getcompanyAdminById);
router.post("/", createcompanyAdmin);
router.put("/:id", updatecompanyAdmin);
router.delete("/:id", deletecompanyAdmin);

export default router;

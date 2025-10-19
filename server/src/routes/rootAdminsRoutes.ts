import express from "express";
import { 
    getrootAdmins, 
    createrootAdmin, 
    getrootAdminById, 
    updaterootAdmin, 
    deleterootAdmin 
} from "../controllers/rootAdminsController";

const router = express.Router();

router.get("/", getrootAdmins);
router.get("/:id", getrootAdminById);
router.post("/", createrootAdmin);
router.put("/:id", updaterootAdmin);
router.delete("/:id", deleterootAdmin);

export default router;

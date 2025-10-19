import express from "express";
import { 
    getnotifications, 
    createnotification, 
    getnotificationById, 
    updatenotification, 
    deletenotification 
} from "../controllers/notificationsController";

const router = express.Router();

router.get("/", getnotifications);
router.get("/:id", getnotificationById);
router.post("/", createnotification);
router.put("/:id", updatenotification);
router.delete("/:id", deletenotification);

export default router;

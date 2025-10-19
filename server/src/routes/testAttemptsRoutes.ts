import express from "express";
import { 
    gettestAttempts, 
    createtestAttempt, 
    gettestAttemptById, 
    updatetestAttempt, 
    deletetestAttempt 
} from "../controllers/testAttemptsController";

const router = express.Router();

router.get("/", gettestAttempts);
router.get("/:id", gettestAttemptById);
router.post("/", createtestAttempt);
router.put("/:id", updatetestAttempt);
router.delete("/:id", deletetestAttempt);

export default router;

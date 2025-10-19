import express from "express";
import { 
    getsubscriptionPlans, 
    createsubscriptionPlan, 
    getsubscriptionPlanById, 
    updatesubscriptionPlan, 
    deletesubscriptionPlan 
} from "../controllers/subscriptionPlansController";

const router = express.Router();

router.get("/", getsubscriptionPlans);
router.get("/:id", getsubscriptionPlanById);
router.post("/", createsubscriptionPlan);
router.put("/:id", updatesubscriptionPlan);
router.delete("/:id", deletesubscriptionPlan);

export default router;

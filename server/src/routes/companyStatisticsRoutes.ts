import express from "express";
import { 
    getcompanyStatistics, 
    createcompanyStatistic, 
    getcompanyStatisticById, 
    updatecompanyStatistic, 
    deletecompanyStatistic 
} from "../controllers/companyStatisticsController";

const router = express.Router();

router.get("/", getcompanyStatistics);
router.get("/:id", getcompanyStatisticById);
router.post("/", createcompanyStatistic);
router.put("/:id", updatecompanyStatistic);
router.delete("/:id", deletecompanyStatistic);

export default router;

import express from "express";
import { 
    getquestionOptions, 
    createquestionOption, 
    getquestionOptionById, 
    updatequestionOption, 
    deletequestionOption 
} from "../controllers/questionOptionsController";

const router = express.Router();

router.get("/", getquestionOptions);
router.get("/:id", getquestionOptionById);
router.post("/", createquestionOption);
router.put("/:id", updatequestionOption);
router.delete("/:id", deletequestionOption);

export default router;

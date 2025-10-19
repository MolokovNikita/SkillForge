import express from "express";
import { 
    gettestQuestions, 
    createtestQuestion, 
    gettestQuestionById, 
    updatetestQuestion, 
    deletetestQuestion 
} from "../controllers/testQuestionsController";

const router = express.Router();

router.get("/", gettestQuestions);
router.get("/:id", gettestQuestionById);
router.post("/", createtestQuestion);
router.put("/:id", updatetestQuestion);
router.delete("/:id", deletetestQuestion);

export default router;

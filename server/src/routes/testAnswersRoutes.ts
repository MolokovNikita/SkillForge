import express from "express";
import { 
    gettestAnswers, 
    createtestAnswer, 
    gettestAnswerById, 
    updatetestAnswer, 
    deletetestAnswer 
} from "../controllers/testAnswersController";

const router = express.Router();

router.get("/", gettestAnswers);
router.get("/:id", gettestAnswerById);
router.post("/", createtestAnswer);
router.put("/:id", updatetestAnswer);
router.delete("/:id", deletetestAnswer);

export default router;

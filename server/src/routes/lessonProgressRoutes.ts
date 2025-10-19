import express from "express";
import { 
    getlessonProgress, 
    createlessonProgres, 
    getlessonProgresById, 
    updatelessonProgres, 
    deletelessonProgres 
} from "../controllers/lessonProgressController";

const router = express.Router();

router.get("/", getlessonProgress);
router.get("/:id", getlessonProgresById);
router.post("/", createlessonProgres);
router.put("/:id", updatelessonProgres);
router.delete("/:id", deletelessonProgres);

export default router;

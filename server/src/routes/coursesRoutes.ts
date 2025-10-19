import express from "express";
import { 
    getcourses, 
    createcourse, 
    getcourseById, 
    updatecourse, 
    deletecourse 
} from "../controllers/coursesController";

const router = express.Router();

router.get("/", getcourses);
router.get("/:id", getcourseById);
router.post("/", createcourse);
router.put("/:id", updatecourse);
router.delete("/:id", deletecourse);

export default router;

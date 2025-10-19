import express from "express";
import { 
    getcourseModules, 
    createcourseModule, 
    getcourseModuleById, 
    updatecourseModule, 
    deletecourseModule 
} from "../controllers/courseModulesController";

const router = express.Router();

router.get("/", getcourseModules);
router.get("/:id", getcourseModuleById);
router.post("/", createcourseModule);
router.put("/:id", updatecourseModule);
router.delete("/:id", deletecourseModule);

export default router;

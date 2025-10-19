import express from "express";
import { 
    getcourseCategories, 
    createcourseCategorie, 
    getcourseCategorieById, 
    updatecourseCategorie, 
    deletecourseCategorie 
} from "../controllers/courseCategoriesController";

const router = express.Router();

router.get("/", getcourseCategories);
router.get("/:id", getcourseCategorieById);
router.post("/", createcourseCategorie);
router.put("/:id", updatecourseCategorie);
router.delete("/:id", deletecourseCategorie);

export default router;

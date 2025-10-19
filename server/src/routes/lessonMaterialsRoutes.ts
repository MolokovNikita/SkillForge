import express from "express";
import { 
    getlessonMaterials, 
    createlessonMaterial, 
    getlessonMaterialById, 
    updatelessonMaterial, 
    deletelessonMaterial 
} from "../controllers/lessonMaterialsController";

const router = express.Router();

router.get("/", getlessonMaterials);
router.get("/:id", getlessonMaterialById);
router.post("/", createlessonMaterial);
router.put("/:id", updatelessonMaterial);
router.delete("/:id", deletelessonMaterial);

export default router;

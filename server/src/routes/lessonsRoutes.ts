import express from "express";
import { 
    getlessons, 
    createlesson, 
    getlessonById, 
    updatelesson, 
    deletelesson 
} from "../controllers/lessonsController";

const router = express.Router();

router.get("/", getlessons);
router.get("/:id", getlessonById);
router.post("/", createlesson);
router.put("/:id", updatelesson);
router.delete("/:id", deletelesson);

export default router;

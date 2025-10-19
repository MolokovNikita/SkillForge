import express from "express";
import { 
    gettests, 
    createtest, 
    gettestById, 
    updatetest, 
    deletetest 
} from "../controllers/testsController";

const router = express.Router();

router.get("/", gettests);
router.get("/:id", gettestById);
router.post("/", createtest);
router.put("/:id", updatetest);
router.delete("/:id", deletetest);

export default router;

import express from "express";
import { 
    getcourseEnrollments, 
    createcourseEnrollment, 
    getcourseEnrollmentById, 
    updatecourseEnrollment, 
    deletecourseEnrollment 
} from "../controllers/courseEnrollmentsController";

const router = express.Router();

router.get("/", getcourseEnrollments);
router.get("/:id", getcourseEnrollmentById);
router.post("/", createcourseEnrollment);
router.put("/:id", updatecourseEnrollment);
router.delete("/:id", deletecourseEnrollment);

export default router;

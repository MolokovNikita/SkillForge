import express from "express";
import { 
    getcourseReviews, 
    createcourseReview, 
    getcourseReviewById, 
    updatecourseReview, 
    deletecourseReview 
} from "../controllers/courseReviewsController";

const router = express.Router();

router.get("/", getcourseReviews);
router.get("/:id", getcourseReviewById);
router.post("/", createcourseReview);
router.put("/:id", updatecourseReview);
router.delete("/:id", deletecourseReview);

export default router;

import express from "express";
import {
    getAuditLogs,
    createAuditLog,
    getAuditLogById,
    updateAuditLog,
    deleteAuditLog
} from "../controllers/auditLogsController";

const router = express.Router();

router.get("/", getAuditLogs);
router.get("/:id", getAuditLogById);
router.post("/", createAuditLog);
router.put("/:id", updateAuditLog);
router.delete("/:id", deleteAuditLog);

export default router;


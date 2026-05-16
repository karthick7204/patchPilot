import { Router } from "express";
import { getIssues, createIssue } from "../controller/issueController.js";
import { authMiddleware } from "../services/authMiddleware.js";
const router = Router();
// Protected routes to manage issues
router.get("/", authMiddleware, getIssues);
router.post("/", authMiddleware, createIssue);
export default router;
//# sourceMappingURL=issueRoute.js.map
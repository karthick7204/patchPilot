import { Router } from "express";
import { signup, login, updateSettings } from "../controller/authController.js";
import { authMiddleware } from "../services/authMiddleware.js";
const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.put("/settings", authMiddleware, updateSettings);
export default router;
//# sourceMappingURL=authRoute.js.map
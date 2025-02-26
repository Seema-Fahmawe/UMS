import { Router } from "express";
import * as authController from "./auth.controller.js";
import validation from "../../middleware/validation.js";
import { registerSchema } from "./auth.validation.js";
const router = Router();
router.post("/register", validation(registerSchema), authController.register);
router.post("/login", authController.login);
export default router;

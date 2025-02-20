import { Router } from "express";
import * as userController from "./user.controller.js";
const router = Router();
router.get("/", userController.getAllUsers);
router.delete("/:userId", userController.deleteUser);
export default router;

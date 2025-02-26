import { Router } from "express";
import * as userController from "./user.controller.js";
import auth from "../../middleware/auth.middleware.js";
import fileUpload from "../../utils/multer.js";
const router = Router();
router.get("/", auth(), userController.getAllUsers);
router.delete("/:userId", auth(), userController.deleteUser);
router.put(
  "/profilePic",
  fileUpload().single("image"),
  auth(),
  userController.profilePic
);
export default router;

import { Router } from "express";
import * as userController from "./user.controller.js";
import auth from "../../middleware/auth.middleware.js";
import fileUpload from "../../utils/multer.js";
import validation from "../../middleware/validation.js";
import * as validator from "./user.validation.js";
const router = Router();
router.get("/", auth(), userController.getAllUsers);
router.delete(
  "/:userId",
  auth(),
  validation(validator.deleteUser),
  userController.deleteUser
);
router.put(
  "/profilePic",
  fileUpload().single("image"),
  auth(),
  userController.profilePic
);
export default router;

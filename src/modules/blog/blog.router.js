import { Router } from "express";
import * as blogController from "./blog.controller.js";
import auth from "../../middleware/auth.middleware.js";
import validation from "../../middleware/validation.js";
import * as validator from "./blog.validation.js";
const router = Router();
router.post(
  "/",
  auth(),
  validation(validator.createBlog),
  blogController.createBlog
);
router.get("/", blogController.getAllBlogs);

router.get(
  "/:blogId",
  validation(validator.getSpecificBlog),
  blogController.getSpecificBlog
);

router.delete(
  "/:blogId",
  validation(validator.deleteBlog),
  auth(),
  blogController.deleteBlog
);

router.put(
  "/:blogId",
  auth(),
  validation(validator.updateBlog),
  blogController.updateBlog
);
export default router;

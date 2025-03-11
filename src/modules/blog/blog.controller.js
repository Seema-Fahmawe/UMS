import { request } from "express";
import blogModel from "../../../DB/models/blog.model.js";
import AppError from "../../utils/AppError.js";
import asyncHandler from "../../utils/catchError.js";
import userModel from "../../../DB/models/user.model.js";

export const createBlog = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const blogfound = await blogModel.findOne({ where: { title } });
  if (blogfound) {
    return next(new AppError("Blog with the same title already exists", 402)); // 409 Conflict status code.
  }
  const blog = await blogModel.create({ title, description, UserId: req.id });

  return res.status(201).json({ message: "Blog created successfully", blog });
});

export const getAllBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await blogModel.findAll({
    include: [{ model: userModel, attributes: ["id", "userName"], as: "User" }],
  });
  if (blogs.length === 0) {
    return next(new AppError("No blogs found", 404));
  }
  return res.status(200).json({ message: "success", blogs });
});

export const getSpecificBlog = asyncHandler(async (req, res, next) => {
  const { blogId } = req.params;
  const blog = await blogModel.findByPk(blogId, {
    include: [{ model: userModel, attributes: ["id", "userName"], as: "User" }],
  });
  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }
  return res.status(200).json({ message: "success", blog });
});

export const deleteBlog = asyncHandler(async (req, res, next) => {
  const { blogId } = req.params;
  const blog = await blogModel.findByPk(blogId);
  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }
  await blog.destroy();
  return res.status(200).json({ message: "Blog deleted successfully" });
});

export const updateBlog = asyncHandler(async (req, res, next) => {
  const { blogId } = req.params;
  const { title, description } = req.body;
  const blog = await blogModel.findByPk(blogId);
  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }
  if (title) blog.title = title;
  else if (description) blog.description = description;
  await blog.save();
  return res.status(200).json({ message: "Blog updated successfully", blog });
});

import userModel from "../../../DB/models/user.model.js";
import AppError from "../../utils/AppError.js";
import asyncHandler from "../../utils/catchError.js";
import cloudinary from "../../utils/cloudinary.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.findAll();
  if (users.length === 0) {
    return next(new AppError(`no users found `, 401));
  }
  return res.status(200).json({ message: "success", users });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const user = await userModel.findByPk(userId);
  if (user == null) {
    return next(new AppError(`User does not exist`, 404));
  }
  await user.destroy();
  return res.status(200).json({ message: "success" });
});

export const profilePic = asyncHandler(async (req, res, next) => {
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `UMS` }
  );

  return res.status(200).json({ message: "success" });
});

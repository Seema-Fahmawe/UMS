import bcrypt from "bcrypt";
import userModel from "../../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js";
import asyncHandler from "../../utils/catchError.js";
import AppError from "../../utils/AppError.js";

export const register = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 8);
  if (await userModel.findOne({ where: { email } })) {
    return next(new AppError(`User ${userName} already exists`, 401));
  }
  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
  });
  const html = `<div>wlcome ${userName}</div>`;
  await sendEmail(email, "hello", html);
  return res.status(201).json({ message: "success", user });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ where: { email } });
  if (user == null) {
    return next(new AppError(`invalid data`, 404));
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return next(new AppError(`invalid data`, 401));
  }
  const token = jwt.sign(
    { id: user.id, userName: user.userName, role: user.role },
    "Seema123"
  );
  return res.status(200).json({ message: "success", token });
});

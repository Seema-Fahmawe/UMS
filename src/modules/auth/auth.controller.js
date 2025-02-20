import bcrypt from "bcrypt";
import userModel from "../../../DB/models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { userName, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 8);
  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
  });
  return res.status(201).json({ message: "success", user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ where: { email } });
  if (user == null) {
    return res.status(404).json({ message: "invalid email" });
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "invalid password" });
  }
  const token = jwt.sign({ id: user.id, userName: user.userName ,role:user.role}, "Seema123");
  return res.status(201).json({ message: "success", token });
};

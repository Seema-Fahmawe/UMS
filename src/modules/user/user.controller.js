import userModel from "../../../DB/models/user.model.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const decoded = jwt.verify(token, "Seema123");
  if (decoded?.role != "Admin") {
    return res.status(403).json({ message: "not authorized" });
  }
  const users = await userModel.findAll();
  if (users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.json({ message: "success", users });
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const decoded = jwt.verify(token, "Seema123");
  if (decoded?.role != "Admin") {
    return res.status(403).json({ message: "not authorized" });
  }
  const user = await userModel.findByPk(userId);
  if (user == null) {
    return res.status(404).json({ message: "User not found" });
  }
  await user.destroy();
  return res.json({ message: "success" });
};

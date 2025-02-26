import jwt from "jsonwebtoken";
import asyncHandler from "../utils/catchError.js";
import AppError from "../utils/AppError.js";

const auth = () => {
  return asyncHandler(async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return next(new AppError(`unauthenticated token`, 401));
    }
    const decoded = jwt.verify(token, "Seema123");
    if (decoded?.role != "Admin") {
      return next(new AppError(`not authorized`, 403));
    }
    next();
  });
};

export default auth;

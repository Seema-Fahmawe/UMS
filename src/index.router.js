import connectDB from "../DB/connection.js";
import userRouter from "./modules/user/user.router.js";
import authRouter from "./modules/auth/auth.router.js";
const initApp = (app, express) => {
  connectDB();
  app.use(express.json());
  app.use("/users", userRouter);
  app.use("/auth", authRouter);
};
export default initApp;

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("ums", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

const connectDB = async () => {
  return await sequelize
    .sync()
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.error("Error connecting to the database", err);
    });
};

export default connectDB;

import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const userModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role:{
      type:DataTypes.ENUM('User','Admin'),
      defaultValue:'User',
      allowNull:false
    }
  },
  {
    timestamps: true,
  }
);

export default userModel;

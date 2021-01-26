import { Sequelize } from "sequelize";
import sequelize from "../loaders/db";

const { Model, DataTypes } = Sequelize;

class Vehicle extends Model {}

Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    registrationNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    vehicleNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    vehicleType: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    localization: DataTypes.STRING,
    workerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    semiTrailerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "vehicle",
  }
);

export default Vehicle;

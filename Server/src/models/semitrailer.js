import { Sequelize } from "sequelize";
import sequelize from "../loaders/db.js";

const { Model, DataTypes } = Sequelize;

class Semitrailer extends Model {}

Semitrailer.init(
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
      validate: {
        notEmpty: {
          arg: true,
          msg: "RegistrationNumber can not be empty",
        },
      },
    },
    semiTrailerType: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        notEmpty: {
          arg: true,
          msg: "semiTrailerType can not be empty",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "SemiTrailer",
  }
);

export default Semitrailer;

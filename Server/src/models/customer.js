import { Sequelize } from "sequelize";
import sequelize from "../loaders/db";

const { Model, DataTypes } = Sequelize;

class Customer extends Model {}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          arg: true,
          msg: "CompanyName can not be empty",
        },
      },
    },
    companyAddress: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          arg: true,
          msg: "CompanyAddress can not be empty",
        },
      },
    },
    companyPhone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          arg: true,
          msg: "CompanyPhone can not be empty",
        },
        isNumeric: {
          arg: true,
          msg: "CompanyPhone must be numeric",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Customer",
  }
);
export default Customer;

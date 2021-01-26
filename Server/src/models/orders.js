import { Sequelize } from "sequelize";
import sequelize from "../loaders/db";

const { Model, DataTypes } = Sequelize;
class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    workerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          arg: true,
          msg: "WorkerId can not be empty",
        },
        isNumeric: {
          arg: true,
          msg: "WorkerId must be numeric",
        },
      },
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          arg: true,
          msg: "WorkerId can not be empty",
        },
        isNumeric: {
          arg: true,
          msg: "WorkerId must be numeric",
        },
      },
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        notEmpty: {
          arg: true,
          msg: "WorkerId can not be empty",
        },
      },
    },
    vehicle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          arg: true,
          msg: "WorkerId can not be empty",
        },
        isNumeric: {
          arg: true,
          msg: "WorkerId must be numeric",
        },
      },
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          arg: true,
          msg: "WorkerId can not be empty",
        },
        isNumeric: {
          arg: true,
          msg: "WorkerId must be numeric",
        },
      },
    },
    loadingPlace: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        notEmpty: {
          arg: true,
          msg: "WorkerId can not be empty",
        },
      },
    },
    unloadingPlace: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        notEmpty: {
          arg: true,
          msg: "WorkerId can not be empty",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Order",
  }
);

export default Order;

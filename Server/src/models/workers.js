import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";

import sequelize from "../loaders/db";

const { Model, DataTypes } = Sequelize;

class Worker extends Model {
  get fullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}
Worker.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password can not be null",
        },
        len: {
          args: [8, 255],
          msg: "Length of password must be min 8 chars",
        },
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
          msg:
            "The password must contain at least 8 characters including at least 1 uppercase, 1 lowercase and one digit",
        },
      },
    },
    firstname: { type: DataTypes.STRING, allowNull: false, trim: true },
    lastname: { type: DataTypes.STRING, allowNull: false, trim: true },
    role: { type: DataTypes.INTEGER, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          arg: true,
          msg: "Not be empty",
        },
        isEmail: {
          arg: true,
          msg: "Must be in email format foo@bar.com",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "worker",
    hooks: {
      beforeCreate: (worker) => {
        worker.password = bcrypt.hashSync(worker.password, 10);
      },
      beforeUpdate: (worker) => {
        worker.password = bcrypt.hashSync(worker.password, 10);
      },
    },
  }
);

export default Worker;

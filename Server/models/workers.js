const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/custom-environment-variables.json');
module.exports = (sequelize, DataTypes) => {
  const Worker = sequelize.define('Worker', {
    id: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, allowNull:false},
    username: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false,
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args:true,
          msg: 'Password can not be null',
        },
        len:{
          args: [8,255],
          msg: 'Length of password must be min 8 chars'
        },
        is: {
          args:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
          msg: 'The password must contain at least 8 characters including at least 1 uppercase, 1 lowercase and one digit'
        }
      },
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    role: DataTypes.INTEGER,
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          arg: true,
          msg: 'Not be empty'
        },
        isEmail: {
          arg:true,
          msg:'Must be in email format foo@bar.com'
        },
      }
      },
  }, {
    hooks: {
      beforeCreate: function (worker) {
        worker.password = bcrypt.hashSync(worker.password,10);
      },
      beforeUpdate: function (worker) {
        worker.password = bcrypt.hashSync(worker.password,10);
      }
    }
  });
  Worker.associate = function(models) {
    // associations can be defined here
    Worker.hasMany(models.Order, {
      foreignKey: 'workerId',
      as: 'orders'
    });
    Worker.hasOne(models.Vehicle, {
      foreignKey: 'workerId',
      as: 'vehicle'
    });
  };
  Worker.prototype.generateAuthToken = function () {
    const token = jwt.sign({ id: this.id, role:this.role}, config.jwtPrivateKey);
    console.log(token);
    return token;
  };
  return Worker;
};


'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    companyName: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          arg:true,
          msg:'C"ompanyName can not be empty'
        }
      }
    } ,
    companyAddress:  {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          arg:true,
          msg:'CompanyAddress can not be empty'
        }
      }
    },
    companyPhone: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          arg:true,
          msg:'CompanyPhone can not be empty'
        },
        isNumeric: {
          arg:true,
          msg:'CompanyPhone must be numeric',
        }
      }
    }
  }, {});
  Customer.associate = function(models) {
    Customer.hasMany(models.Order, {
      foreignKey: 'customerId',
      as: 'order',
    });
  };
  return Customer;
};
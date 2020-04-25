'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    workerId: DataTypes.INTEGER,
    orderNumber: DataTypes.INTEGER,
    cargo: DataTypes.STRING,
    vehicle: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    loadingPlace: DataTypes.STRING,
    unloadingPlace: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.Worker, {
      foreignKey: 'workerId',
      as:'worker'
    });
    Order.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer',
    });
  };
  return Order;
};
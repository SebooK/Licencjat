'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    registrationNumber: DataTypes.STRING,
    vehicleNumber: DataTypes.STRING,
    vehicleType: DataTypes.STRING,
    localization: DataTypes.STRING,
    workerId: DataTypes.INTEGER
  }, {});
  Vehicle.associate = function(models) {
    Vehicle.hasOne(models.SemiTrailer, {
      foreignKey: 'vehicleId',
      as: 'semiTrailer'
    });
    Vehicle.belongsTo(models.Worker, {
      foreignKey: 'workerId',
      as: 'worker'
    })
  };
  return Vehicle;
};
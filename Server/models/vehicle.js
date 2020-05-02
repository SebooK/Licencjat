'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    registrationNumber: DataTypes.STRING,
    vehicleNumber: DataTypes.STRING,
    vehicleType: DataTypes.STRING,
    localization: DataTypes.STRING,
    workerId: DataTypes.INTEGER,
    semiTrailerId:DataTypes.INTEGER
  }, {});
  Vehicle.associate = function(models) {
    Vehicle.belongsTo(models.SemiTrailer, {
      foreignKey: 'semiTrailerId',
      as:'semiTrailer',
      allowNull:false
    });
    Vehicle.belongsTo(models.Worker, {
      foreignKey: 'workerId',
      as: 'worker'
    })
  };
  return Vehicle;
};
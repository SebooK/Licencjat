'use strict';
module.exports = (sequelize, DataTypes) => {
  const SemiTrailer = sequelize.define('SemiTrailer', {
    vehicleId: DataTypes.INTEGER,
    registrationNumber: DataTypes.STRING,
    semiTrailerType: DataTypes.STRING
  }, {});
  SemiTrailer.associate = function(models) {
    SemiTrailer.belongsTo(models.Vehicle, {
      foreignKey: 'vehicleId',
      as: 'vehicle'
    });
  };
  return SemiTrailer;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const SemiTrailer = sequelize.define('SemiTrailer', {
    registrationNumber: DataTypes.STRING,
    semiTrailerType: DataTypes.STRING
  }, {});
  SemiTrailer.associate = function(models) {
    SemiTrailer.hasOne(models.Vehicle, {
      foreignKey: 'semiTrailerId',
      as: 'vehicle'
    });
  };
  return SemiTrailer;
};
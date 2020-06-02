'use strict';
module.exports = (sequelize, DataTypes) => {
    const SemiTrailer = sequelize.define('SemiTrailer', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        registrationNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true,
            validate: {
                notEmpty: {
                    arg:true,
                    msg:'RegistrationNumber can not be empty'
                }
            }
        },
        semiTrailerType: {
            type: DataTypes.STRING,
            allowNull: false,
            trim:true,
            validate: {
                notEmpty: {
                    arg:true,
                    msg:'semiTrailerType can not be empty'
                }
            }
        }
    }, {});
    SemiTrailer.associate = function (models) {
        SemiTrailer.hasOne(models.Vehicle, {
            foreignKey: 'semiTrailerId',
            as: 'vehicle'
        });
    };
    return SemiTrailer;
};

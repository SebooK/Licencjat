'use strict';
module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        registrationNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true
        },
        vehicleNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true
        },
        vehicleType: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true
        },
        localization: DataTypes.STRING,
        workerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        semiTrailerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});
    Vehicle.associate = function (models) {
        Vehicle.belongsTo(models.SemiTrailer, {
            foreignKey: 'semiTrailerId',
            as: 'semiTrailer',
            allowNull: false
        });
        Vehicle.belongsTo(models.Worker, {
            foreignKey: 'workerId',
            as: 'worker'
        })
    };
    return Vehicle;
};

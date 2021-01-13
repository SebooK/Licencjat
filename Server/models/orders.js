import {Sequelize} from 'sequelize';
const {Model,DataTypes} = Sequelize
import {sequelize} from '../db/dbConnection.js'
class Order extends Model {
}

Order.init({
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        workerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    arg: true,
                    msg: 'WorkerId can not be empty'
                },
                isNumeric: {
                    arg: true,
                    msg: 'WorkerId must be numeric'
                }
            }
        },
        orderNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    arg: true,
                    msg: 'WorkerId can not be empty'
                },
                isNumeric: {
                    arg: true,
                    msg: 'WorkerId must be numeric'
                }
            }
        },
        cargo: {
            type: Sequelize.STRING,
            allowNull: false,
            trim: true,
            validate: {
                notEmpty: {
                    arg: true,
                    msg: 'WorkerId can not be empty'
                }
            }
        },
        vehicle: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    arg: true,
                    msg: 'WorkerId can not be empty'
                },
                isNumeric: {
                    arg: true,
                    msg: 'WorkerId must be numeric'
                }
            }
        },
        customerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    arg: true,
                    msg: 'WorkerId can not be empty'
                },
                isNumeric: {
                    arg: true,
                    msg: 'WorkerId must be numeric'
                }
            }
        },
        loadingPlace: {
            type: Sequelize.STRING,
            allowNull: false,
            trim: true,
            validate: {
                notEmpty: {
                    arg: true,
                    msg: 'WorkerId can not be empty'
                },
            }
        },
        unloadingPlace: {
            type: Sequelize.STRING,
            allowNull: false,
            trim: true,
            validate: {
                notEmpty: {
                    arg: true,
                    msg: 'WorkerId can not be empty'
                },
            }
        }
    }, {
        sequelize,
        modelName: 'Order'
    }
)

export default Order;

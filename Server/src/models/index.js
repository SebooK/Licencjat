import Worker from './workers.js';
import Vehicle from './vehicle.js';
import Order from "./orders.js";
import Customer from "./customer.js";
import SemiTrailer from "./semitrailer.js"

Worker.hasOne(Vehicle);
Worker.hasMany(Order, {
    foreignKey: 'workerId',
    as: 'orders'
});
Vehicle.belongsTo(Worker, {
    foreignKey: 'workerId',
    as: 'worker'
});
Vehicle.belongsTo(SemiTrailer, {
    foreignKey: 'semiTrailerId',
    as: 'semiTrailer',
    allowNull: false
});

Order.belongsTo(Worker, {
    foreignKey: 'workerId',
    as: 'worker'
});
Order.belongsTo(Customer, {
    foreignKey: 'customerId',
    as: 'customer',
});

Customer.hasMany(Order, {
    foreignKey: 'customerId',
    as: 'order',
});

SemiTrailer.hasOne(Vehicle, {
    foreignKey: 'semiTrailerId',
    as: 'vehicle'
});

export {Worker, Vehicle, Order, Customer, SemiTrailer}

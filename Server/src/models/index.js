import Worker from "./workers";
import Vehicle from "./vehicle";
import Order from "./orders";
import Customer from "./customer";
import SemiTrailer from "./semitrailer";

Worker.hasOne(Vehicle);
Worker.hasMany(Order, {
  foreignKey: "workerId",
  as: "orders",
});
Vehicle.belongsTo(Worker, {
  foreignKey: "workerId",
  as: "worker",
});
Vehicle.belongsTo(SemiTrailer, {
  foreignKey: "semiTrailerId",
  as: "semiTrailer",
  allowNull: false,
});

Order.belongsTo(Worker, {
  foreignKey: "workerId",
  as: "worker",
});
Order.belongsTo(Customer, {
  foreignKey: "customerId",
  as: "customer",
});

Customer.hasMany(Order, {
  foreignKey: "customerId",
  as: "order",
});

SemiTrailer.hasOne(Vehicle, {
  foreignKey: "semiTrailerId",
  as: "vehicle",
});

export { Worker, Vehicle, Order, Customer, SemiTrailer };

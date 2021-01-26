import Order from "../models/orders";
import Customer from "../models/customer";
import Worker from "../models/workers";

export default class OrderService {
  static async getOrder(id) {
    return Order.findByPk(id);
  }

  static async getOrders() {
    return Order.findAndCountAll({
      include: [
        {
          model: Customer,
          as: "customer",
        },
        {
          model: Worker,
          as: "worker",
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [{ model: Customer, as: "customer" }, "createdAt", "DESC"],
      ],
    });
  }

  static async createOrder(orderData) {
    const { orderNumber } = orderData;
    const [order, created] = Order.findOrCreate({
      where: { orderNumber },
      defaults: orderData,
    });

    if (created === true) {
      return order;
    }
    throw new Error("Order already exists with orderNumber");
  }

  static async updateOrder(orderData) {
    const { body, params } = orderData;
    const { orderNumber } = body;
    const result = Order.findOne({ where: orderNumber });
    if (!result) {
      const order = Order.findByPk(params.id);
      order.update();
      return order;
    }
    throw new Error("Order already exists with orderNumber");
  }

  static async deleteOrder(orderData) {
    const order = await Order.findByPk(orderData);
    if (order) {
      order.destroy();
      return order.orderNumber;
    }
    throw new Error("Order not found");
  }
}

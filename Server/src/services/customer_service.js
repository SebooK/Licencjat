import Customer from "../models/customer";
import Order from "../models/orders";

export default class CustomerService {
  static async getCustomer(id) {
    return Customer.findByPk(id);
  }

  static async getCustomers() {
    return Customer.findAndCountAll({
      include: [
        {
          model: Order,
          as: "order",
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [{ model: Order, as: "order" }, "createdAt", "DESC"],
      ],
    });
  }

  static async createCustomer(customerData) {
    const { companyName } = customerData;
    const [customer, created] = Customer.findOrCreate({
      where: { companyName },
      defaults: customerData,
    });

    if (created === true) {
      return { customer };
    }
    throw new Error("Customer already exists with companyName");
  }

  static async updateCustomer(customerData) {
    const { body, params } = customerData;
    const { companyName } = body;

    const result = await Customer.findOne({
      where: { companyName },
    });

    if (!result) {
      const customer = await Customer.findByPk(params.id);
      customer.update(body);
      return customer;
    }
    throw new Error("Customer already exists with companyName");
  }

  static async deleteCustomer(customerData) {
    const customer = await Customer.findByPk(customerData);
    if (customer) {
      customer.destroy();
      return customer.companyName;
    }
    throw new Error("Customer not found");
  }
}

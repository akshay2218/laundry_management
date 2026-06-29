const Order = require("./order.model");
const Customer = require("../customers/customer.model");
const Address = require("../customers/address.model");

class OrderService {

  async getDashboardOrders(filters = {}) {

    const query = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.customerId) {
      query.customerId = filters.customerId;
    }

    return Order.find(query)
      .populate("customerId")
      .populate("addressId")
      .populate("assignedDeliveryPersonId")
      .populate("invoiceId")
      .sort({
        createdAt: -1
      });
  }

  async getOrder(id) {
    return Order.findById(id)
      .populate("customerId")
      .populate("addressId")
      .populate("assignedDeliveryPersonId");
  }

  async getCustomer(customerId) {
    return Customer.findById(customerId);
  }

  async getCustomerAddresses(customerId) {
    return Address.find({
      customerId
    });
  }

  async createOrder(data, userId) {

    const orderNumber =
      `ORD${Date.now()}`;

    return Order.create({
      ...data,

      orderNumber,

      status: "NEW",

      statusHistory: [
        {
          status: "NEW",
          changedBy: userId
        }
      ]
    });
  }

  async updateStatus(
    orderId,
    status,
    user
  ) {

    const order =
      await Order.findById(
        orderId
      );

    order.status = status;

    order.statusHistory.push({
      status,
      changedBy: user.userId,
      changedByName: user.name
    });

    return order.save();
  }

  async assignDelivery(
    orderId,
    deliveryPersonId,
    userId
  ) {

    const order =
      await Order.findById(
        orderId
      );

    order.assignedDeliveryPersonId =
      deliveryPersonId;

    order.status =
      "ASSIGNED";

    order.statusHistory.push({
      status:
        "ASSIGNED",

      changedBy:
        userId
    });

    return order.save();
  }
}

module.exports =
  new OrderService();
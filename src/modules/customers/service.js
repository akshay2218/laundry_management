const Customer = require("./customer.model");
const Address = require("./address.model");

class CustomerService {
  async getCustomers(filters = {}) {
    const query = {};

    if (filters.phone) {
      query.phone = {
        $regex: filters.phone,
        $options: "i"
      };
    }

    if (filters.name) {
      query.name = {
        $regex: filters.name,
        $options: "i"
      };
    }

    return Customer.find(query)
      .sort({ createdAt: -1 })
  }

  async getById(id) {
    return Customer.findById(id);
  }

  async create(data) {
    return Customer.create(data);
  }

  async update(id, data) {
    return Customer.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    );
  }

  async getAddresses(customerId) {
    return Address.find({
      customerId
    });
  }

  async createAddress(data) {
    return Address.create(data);
  }

  async deleteAddress(id) {
    return Address.findByIdAndDelete(id);
  }
}

module.exports =
  new CustomerService();
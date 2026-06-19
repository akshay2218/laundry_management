const PriceItem =
  require("./priceItem.model");

const Service =
  require("./service.model");

class PricingService {

  async getServices() {
    return Service.find()
      .sort({
        name: 1
      });
  }

  async getPriceItems(
    serviceId
  ) {

    const query = {};

    if (serviceId) {
      query.serviceId =
        serviceId;
    }

    return PriceItem.find(
      query
    )
      .populate(
        "serviceId"
      );
  }

  async getItem(id) {
    return PriceItem.findById(
      id
    );
  }

  async create(data) {
    return PriceItem.create(
      data
    );
  }

  async update(
    id,
    data
  ) {

    return PriceItem.findByIdAndUpdate(
      id,
      data,
      {
        new: true
      }
    );
  }
}

module.exports =
  new PricingService();
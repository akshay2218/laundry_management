const service =
  require("./service");

class PricingController {

  async index(
    req,
    res,
    next
  ) {

    try {

      const services =
        await service.getServices();

      const priceItems =
        await service.getPriceItems(
          req.query.service
        );

      res.render(
        "pricing/index",
        {
          title:
            "Pricing Management",

          services,

          priceItems,

          selectedService:
            services.find(
              s =>
                s._id.toString() ===
                req.query.service
            )
        }
      );

    } catch (err) {
      next(err);
    }
  }

  async createPage(
    req,
    res
  ) {

    const services =
      await service.getServices();

    res.render(
      "pricing/create-item",
      {
        title:
          "Add Price Item",

        services
      }
    );
  }

  async create(
    req,
    res,
    next
  ) {

    try {

      await service.create(
        req.body
      );

      res.redirect(
        "/pricing"
      );

    } catch (err) {
      next(err);
    }
  }

  async editPage(
    req,
    res,
    next
  ) {

    try {

      const item =
        await service.getItem(
          req.params.id
        );

      res.render(
        "pricing/edit-item",
        {
          title:
            "Edit Price Item",

          item
        }
      );

    } catch (err) {
      next(err);
    }
  }

  async update(
    req,
    res,
    next
  ) {

    try {

      await service.update(
        req.params.id,
        req.body
      );

      res.redirect(
        "/pricing"
      );

    } catch (err) {
      next(err);
    }
  }
}

module.exports =
  new PricingController();
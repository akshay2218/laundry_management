const service =
  require("./service");

class CouponController {

  async index(
    req,
    res
  ) {

    const coupons =
      await service.getAll();

    res.render(
      "coupons/index",
      {
        title:
          "Coupons",

        coupons
      }
    );
  }

  createPage(
    req,
    res
  ) {

    res.render(
      "coupons/create",
      {
        title:
          "Create Coupon",

        services: []
      }
    );
  }

  preview(
    req,
    res
  ) {

    res.render(
      "coupons/preview",
      {
        title:
          "Coupon Preview",

        coupon:
          req.body
      }
    );
  }

  async create(
    req,
    res
  ) {

    await service.create(
      req.body
    );

    res.redirect(
      "/coupons"
    );
  }
}

module.exports =
  new CouponController();
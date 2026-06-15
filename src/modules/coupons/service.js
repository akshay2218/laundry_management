const Coupon =
  require("./coupon.model");

class CouponService {

  async getAll() {
    return Coupon.find()
      .sort({
        createdAt: -1
      });
  }

  async create(data) {
    return Coupon.create(
      data
    );
  }
}

module.exports =
  new CouponService();
const Invoice =
  require("./invoice.model");

const Order =
  require("../orders/order.model");

const Coupon =
  require("../coupons/coupon.model");

const Settings =
  require("../settings/settings.model");

const PriceItem =
  require("../pricing/priceItem.model");

class InvoiceService {

  async getOrder(orderId) {
    return Order.findById(orderId)
      .populate("customerId")
      .populate("addressId");
  }

  async getPriceItems(
    serviceId,
    category
  ) {

    const query = {
      isActive: true
    };

    if (serviceId) {
      query.serviceId =
        serviceId;
    }

    if (category) {
      query.category =
        category;
    }

    return PriceItem.find(query);
  }

  async getCoupon(code) {

    if (!code) {
      return null;
    }

    return Coupon.findOne({
      code,
      isActive: true
    });
  }

  async calculateInvoice(
    payload
  ) {

    const settings =
      await Settings.findOne();

    const gstRate =
      settings?.gstPercentage ||
      18;

    let subtotal = 0;

    payload.items.forEach(
      item => {

        subtotal +=
          item.quantity *
          item.rate;
      }
    );

    let discount = 0;

    if (
      payload.couponCode
    ) {

      const coupon =
        await this.getCoupon(
          payload.couponCode
        );

      if (coupon) {

        if (
          coupon.discountType ===
          "PERCENTAGE"
        ) {

          discount =
            (
              subtotal *
              coupon.discountValue
            ) /
            100;

        } else {

          discount =
            coupon.discountValue;
        }
      }
    }

    const taxableAmount =
      subtotal - discount;

    const gstAmount =
      (
        taxableAmount *
        gstRate
      ) / 100;

    const finalAmount =
      taxableAmount +
      gstAmount +
      (
        payload.deliveryCharge ||
        0
      ) +
      (
        payload.expressCharge ||
        0
      );

    return {

      subtotal,

      discount,

      taxableAmount,

      gstAmount,

      finalAmount
    };
  }

  async generateInvoice(
    payload
  ) {

    const totals =
      await this.calculateInvoice(
        payload
      );

    const invoiceNumber =
      `INV${Date.now()}`;

    return Invoice.create({

      invoiceNumber,

      orderId:
        payload.orderId,

      items:
        payload.items,

      couponCode:
        payload.couponCode,

      deliveryCharge:
        payload.deliveryCharge ||
        0,

      expressCharge:
        payload.expressCharge ||
        0,

      generatedAt:
        new Date(),

      isFinalized: true,

      ...totals
    });
  }

  async getInvoice(id) {

    return Invoice.findById(id)
      .populate({
        path: "orderId",
        populate: {
          path:
            "customerId"
        }
      });
  }
}

module.exports =
  new InvoiceService();
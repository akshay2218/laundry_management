const Invoice =
  require("../invoices/invoice.model");

class ReportsService {

  async getStats() {

    const invoices =
      await Invoice.find();

    const revenue =
      invoices.reduce(
        (
          total,
          invoice
        ) =>
          total +
          invoice.finalAmount,
        0
      );

    const gst =
      invoices.reduce(
        (
          total,
          invoice
        ) =>
          total +
          invoice.gstAmount,
        0
      );

    return {

      totalOrders:
        invoices.length,

      revenue,

      gst,

      delivered:
        invoices.length
    };
  }

  async getGSTData() {

    return Invoice.find()
      .populate({
        path:
          "orderId",

        populate:
          {
            path:
              "customerId"
          }
      });
  }
}

module.exports =
  new ReportsService();
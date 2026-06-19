const service =
  require("./service");

class ReportsController {

  async index(
    req,
    res
  ) {

    const stats =
      await service.getStats();

    res.render(
      "reports/index",
      {
        title:
          "Reports Dashboard",

        stats
      }
    );
  }

  async gst(
    req,
    res
  ) {

    const invoices =
      await service.getGSTData();

    const summary = {

      invoiceCount:
        invoices.length,

      taxableAmount:
        invoices.reduce(
          (
            a,
            b
          ) =>
            a +
            b.taxableAmount,
          0
        ),

      gstAmount:
        invoices.reduce(
          (
            a,
            b
          ) =>
            a +
            b.gstAmount,
          0
        ),

      finalAmount:
        invoices.reduce(
          (
            a,
            b
          ) =>
            a +
            b.finalAmount,
          0
        )
    };

    res.render(
      "reports/gst-report",
      {
        title:
          "GST Report",

        invoices,

        summary
      }
    );
  }
}

module.exports =
  new ReportsController();
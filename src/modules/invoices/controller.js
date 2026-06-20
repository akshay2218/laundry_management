const {
  validationResult
} = require(
  "express-validator"
);

const service =
  require("./service");
const Customer =
  require("../customers/customer.model");

class InvoiceController {

  async builder(
    req,
    res,
    next
  ) {

    try {

      const order =
        await service.getOrder(
          req.params.orderId
        );

      const items =
        await service.getPriceItems();

      res.render(
        "invoices/builder",
        {
          title:
            "Generate Invoice",

          order,

          pricingData: items,

          errors: []
        }
      );

    } catch (err) {

      next(err);
    }
  }

  async preview(
    req,
    res,
    next
  ) {

    try {

      const totals =
        await service.calculateInvoice(
          req.body
        );

      res.json(
        totals
      );

    } catch (err) {

      next(err);
    }
  }

  async generate(
    req,
    res,
    next
  ) {

    try {

      const errors =
        validationResult(req);

      if (
        !errors.isEmpty()
      ) {

        return res.status(
          422
        ).json({
          errors:
            errors.array()
        });
      }
      req.body.items =
        JSON.parse(
          req.body.items
        );
      const customerId = req.body.customerId;
      const invoice =
        await service.generateInvoice(
          req.body
        );

      await Customer.findByIdAndUpdate(
        customerId,
        {
          $inc: {
            lifetimeValue: invoice.finalAmount
          }
        }
      );

      res.redirect(
        `/invoices/${invoice._id}`
      );

    } catch (err) {

      next(err);
    }
  }

  async details(
    req,
    res,
    next
  ) {

    try {

      const invoice =
        await service.getInvoice(
          req.params.id
        );

      res.render(
        "invoices/details",
        {
          title:
            "Invoice",

          invoice
        }
      );

    } catch (err) {

      next(err);
    }
  }

  async downloadPdf(
    req,
    res,
    next
  ) {
    try {

      const invoice =
        await service.getInvoice(
          req.params.id
        );

      const pdfPath =
        await service.generatePdf(
          invoice
        );

      return res.download(
        pdfPath
      );

    } catch (err) {

      next(err);

    }
  }

}

module.exports =
  new InvoiceController();
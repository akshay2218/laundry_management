const {
    validationResult
  } = require(
    "express-validator"
  );
  
  const service =
    require("./service");
  
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
  
            items,
  
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
        const invoice =
          await service.generateInvoice(
            req.body.items
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
  }
  
  module.exports =
    new InvoiceController();
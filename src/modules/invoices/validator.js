const {
    body
  } = require(
    "express-validator"
  );
  
  exports.invoiceValidator = [
  
    body("orderId")
      .notEmpty()
      .withMessage(
        "Order required"
      ),
  
    body("items")
      .notEmpty()
      .withMessage(
        "Invoice items required"
      )
  ];
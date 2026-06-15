const {
    body
  } = require(
    "express-validator"
  );
  
  exports.couponValidator = [
  
    body("code")
      .notEmpty(),
  
    body("discountValue")
      .isNumeric()
  ];
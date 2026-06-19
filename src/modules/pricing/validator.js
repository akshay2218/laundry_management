const {
    body
  } = require(
    "express-validator"
  );
  
  exports.itemValidator = [
  
    body("itemName")
      .notEmpty(),
  
    body("price")
      .isNumeric()
  ];
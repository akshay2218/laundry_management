const {
    body
  } = require(
    "express-validator"
  );
  
  exports.orderValidator = [
  
    body("customerId")
      .notEmpty()
      .withMessage(
        "Customer required"
      ),
  
    body("addressId")
      .notEmpty()
      .withMessage(
        "Address required"
      ),
  
    body("pickupDate")
      .notEmpty()
      .withMessage(
        "Pickup date required"
      ),
  
    body("pickupTime")
      .notEmpty()
      .withMessage(
        "Pickup time required"
      )
  ];
  
  exports.statusValidator = [
  
    body("status")
      .notEmpty()
      .withMessage(
        "Status required"
      )
  ];
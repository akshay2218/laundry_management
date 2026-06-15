const {
  body
} = require("express-validator");

exports.customerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(
      "Customer name required"
    ),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage(
      "Phone required"
    )
    .isLength({
      min: 10,
      max: 15
    })
];

exports.addressValidator = [
  body("houseNo")
    .notEmpty()
    .withMessage(
      "House number required"
    ),

  body("contactPerson")
    .notEmpty()
    .withMessage(
      "Contact person required"
    ),

  body("contactNumber")
    .notEmpty()
    .withMessage(
      "Contact number required"
    )
];
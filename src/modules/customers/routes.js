const express =
  require("express");

const router =
  express.Router();

const auth =
  require(
    "../../middleware/auth"
  );

const controller =
  require("./controller");

const {
  customerValidator,
  addressValidator
} = require(
  "./validator"
);

router.get(
  "/customers",
  auth,
  controller.list
);

router.get(
  "/customers/create",
  auth,
  controller.createPage
);

router.post(
  "/customers/create",
  auth,
  customerValidator,
  controller.create
);

router.get(
  "/customers/:id",
  auth,
  controller.details
);

router.get(
  "/customers/:id/edit",
  auth,
  controller.editPage
);

router.post(
  "/customers/:id/edit",
  auth,
  customerValidator,
  controller.update
);

router.post(
  "/customers/:id/address",
  auth,
  addressValidator,
  controller.createAddress
);

router.post(
  "/customers/:id/address/:addressId/delete",
  auth,
  controller.deleteAddress
);

module.exports =
  router;
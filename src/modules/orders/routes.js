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
  orderValidator,
  statusValidator
} = require(
  "./validator"
);

router.get(
  "/dashboard",
  auth,
  controller.dashboard
);

router.get(
  "/orders",
  auth,
  controller.dashboard
);

router.get(
  "/orders/create/:customerId",
  auth,
  controller.createPage
);

router.post(
  "/orders/create",
  auth,
  orderValidator,
  controller.create
);

router.get(
  "/orders/:id",
  auth,
  controller.details
);

router.post(
  "/orders/:id/status",
  auth,
  statusValidator,
  controller.updateStatus
);

router.post(
  "/orders/:id/assign-delivery",
  auth,
  controller.assignDelivery
);

module.exports =
  router;
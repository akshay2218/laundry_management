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
  invoiceValidator
} = require(
  "./validator"
);

router.get(
  "/orders/:orderId/invoice",
  auth,
  controller.builder
);

router.post(
  "/invoices/preview",
  auth,
  controller.preview
);

router.post(
  "/invoices/generate",
  auth,
  invoiceValidator,
  controller.generate
);

router.get(
  "/invoices/:id",
  auth,
  controller.details
);

router.get(
  "/invoices/:id/download",
  auth,
  controller.downloadPdf
);


module.exports =
  router;
const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../../middleware/auth");

const admin =
  require("../../middleware/admin");

const controller =
  require("./controller");

router.get(
  "/coupons",
  auth,
  admin,
  controller.index
);

router.get(
  "/coupons/create",
  auth,
  admin,
  controller.createPage
);

router.post(
  "/coupons/preview",
  auth,
  admin,
  controller.preview
);

router.post(
  "/coupons/create",
  auth,
  admin,
  controller.create
);

module.exports =
  router;
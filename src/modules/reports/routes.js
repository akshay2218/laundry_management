const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../../middleware/auth");

const manager =
  require("../../middleware/manager");

const controller =
  require("./controller");

router.get(
  "/reports",
  auth,
  manager,
  controller.index
);

router.get(
  "/reports/gst",
  auth,
  manager,
  controller.gst
);

module.exports =
  router;
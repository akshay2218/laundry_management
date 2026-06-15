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
  "/pricing",
  auth,
  admin,
  controller.index
);

router.get(
  "/pricing/items/create",
  auth,
  admin,
  controller.createPage
);

router.post(
  "/pricing/items/create",
  auth,
  admin,
  controller.create
);

router.get(
  "/pricing/items/:id/edit",
  auth,
  admin,
  controller.editPage
);

router.post(
  "/pricing/items/:id/edit",
  auth,
  admin,
  controller.update
);

module.exports =
  router;
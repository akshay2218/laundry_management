const express =
  require("express");

const router =
  express.Router();

const controller =
  require("./controller");

const {
  loginValidator
} = require(
  "./validator"
);

const auth =
  require(
    "../../middleware/auth"
  );

router.get(
  "/login",
  controller.loginPage
);

router.post(
  "/login",
  loginValidator,
  controller.login
);

router.get(
  "/logout",
  auth,
  controller.logout
);

module.exports =
  router;
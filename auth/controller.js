const passport = require("passport");

const {
  validationResult
} = require("express-validator");

class AuthController {
  loginPage(req, res) {
    return res.render(
      "auth/login",
      {
        title: "Login",
        errors: [],
        old: {}
      }
    );
  }

  login(req, res, next) {
    const errors =
      validationResult(req);

    if (!errors.isEmpty()) {
      return res.render(
        "auth/login",
        {
          title: "Login",
          errors:
            errors.array(),
          old: req.body
        }
      );
    }

    passport.authenticate(
      "local",
      (
        err,
        user
      ) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.render(
            "auth/login",
            {
              title: "Login",
              errors: [
                {
                  msg:
                    "Invalid credentials"
                }
              ],
              old: req.body
            }
          );
        }

        req.login(
          user,
          loginErr => {
            if (loginErr) {
              return next(
                loginErr
              );
            }

            if (
              user.role ===
              "ADMIN"
            ) {
              return res.redirect(
                "/dashboard"
              );
            }

            return res.redirect(
              "/dashboard"
            );
          }
        );
      }
    )(
      req,
      res,
      next
    );
  }

  logout(
    req,
    res,
    next
  ) {
    req.logout(
      function (
        err
      ) {
        if (err) {
          return next(err);
        }

        req.session.destroy(
          () => {
            res.redirect(
              "/login"
            );
          }
        );
      }
    );
  }
}

module.exports =
  new AuthController();
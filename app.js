require("dotenv").config();

const express = require("express");
const path = require("path");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const passport = require("./src/config/passport");

const connectDB = require("./src/config/database");
const sessionConfig = require("./src/config/session");

const expressLayouts =
  require("express-ejs-layouts");

const app = express();

connectDB();

/*
|--------------------------------------------------------------------------
| View Engine
|--------------------------------------------------------------------------
*/

app.set(
  "view engine",
  "ejs"
);

app.set(
  "views",
  path.join(
    __dirname,
    "src/views"
  )
);

app.set(
  "layout",
  "layouts/main"
);

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

app.use(expressLayouts);

app.use(
  express.static(
    path.join(
      __dirname,
      "public"
    )
  )
);

app.use(helmet());

app.use(
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    max: 100
  })
);

app.use(sessionConfig);

app.use(
  passport.initialize()
);

app.use(
  passport.session()
);

/*
|--------------------------------------------------------------------------
| Global View Variables
|--------------------------------------------------------------------------
*/

app.use((req, res, next) => {

  res.locals.user =
    req.user || null;

  res.locals.appName =
    "Laundry Management";

  res.locals.success =
    req.flash
      ? req.flash("success")
      : null;

  res.locals.error =
    req.flash
      ? req.flash("error")
      : null;

  next();
});

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use(
  require(
    "./src/modules/auth/routes"
  )
);

app.use(
  require(
    "./src/modules/customers/routes"
  )
);

app.use(
  require(
    "./src/modules/orders/routes"
  )
);

app.use(
  require(
    "./src/modules/invoices/routes"
  )
);

app.use(
  require(
    "./src/modules/pricing/routes"
  )
);

app.use(
  require(
    "./src/modules/coupons/routes"
  )
);

app.use(
  require(
    "./src/modules/reports/routes"
  )
);

/*
|--------------------------------------------------------------------------
| Default Route
|--------------------------------------------------------------------------
*/

app.get(
  "/",
  (req, res) => {
    res.redirect(
      "/dashboard"
    );
  }
);

/*
|--------------------------------------------------------------------------
| Error Pages
|--------------------------------------------------------------------------
*/

app.use(
  (req, res) => {

    res.status(404)
      .render(
        "errors/404",
        {
          title:
            "Page Not Found"
        }
      );
  }
);

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(
  process.env.PORT || 3000,
  () => {

    console.log(
      "Server running"
    );
  }
);
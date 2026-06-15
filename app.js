require("dotenv").config();

const express = require("express");
const path = require("path");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const passport = require("./src/config/passport");

const connectDB = require("./src/config/database");
const sessionConfig = require("./src/config/session");
const csrf = require("csurf");
const expressLayouts =
  require("express-ejs-layouts");




const app = express();

connectDB();

app.set(
  "view engine",
  "ejs"
);

app.set(
  "views",
  path.join(__dirname, "src/views")
);

app.set(
  "layout",
  "layouts/main"
);

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(expressLayouts);
app.use(csrf());
app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.use(sessionConfig);

app.use(passport.initialize());

app.use(passport.session());

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
  require("./src/modules/pricing/routes")
);

app.use(
  require("./src/modules/coupons/routes")
);

app.use(
  require("./src/modules/reports/routes")
);

app.use(
  (req, res, next) => {

    res.locals.req = req;

    res.locals.user =
      req.user;

    next();
  }
);

app.locals.appName =
  "Laundry Management";

app.get("/", (req, res) => {
  res.redirect("/dashboard");
});

app.listen(
  process.env.PORT || 3000,
  () => {
    console.log(
      "Server running"
    );
  }
);
require("dotenv").config();

const bcrypt =
  require("bcryptjs");

const mongoose =
  require("mongoose");

const connectDB =
  require(
    "../src/config/database"
  );

const User =
  require(
    "../src/modules/auth/model"
  );

(async () => {
  await connectDB();

  const hash =
    await bcrypt.hash(
      "Admin@123",
      10
    );

  await User.create({
    name: "Administrator",

    email:
      "admin@example.com",

    passwordHash: hash,

    role: "ADMIN"
  });

  console.log(
    "Admin Created"
  );

  process.exit();
})();
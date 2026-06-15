const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../modules/auth/model");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },

    async (email, password, done) => {
      try {
        const user = await User.findOne({
          email,
          isActive: true
        });

        if (!user) {
          return done(null, false);
        }

        const match = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!match) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});

module.exports = passport;
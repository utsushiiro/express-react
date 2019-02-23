const passport = require("passport");
const User = require("../models/index").user;

/**
 * @see http://www.passportjs.org/docs/downloads/html/
 */
class PassportService {
  static setup() {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      const user = await User.findById(id);
      done(null, user);
    });

    this.setupLocalStrategy();
  }

  static setupLocalStrategy() {
    passport.use(
      new (require("passport-local")).Strategy(
        {
          usernameField: "username",
          passwordField: "password"
        },
        async (username, password, done) => {
          // TODO username should be unique(or create an email column for a unique value)
          const user = await User.findOne({ where: { name: username, password: password } });
          if (user.name === username && user.password === password) {
            return done(null, user);
          } else {
            return done(null, false, { message: "invalid" });
          }
        }
      )
    );
  }
}

module.exports = PassportService;

const passport = require("passport");

/**
 * @see http://www.passportjs.org/docs/downloads/html/
 */
class PassportService {
  static setup() {
    passport.serializeUser((username, done) => {
      done(null, username);
    });

    passport.deserializeUser((username, done) => {
      done(null, { name: username });
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
        (username, password, done) => {
          if (username === "test" && password === "test") {
            return done(null, username);
          }
          return done(null, false, { message: "invalid" });
        }
      )
    );
  }
}

module.exports = PassportService;

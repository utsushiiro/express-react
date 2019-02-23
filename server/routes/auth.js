const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin"
  })
);

module.exports = router;

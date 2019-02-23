const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.render("index", { title: "Express", username: req.user.name });
  } else {
    res.redirect("/signin");
  }
});

module.exports = router;

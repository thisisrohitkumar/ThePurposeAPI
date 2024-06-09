const express = require("express");
const router = express.Router();
const {
  handleUserLogin,
  handleUserRegistration,
  handleUserLogout,
} = require("../controllers/auth.controller");

router.post("/register", handleUserRegistration);
router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogout);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, updateUserDetails, deleteAUser } = require("../controllers/user.controller");
const checkAuthority = require("../middlewares/checkAuthority");

router.get("/", checkAuthority('admin'), getAllUsers);
router.get("/:id", getUserById);

router.patch("/:id", updateUserDetails)

router.delete("/:id", deleteAUser)

module.exports = router;

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

// POST route to create a new user
router.post("/login", UserController.createUser);
router.get("/getUser/:googleId", UserController.getUserByGoogleId);

module.exports = router;

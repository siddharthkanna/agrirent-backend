const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// User Management
// POST /users/login - Login a user
router.post("/login", userController.login);

// GET /users/:id - Get user profile
router.get("/:id", userController.getUser);

// PUT /users/:id - Update user profile
router.put("/:id", userController.updateUser);

// DELETE /users/:id - Delete user account
router.delete("/:id", userController.deleteUser);

module.exports = router;

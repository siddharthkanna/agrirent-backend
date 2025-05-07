const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipment.controller");

// Equipment CRUD Operations
// POST /equipment - Create new equipment
router.post("/", equipmentController.createEquipment);

// GET /equipment - Get all equipment
router.get("/", equipmentController.getAllEquipment);

// GET /equipment/available - Get available equipment
router.get("/available", equipmentController.getAvailableEquipment);

// GET /equipment/:id - Get specific equipment
router.get("/:id", equipmentController.getEquipment);

// PUT /equipment/:id - Update equipment
router.put("/:id", equipmentController.updateEquipment);

// DELETE /equipment/:id - Delete equipment
router.delete("/:id", equipmentController.deleteEquipment);

// User Equipment Management
// GET /equipment/user/:userId - Get user's equipment listings
router.get("/user/:userId", equipmentController.getPostingHistory);

// Rental Management
// POST /equipment/rent - Create new rental
router.post("/rent", equipmentController.rentEquipment);

// GET /equipment/rentals/:userId - Get user's rental history
router.get("/rentals/:userId", equipmentController.getRentalHistory);

module.exports = router;

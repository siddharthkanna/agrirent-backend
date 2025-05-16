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
router.get("/get/:id", equipmentController.getEquipment);

// PUT /equipment/:id - Update equipment
router.put("/:id", equipmentController.updateEquipment);

// DELETE /equipment/:id - Delete equipment
router.delete("/:id", equipmentController.deleteEquipment);

// User Equipment Management
router.get("/postings", equipmentController.getPostingHistory);

// Rental Management
// POST /equipment/rent - Create new rental
router.post("/rent", equipmentController.rentEquipment);

// GET /equipment/rentals - Get user's rental history
router.get("/rentals", equipmentController.getRentalHistory);

module.exports = router;

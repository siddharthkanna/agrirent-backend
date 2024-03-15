const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipment.controller");

// Route to add new equipment (posting)
router.post("/addEquipment", equipmentController.createEquipment);

// Route to delete equipment by ID
router.delete(
  "/deleteEquipment/:equipmentId",
  equipmentController.deleteEquipment
);

// Route to rent equipment
router.post("/rentEquipment", equipmentController.rentEquipment);

// Route to get all equipment (both postings and rentals)
router.get("/allEquipment", equipmentController.getAllEquipment);

// Route to fetch posting history for a user
router.get("/postingHistory/:userId", equipmentController.getPostingHistory);

// Route to fetch rental history for a user
router.get("/rentalHistory/:userId", equipmentController.getRentalHistory);

module.exports = router;

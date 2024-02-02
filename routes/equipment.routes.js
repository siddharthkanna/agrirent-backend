const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipment.controller");

router.post("/addEquipment", equipmentController.createEquipment);
router.get("/allEquipment", equipmentController.getAllEquipment);

module.exports = router;

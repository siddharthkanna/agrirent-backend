const Equipment = require("../models/equipment.model");

// Controller methods for equipment
const getAllEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (err) {
    next(err);
  }
};

const getEquipmentById = async (req, res, next) => {
  const { equipmentId } = req.params;

  try {
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json(equipment);
  } catch (err) {
    next(err);
  }
};

const createEquipment = async (req, res, next) => {
  try {
    const newEquipment = new Equipment(req.body);
    const savedEquipment = await newEquipment.save();
    res.json(savedEquipment);
  } catch (err) {
    next(err);
  }
};

const updateEquipment = async (req, res, next) => {
  const { equipmentId } = req.params;

  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      equipmentId,
      req.body,
      { new: true }
    );
    if (!updatedEquipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json(updatedEquipment);
  } catch (err) {
    next(err);
  }
};

const deleteEquipment = async (req, res, next) => {
  const { equipmentId } = req.params;

  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(equipmentId);
    if (!deletedEquipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json(deletedEquipment);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};

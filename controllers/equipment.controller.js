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

const getPostingHistory = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const postings = await Equipment.find({ ownerId: userId });
    res.json(postings);
  } catch (err) {
    next(err);
  }
};

const getRentalHistory = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const rentals = await Equipment.find({ renterId: userId });
    res.json(rentals);
  } catch (err) {
    next(err);
  }
};

const rentEquipment = async (req, res, next) => {
  const { equipmentId, renterId } = req.body;

  try {
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    equipment.renterId = renterId;
    equipment.isAvailable = false;

    // Save the updated equipment
    const updatedEquipment = await equipment.save();

    res.json(updatedEquipment);
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
  getPostingHistory,
  getRentalHistory,
  rentEquipment,
};

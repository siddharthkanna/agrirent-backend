const equipmentService = require('../services/equipment.service');

const equipmentController = {
  createEquipment: async (req, res) => {
    try {
      const equipment = await equipmentService.createEquipment(req.body);
      res.status(201).json(equipment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getEquipment: async (req, res) => {
    try {
      const equipment = await equipmentService.getEquipmentById(req.params.id);
      if (!equipment) {
        return res.status(404).json({ error: 'Equipment not found' });
      }
      res.json(equipment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllEquipment: async (req, res) => {
    try {
      const equipment = await equipmentService.getAllEquipment();
      res.json(equipment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAvailableEquipment: async (req, res) => {
    try {
      const equipment = await equipmentService.getAvailableEquipment();
      res.json(equipment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEquipment: async (req, res) => {
    try {
      const equipment = await equipmentService.updateEquipment(req.params.id, req.body);
      res.json(equipment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteEquipment: async (req, res) => {
    try {
      await equipmentService.deleteEquipment(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getPostingHistory: async (req, res) => {
    try {
      const postings = await equipmentService.getPostingHistory(req.params.userId);
      res.json(postings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getRentalHistory: async (req, res) => {
    try {
      const rentals = await equipmentService.getRentalHistory(req.params.userId);
      res.json(rentals);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  rentEquipment: async (req, res) => {
    try {
      const { equipmentId, userId, startDate, endDate, totalPrice } = req.body;
      
      // Validate required fields
      if (!equipmentId || !userId || !startDate || !endDate || !totalPrice) {
        return res.status(400).json({ 
          error: 'Missing required fields: equipmentId, userId, startDate, endDate, totalPrice' 
        });
      }

      const rental = await equipmentService.rentEquipment(
        equipmentId,
        userId,
        new Date(startDate),
        new Date(endDate),
        totalPrice
      );

      res.status(201).json(rental);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = equipmentController;

const equipmentService = require('../services/equipment.service');

const equipmentController = {
  createEquipment: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const equipmentData = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        rentalPrice: req.body.rental_price,
        location: req.body.location,
        images: req.body.images,
        ownerId: userId,
        isAvailable: true,
        condition: req.body.condition,
        availabilityDates: req.body.availabile_dates,
        features: req.body.features,
        deliveryMode: req.body.delivery_mode,
      }

      const equipment = await equipmentService.createEquipment(equipmentData);
      
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
      const userId = req.user.id;
      const equipment = await equipmentService.getAvailableEquipment(userId);
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
      const userId = req.user.id;
      const postings = await equipmentService.getPostingHistory(userId);
      res.json(postings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getRentalHistory: async (req, res) => {
    try {
      const userId = req.user.id;
      const rentals = await equipmentService.getRentalHistory(userId);
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

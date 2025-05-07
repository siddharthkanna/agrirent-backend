const prisma = require('../config/prisma');

const equipmentService = {
  createEquipment: async (equipmentData) => {
    return prisma.equipment.create({
      data: equipmentData,
      include: {
        owner: true
      }
    });
  },

  getEquipmentById: async (id) => {
    return prisma.equipment.findUnique({
      where: { id },
      include: {
        owner: true,
        rentals: true
      }
    });
  },

  getAllEquipment: async () => {
    return prisma.equipment.findMany({
      include: {
        owner: true
      }
    });
  },

  getAvailableEquipment: async () => {
    return prisma.equipment.findMany({
      where: {
        available: true
      },
      include: {
        owner: true
      }
    });
  },

  updateEquipment: async (id, updateData) => {
    return prisma.equipment.update({
      where: { id },
      data: updateData,
      include: {
        owner: true
      }
    });
  },

  deleteEquipment: async (id) => {
    return prisma.equipment.delete({
      where: { id }
    });
  },

  getPostingHistory: async (userId) => {
    return prisma.equipment.findMany({
      where: {
        ownerId: userId
      },
      include: {
        owner: true,
        rentals: true
      }
    });
  },

  getRentalHistory: async (userId) => {
    return prisma.rental.findMany({
      where: {
        userId: userId
      },
      include: {
        equipment: {
          include: {
            owner: true
          }
        }
      }
    });
  },

  rentEquipment: async (equipmentId, userId, startDate, endDate, totalPrice) => {
    // Start a transaction to ensure data consistency
    return prisma.$transaction(async (tx) => {
      // Check if equipment exists and is available
      const equipment = await tx.equipment.findUnique({
        where: { id: equipmentId }
      });

      if (!equipment) {
        throw new Error('Equipment not found');
      }

      if (!equipment.available) {
        throw new Error('Equipment is not available for rent');
      }

      // Create rental record
      const rental = await tx.rental.create({
        data: {
          equipmentId,
          userId,
          startDate,
          endDate,
          totalPrice,
          status: 'pending'
        },
        include: {
          equipment: true,
          user: true
        }
      });

      // Update equipment availability
      await tx.equipment.update({
        where: { id: equipmentId },
        data: { available: false }
      });

      return rental;
    });
  }
};

module.exports = equipmentService; 
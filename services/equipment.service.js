const prisma = require('../config/prisma');

const equipmentService = {
  createEquipment: async (equipmentData) => {
    const { 
      name,
      description,
      category,
      rentalPrice,
      location,
      images,
      ownerId,
      condition,
      availabilityDates,
      features,
      deliveryMode
    } = equipmentData;

    return prisma.equipment.create({
      data: {
        name,
        description,
        category,
        rentalPrice,
        location,
        images: images || [],
        condition,
        availabilityDates: availabilityDates || [],
        features,
        deliveryMode,
        isAvailable: true,
        owner: {
          connect: { id: ownerId }
        }
      },
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

  getAvailableEquipment: async (userId) => {
    return prisma.equipment.findMany({
      where: {
        AND: [
          { isAvailable: true },
          { NOT: { ownerId: userId } }
        ]
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
    return prisma.$transaction(async (tx) => {
      const equipment = await tx.equipment.findUnique({
        where: { id: equipmentId }
      });

      if (!equipment) {
        throw new Error('Equipment not found');
      }

      if (!equipment.isAvailable) {
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
        data: { isAvailable: false }
      });

      return rental;
    });
  }
};

module.exports = equipmentService; 
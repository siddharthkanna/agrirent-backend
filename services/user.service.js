const prisma = require('../config/prisma');

const userService = {
  createUser: async (userData) => {
    return prisma.user.create({
      data: userData
    });
  },

  getUserByEmail: async (email) => {
    return prisma.user.findUnique({
      where: { email }
    });
  },

  getUserById: async (id) => {
    return prisma.user.findUnique({
      where: { id },
      include: {
        equipments: true,
        rentals: true
      }
    });
  },

  updateUser: async (id, updateData) => {
    return prisma.user.update({
      where: { id },
      data: updateData
    });
  },

  deleteUser: async (id) => {
    return prisma.user.delete({
      where: { id }
    });
  },

  getAllUsers: async () => {
    return prisma.user.findMany();
  }
};

module.exports = userService; 
const userService = require('../services/user.service');

const userController = {
    login: async (req, res) => {
    try {
      const { email, displayName, photoURL } = req.body;
      const photoUrl = photoURL;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      let user = await userService.getUserByEmail(email);

      if (!user) {
        user = await userService.createUser({
          email,
          name: displayName,
          photoUrl: photoUrl
        });
      } else {
        if (photoUrl && photoUrl !== user.photoURL) {
          user = await userService.updateUser(user.id, {photoUrl: photoUrl });
        }
      }

      res.json({
        user,
        message: user ? 'Login successful' : 'User created and logged in'
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = userController;

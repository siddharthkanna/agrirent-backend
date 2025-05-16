const userService = require('../services/user.service');

const userController = {
  login: async (req, res) => {
    try {
      console.log('Login attempt - Request body:', req.body);
      const { email, name, avatar } = req.body;

      if (!email) {
        console.log('Login failed - Email missing');
        return res.status(400).json({ error: 'Email is required' });
      }
      console.log('Searching for user with email:', email);
      let user = await userService.getUserByEmail(email);

      if (!user) {
        console.log('User not found, creating new user');
        user = await userService.createUser({
          email,
          name: name || email.split('@')[0],
          avatar
        });
        console.log('New user created:', user);
      } else {
        console.log('Existing user found:', user);
      }

      console.log('Login successful for user:', user.email);
      res.json({
        user,
        message: user ? 'Login successful' : 'User created and logged in'
      });
    } catch (error) {
      console.error('Login error:', error);
      console.error('Stack trace:', error.stack);
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

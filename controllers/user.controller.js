const User = require("../models/user.model");

const UserController = {
  getUserByGoogleId: async (req, res) => {
    try {
      // Extract Google ID from the request parameters
      const { googleId } = req.params;

      // Find the user by Google ID
      const user = await User.findOne({ googleId });

      if (!user) {
        // If the user is not found, respond with an appropriate message
        return res.status(404).json({ message: "User not found" });
      }

      // Respond with the user data
      res.status(200).json(user);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  createUser: async (req, res) => {
    try {
      // Extract user data from the request body
      const { googleId, displayName, email, photoURL, mobileNumber } = req.body;

      // Check if the user with the provided Google ID already exists
      const existingUser = await User.findOne({ googleId });

      if (existingUser) {
        // If the user already exists, acknowledge the sign-in without creating a new user
        return res.json({ message: "User already signed in" });
      }

      // If the user doesn't exist, create a new user
      const newUser = new User({
        googleId,
        displayName,
        email,
        photoURL,
        mobileNumber,
        // Add other user-related fields as needed
      });

      // Save the user to the database
      const savedUser = await newUser.save();

      // Respond with the created user data
      res.status(201).json(savedUser);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserController;

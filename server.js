const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();
const userRoutes = require("./routes/user.routes");
const equipmentRoutes = require("./routes/equipment.routes");
const authMiddleware = require("./middleware/authMiddleware");
const userController = require("./controllers/user.controller");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Public routes
app.post('/user/login', userController.login);

// Protected routes
app.use('/user', authMiddleware, userRoutes);
app.use('/equipment', authMiddleware, equipmentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

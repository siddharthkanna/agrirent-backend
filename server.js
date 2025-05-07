const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();
const userRoutes = require("./routes/user.routes");
const equipmentRoutes = require("./routes/equipment.routes");

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/equipment', equipmentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

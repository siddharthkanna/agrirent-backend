const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config");

const app = express();
const userRoutes = require("./routes/user.routes");
const equipmentRoutes = require("./routes/equipment.routes");

// Connect to MongoDB
mongoose
  .connect(config.uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/equipment", equipmentRoutes);

// Start server

app.listen(config.port, () =>
  console.log(`Server started on port ${config.port}`)
);

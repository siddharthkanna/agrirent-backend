const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  rentalPrice: { type: Number, required: true },
  location: { type: String, required: true },
  images: [
    {
      type: String,
    },
  ],
  ownerId: {
    type: String,
    required: true,
  },
  renterId: {
    type: String,
  },
  isAvailable: { type: Boolean, default: true },
  condition: { type: String },
  availabilityDates: { type: [String] },
  features: { type: String },
  deliveryMode: {
    type: String,
    enum: ["Renter Pickup", "Owner Delivery", "Both"],
    default: "Renter Pickup",
  },
});

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;

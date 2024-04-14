const nodemailer = require("nodemailer");
const Equipment = require("../models/equipment.model");
const User = require("../models/user.model");

// Controller methods for equipment
const getAllEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (err) {
    next(err);
  }
};

const getEquipmentById = async (req, res, next) => {
  const { equipmentId } = req.params;

  try {
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json(equipment);
  } catch (err) {
    next(err);
  }
};

const createEquipment = async (req, res, next) => {
  try {
    const newEquipment = new Equipment(req.body);
    const savedEquipment = await newEquipment.save();
    res.json(savedEquipment);
  } catch (err) {
    next(err);
  }
};

const updateEquipment = async (req, res, next) => {
  const { equipmentId } = req.params;

  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      equipmentId,
      req.body,
      { new: true }
    );
    if (!updatedEquipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json(updatedEquipment);
  } catch (err) {
    next(err);
  }
};

const deleteEquipment = async (req, res, next) => {
  const { equipmentId } = req.params;

  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(equipmentId);
    if (!deletedEquipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json(deletedEquipment);
  } catch (err) {
    next(err);
  }
};

const getPostingHistory = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const postings = await Equipment.find({ ownerId: userId });
    res.json(postings);
  } catch (err) {
    next(err);
  }
};

const getRentalHistory = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const rentals = await Equipment.find({ renterId: userId });
    res.json(rentals);
  } catch (err) {
    next(err);
  }
};

const sendEmail = async (recipientEmail, subject, message) => {
  try {
    // Create a transporter using Mailtrap SMTP settings
    let transporter = nodemailer.createTransport({
      host: "bulk.smtp.mailtrap.io",
      port: 587,
      secure: false,
      auth: {
        user: "api",
        pass: "3c3cb6928d3a4f9d01aaa638cff18028",
      },
    });

    // Setup email data
    let mailOptions = {
      from: "sid.vinnu@gmail.com",
      to: recipientEmail,
      subject: subject,
      text: message,
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

module.exports = {
  sendEmail,
};

const rentEquipment = async (req, res, next) => {
  const { equipmentId, renterId } = req.body;

  try {
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    // Fetch renter details from the database
    const renter = await User.findById(renterId);
    if (!renter) {
      return res.status(404).json({ message: "Renter not found" });
    }

    equipment.renterId = renterId;
    equipment.isAvailable = false;

    // Save the updated equipment
    const updatedEquipment = await equipment.save();

    // Send email to the renter
    await sendEmail(
      renter.email,
      "Equipment Rental Confirmation",
      "You have successfully rented equipment."
    );

    res.json(updatedEquipment);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  rentEquipment,
};

module.exports = {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getPostingHistory,
  getRentalHistory,
  rentEquipment,
};

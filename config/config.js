require("dotenv").config();

module.exports = {
  uri: process.env.MONGODB_URI,
  port: process.env.PORT
};

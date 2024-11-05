const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../.env") });
module.exports = {
  PORT: process.env.PORT,
  DbconnectionUrl: process.env.DBCONNECTION_URL,
  ENV: process.env.NODE_ENV,
};

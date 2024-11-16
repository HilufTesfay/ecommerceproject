const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../.env") });
module.exports = {
  PORT: process.env.PORT,
  DBCONNECTION_URL: process.env.DBCONNECTION_URL,
  ENV: process.env.NODE_ENV,
  SECRET_KEY: process.env.SECRET_KEY,
};

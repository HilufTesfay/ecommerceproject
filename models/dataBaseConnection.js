const mongoose = require("mongoose");
const dotenv = require("dotenv").config("../.env");
//This function connects to data base
function connectToDb(dbServer) {
  mongoose
    .connect(dbServer)
    .then(() => console.log("data base connected successfully"))
    .catch((err) => console.log("databese connection faield", err));
}
module.exports = connectToDb;

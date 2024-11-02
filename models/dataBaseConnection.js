const mongoose = require("mongoose");
const dbServer = "mongodb://localhost/student";
//This function connects to data base
function connectToDb() {
  mongoose
    .connect(dbServer)
    .then(() => console.log("data base connected successfully"))
    .catch((err) => console.log("databese connection faield", err));
}
module.exports = connectToDb;

//This is the server
const app = require("./app");
const { connectToDb } = require("./models");
const config = require("./config/config");
const port = config.PORT || 5000;
const dBURl = config.DBCONNECTION_URL;
const server = app.listen(port, () => {
  connectToDb(dBURl);
  console.log(`server is listing at port ${port}`);
});

const handleExit = () => {
  if (server) {
    server.close(() => {
      console.log("sever is shutting down");
      process.exit(0);
    });
  } else {
    process.exit(1);
  }
};
const handleUnhandledError = (err) => {
  if (config.ENV === "development") {
    console.log(err);
    handleExit();
  } else {
    handleExit();
  }
};
process.on("uncaughtException", handleUnhandledError);
process.on("unhandledRejection", handleUnhandledError);
process.on("SIGTERM", () => {
  console.log("SIGTERM");
  if (server) {
    server.close();
  }
});

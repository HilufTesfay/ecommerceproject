//This is the server
const app = require("./app");
const connectToDb = require("./models/dataBaseConnection");
const port = 5000;
connectToDb();
const server = app.listen(port, () =>
  console.log(`server is listing at port ${port}`)
);
process.on("unhandledRejection", (e) => {
  console.log("server is shutting down");
  server.close(() => {
    process.exit(0);
  });
});

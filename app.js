const express = require("express");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const { SECRET_KEY, DBCONNECTION_URL } = require("./config/config");
const routes = require("./routes/v1");
const { errHandler, auth } = require("./middleware");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//session middleware
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: DBCONNECTION_URL }),
    cookie: { maxAge: 360000000 },
  })
);
//passport and passport-session initialization globally
auth.initialize(app);
app.get("/home", (req, res) => {
  res.status(200).send("well come");
});
app.use("/v1/", routes);
app.all("*", (req, res, next) => {
  const err = new errHandler.CustomError(
    `${req.originalUrl} is not found`,
    404
  );
  next(err);
});
app.use(errHandler.handleGlobalError);
module.exports = app;

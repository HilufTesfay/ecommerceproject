const customerRoute = require("./customerRoute");
const productRoute = require("./productRoute");
const express = require("express");
const Router = express.Router();
const routes = [
  {
    path: "/customers",
    route: customerRoute,
  },
  {
    path: "/products",
    route: productRoute,
  },
];
routes.forEach((route) => {
  Router.use(route.path, route.route);
});
module.exports = Router;

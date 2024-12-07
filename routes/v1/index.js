const customerRoute = require("./customerRoute");
const productRoute = require("./productRoute");
const reviewRoute = require("./reviewRoute");
const searchRoute = require("./searchCustomerRoute");
const authRoute = require("./authRoute");
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
  {
    path: "/products/reviews",
    route: reviewRoute,
  },
  {
    path: "/customers/search",
    route: searchRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];
routes.forEach((route) => {
  Router.use(route.path, route.route);
});
module.exports = Router;

const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { Customer, Admin } = require("../models");

function initialize(app) {
  //initialize passport passprt middleware and integrate with express
  app.use(passport.initialize());
  // set up passport to handle session
  app.use(passport.session());
}
//configure and register strategy for customer authentication
passport.use(
  "customer-local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const customer = await Customer.findOne({ email: email });
        if (!customer) {
          return done(null, false, { message: "incorrect email or password!" });
        }
        const isMatch = await customer.verifyPassword(password);
        if (!isMatch) {
          return done(null, false, { message: "incorrect email or password!" });
        }
        return done(null, customer, { message: "login successfully" });
      } catch (error) {
        return done(error, false, { message: "something went wrong" });
      }
    }
  )
);
//configure and register strategy for admin authentication
passport.use(
  "admin-local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
          return done(null, false, { message: "incorrect email or password!" });
        }
        const isMatch = await admin.verifyPassword(password);
        if (!isMatch) {
          return done(null, false, { message: "incorrect email or password!" });
        }
        return done(null, admin, { message: "login successfully" });
      } catch (error) {
        return done(error, false, { message: "something went wrong" });
      }
    }
  )
);
//defiene  to serilize customer/admmin id and role as session
passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user._id, role: user.role });
  });
});
//define  to fetch customer/admin  from database using session info
passport.deserializeUser(async (data, done) => {
  try {
    let user = null;
    if (data.role === "customer") {
      user = await Customer.findById(data.id);
    } else if (data.role === "admin") {
      user = await Admin.findById(data.id);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    done(error, false);
  }
});
//define function to authenticate customer/admin
const authenticateUser = async (req, res, next) => {
  if (req.body.role === "admin" || req.body.role === "customer") {
    const strategy =
      req.body.role === "admin" ? "admin-local" : "customer-local";
    passport.authenticate(strategy, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send(info.message);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          message: "login successfully",
          Name: req.user.firstName,
          lastname: req.user.lastName,
          email: req.user.email,
          role: req.user.role,
        });
      });
    })(req, res, next);
  } else {
    return res.status(400).send("role is required,please enter valid role");
  }
};
//define function that ensures if customer or admin is authenticated
const isAuthenticatedUser = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user) {
    console.log("user is not authenticated, redirecting to login.");
    return res.redirect("/v1/auth/login");
  }
  return next();
};
//define function that logs out customer/admin
const logOut = async (req, res, next) => {
  try {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send("logout successfully");
    });
  } catch (error) {
    next(error);
  }
};
// define function to create session at registration phase
const createSession = async (req, user) => {
  return new Promise((resolve, reject) => {
    req.logIn(user, (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
//define function to autherize customer based on role
const authorize = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    }
    return res.status(403).send("you are not authorized to access this api");
  };
};
module.exports = {
  authenticateUser,
  isAuthenticatedUser,
  logOut,
  passport,
  initialize,
  createSession,
  authorize,
};

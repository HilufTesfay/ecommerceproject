const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { Customer } = require("../models");

function initialize(app) {
  //initialize passport passprt middleware and integrate with express
  app.use(passport.initialize());
  // set up passport to handle session
  app.use(passport.session());
}
//configure and register strategy
passport.use(
  "email-local",
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

//defiene  to serilize customer id as session
passport.serializeUser((customer, done) => {
  process.nextTick(() => {
    const id = customer._id;
    done(null, id);
  });
});
//define  to fetch customer  from database using session info
passport.deserializeUser(async (id, done) => {
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return done(null, false);
    }
    done(null, customer);
  } catch (error) {
    done(error, false);
  }
});
//define function to authenticate customer
const authenticateCustomer = async (req, res, next) => {
  passport.authenticate("email-local", (err, customer, info) => {
    if (err) {
      return next(err);
    }
    if (!customer) {
      return res.status(401).send(info.message);
    }
    req.logIn(customer, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        message: "login successfully",
        Name: req.user.firstName,
        lastname: req.user.lastName,
        email: req.user.email,
      });
    });
  })(req, res, next);
};

const isAuthenticatedCustomer = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user) {
    console.log("customer is not authenticated, redirecting to login.");
    return res.redirect("/v1/auth/login");
  }
  next();
};

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

const sendLoginForm = (req, res, next) => {
  res.status(200).json({
    message: "login with your email and password",
    email: "email",
    passwor: "password",
  });
};
const getProfile = (req, res, next) => {
  res.status(200).json({
    customer: req.user,
  });
};
module.exports = {
  authenticateCustomer,
  isAuthenticatedCustomer,
  logOut,
  passport,
  initialize,
  sendLoginForm,
  getProfile,
};

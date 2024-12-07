const joi = require("joi");
const errorHandler = require("./errorHandler");
const { pick } = require("../utils");
const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["query", "body", "params"]);
  const validRequest = pick(req, Object.keys(validSchema));
  const { value, error } = joi
    .compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(validRequest);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    const err = new errorHandler.CustomError(errorMessage, 500);
    next(err);
  }
  next();
};
module.exports = { validate };

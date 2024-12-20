const joi = require("joi");
const { errHandler } = require("../utils");
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
    const err = new errHandler.CustomError(errorMessage, 500);
    next(err);
  }
  Object.assign(req, value);
  next();
};
module.exports = { validate };

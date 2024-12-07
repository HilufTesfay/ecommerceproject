const joi = require("joi");
const envSchema = joi
  .object()
  .keys({
    PORT: joi.number().default(5000).required(),
    NODE_ENV: joi
      .string()
      .default("production")
      .valid("development", "production", "test")
      .required(),
    DBCONNECTION_URL: joi
      .string()
      .required()
      .default("mongodb://localhost/Ecommerce"),
    SECRET_KEY: joi.string().required().default("123456qwertyuiopolkjhgfdsa"),
    ACCESS_EXPIRATION_MINUTES: joi
      .number()
      .default(15)
      .description("access token expires after 15 days"),
    REFRESH_EXPIRATION_DAYS: joi
      .number()
      .default(15)
      .description("access token expires after 15 days "),
  })
  .unknown();
module.exports = { envSchema };

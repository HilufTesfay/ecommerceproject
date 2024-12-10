const joi = require("joi");
const envSchema = joi
  .object()
  .keys({
    PORT: joi.number().required().default(5000),
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
    RESET_PASSWORD_EXPIRATION_MINUTES: joi
      .number()
      .default(5)
      .description("password reset token expires after 15 days "),
    VERIFY_EMAIL_EXPIRATION_MINUTES: joi
      .number()
      .default(5)
      .description("email verification token expires after 15 days "),

    HOST: joi.string().required(),
    SMTP_PORT: joi.number().required(),
    SMTP_USER_NAME: joi.string().required().default("user"),
    SMTP_PASSWORD: joi.string().required().default("password"),
    FROM: joi.string().default("support@ecommerce.com"),
  })
  .unknown();
module.exports = { envSchema };

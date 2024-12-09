const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../.env") });
const { envSchema } = require("../validations");
const { value: envVars, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);
if (error) {
  // const errorMessage = new errHandler.CustomError("system errror", 500);
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  PORT: envVars.PORT,
  DBCONNECTION_URL: envVars.DBCONNECTION_URL,
  ENV: envVars.NODE_ENV,
  SECRET_KEY: envVars.SECRET_KEY,
  ACCESS_EXPIRATION_MINUTES: envVars.ACCESS_EXPIRATION_MINUTES,
  REFRESH_EXPIRATION_DAYS: envVars.REFRESH_EXPIRATION_DAYS,
  EMAIl: {
    host: envVars.HOST,
    port: envVars.SMTP_PORT,
    userName: envVars.SMTP_USER_NAME,
    password: envVars.SMTP_PASSWORD,
    from: envVars.FROM,
  },
};

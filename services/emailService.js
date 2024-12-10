const nodemailer = require("nodemailer");
const config = require("../config/config");
//configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: config.SMTP.host,
  port: config.SMTP.port,
  secure: false,
  auth: {
    user: config.SMTP.userName,
    pass: config.SMTP.password,
  },
  tls: { rejectUnauthorized: false },
});
// define function to set mail Options
const setMailOption = (userEmail, subject, message, html = null) => {
  const mailOptions = {
    from: config.SMTP.from,
    to: userEmail,
    subject: subject,
    text: message,
    ...(html && { html: html }),
  };
  return mailOptions;
};
// define function sendEmail  to send mail
const sendEmail = async (userEmail, subject, message) => {
  try {
    const mailOptions = setMailOption(userEmail, subject, message);
    await transporter.sendMail(mailOptions);
    console.log("sent successfully");
  } catch (err) {
    console.log("email not sent:", err);
  }
};
//define function to send reset token
const sendPasswordResetToken = async (userEmail, resetToken) => {
  try {
    const subject = "reset password";
    const url = ` http://5000/v1/auth/reset-password?resetToken=${resetToken}`;
    const message = `Click here to reset your password${url}`;
    await sendEmail(userEmail, subject, message);
  } catch (error) {
    console.log(error);
  }
};
//define function to send email verification
const sendEmailVerification = async (userEmail, verificationToken) => {
  try {
    const subject = "Email verification";
    const url = `http://5000/v1/auth/verify-email?VerificatonToken=${verificationToken}`;
    const message = `Click here to verify your email${url} `;
    await sendEmail(userEmail, subject, message);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { sendEmail, sendPasswordResetToken, sendEmailVerification };

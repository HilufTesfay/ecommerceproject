/*const { SMTPServer } = require("smtp-server");
const { simpleParser } = require("mailparser");
const config = require("../config/config");

const options = {
  name: config.SMTP.host,
  banner: "Welcome to ecommerce website",
  // Event handler called when client tries to connect to the server
  onConnect: (session, callback) => {
    console.log("Client connected from:", session.remoteAddress);
    return callback(); // Signals the server that the connection is accepted
  },
  // Event handler called when the client tries to authenticate
  onAuth: (auth, session, callback) => {
    if (
      auth.username !== config.SMTP.userName ||
      auth.password !== config.SMTP.password
    ) {
      return callback(new Error("Invalid username or password"));
    } else {
      callback(null, { user: auth.username }); // Return user object on successful authentication
    }
  },
  // Event handler called to process incoming message
  onData: async (stream, session, callback) => {
    try {
      const parsed = await simpleParser(stream, {});
      console.log("Email received:");
      console.log(parsed);
      callback(null, "Message accepted");
    } catch (error) {
      callback(error);
    }
  },
  onSecure: (socket, session, callback) => {
    return callback(); //accept all connection
  },
  // Event handler called when client disconnects
  onClose: (session) => {
    console.log("Client disconnected:", session.remoteAddress);
  },
};

const mailServer = new SMTPServer(options);
mailServer.listen(config.SMTP.port, () => {
  console.log(`SMTP server listening on port ${config.SMTP.port}`);
});

mailServer.on("error", (error) => {
  console.error("SMTP server error:", error);
});
*/

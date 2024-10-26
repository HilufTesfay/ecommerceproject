//this is the server
const app = require("./app");
const port = process.env.PORT || 8095;
app.listen(port, () => `server is listing at port ${port}`);

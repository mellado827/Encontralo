require("dotenv").config();

module.exports = {
  user: process.env.user_email,
  pass: process.env.pwd_email,
  host: process.env.host_email,
  port: process.env.port_email,
};

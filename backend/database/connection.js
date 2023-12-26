const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

let host = process.env.DEVELOPMENT_DB;
let database = process.env.DEVELOPMENT_DB_NAME;
let user = process.env.DEVELOPMENT_DB_USER;
let password = process.env.DEVELOPMENT_DB_PASSWORD;

// dataaaa

// if (process.env.NODE_ENV === "production") {
//   user = process.env.DEVELOPMENT_DB_USER;
//   password = process.env.DEVELOPMENT_DB_PASSWORD;
//   host = process.env.DEVELOPMENT_DB;
//   database = process.env.DEVELOPMENT_DB_NAME;
// } else {
//   user = process.env.PRODUCTION_DB_USER;
//   password = process.env.PRODUCTION_DB_PASSWORD;
//   host = process.env.PRODUCTION_DB;
//   // host = "15.206.41.33";
//   database = process.env.PRODUCTION_DB_NAME;
// }

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: process.env.DB_DIALECT,
  logging: false,
  dialectOptions: {
    // Your mysql2 options here
    timezone: "local",
  },
  timezone: process.env.DB_TIMEZONE,
});

module.exports = sequelize;

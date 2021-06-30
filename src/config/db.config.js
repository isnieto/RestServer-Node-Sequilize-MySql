// Basic database conection with node.js
// Database connection data comes from db.config.js
const mysql = require("mysql2");
//const dbConfig = require("./db.config.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  HOST: process.env.PORTHOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// Get Sequelize here ...
const Sequelize = require("sequelize");

// Create db variable here ...
const db = {};

// Create sequelize variable and get config as object here ...
// Customize your database config
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: "3306",
  logging: console.log,
  freezeTableName: true,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Enter the database config to sequelize here ...
db.sequelize = sequelize;

// Create exports module db here ...
module.exports = db;

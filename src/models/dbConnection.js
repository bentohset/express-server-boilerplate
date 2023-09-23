const dbConfig = require('../config/db.config')
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});

console.log("Database: Loaded " + dbConfig.DB)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.entries = require("./entry.model.js")(sequelize, DataTypes);
db.users = require("./user.model.js")(sequelize, DataTypes);

module.exports = db;
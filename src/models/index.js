//  Load Sequelize instance data
const dbConfig = require("../config/db.config.js");
// Create instance
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.player = require("./player.model.js")(sequelize, Sequelize);
db.games = require("./game.model.js")(sequelize, Sequelize);

db.player.hasMany(db.games, { as: "games" });
db.games.belongsTo(db.player, {
  foreignKey: "playerId",
  as: "playerid",
}); 

module.exports = db;

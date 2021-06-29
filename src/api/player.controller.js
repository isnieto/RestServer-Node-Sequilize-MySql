const db = require("../models");
const Player = db.player;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.createPlayer = (req, res) => {
  
    return Player.create({
        nickName: player.nickName,
        registeredAt: player.registeredAt,
      })
        .then((player) => {
          console.log(">> Created Player: " + JSON.stringify(player, null, 4));
          return player;
        })
        .catch((err) => {
          console.log(">> Error while creating player: ", err);
        });
};

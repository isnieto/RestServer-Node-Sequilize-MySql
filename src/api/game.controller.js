const db = require("../models");
const Player = db.player;
const Game = db.games;
const Op = db.Sequelize.Op;

const playGame = require("../middleware/game.play.js");

// Check if player ID already in Database
const checkIfPlayerIDExists = (playerId) => {
  return new Promise((reject, resolve) => {
    const condition = playerId ? { id: { [Op.like]: `%${playerId}%` } } : null;
    Player.findAll({ where: condition })
      .then((data) => {
        //  if no data found resolve
        if (data.length === 0) {
          resolve(true);
        } else {
          reject(false);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  });
};

// Create and Save a new game
exports.playOneGame = async (req, res) => {
  let playerIdExist = false;
  playerIdExist = await checkIfPlayerIDExists(req.params.playerId).catch(
    (e) => e
  );
  if (playerIdExist) {
    res.status(400).json({
      message: "Sorry, PlayerId is not correct. No such Id in Database",
    });
  } else {
    try {
      let playerId = req.params.playerId;
      let score = await playGame();
      let result = score > 7 ? true : false;
      // Create a player
      const game = {
        result: score,
        won: result,
        playerId: playerId,
      };
      // Save game in the database
      Game.create(game)
        .then((data) => {
          let message = "game played. Result: " + score;
          res.send({ message: message });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the player.",
          });
        });
    } catch (e) {
      res.status(404).json({ error: e });
    }
  }
};

// Delete all games of one player
exports.deleteGames = async (req, res) => {
  const id = req.params.playerId;
  console.log("ID", id);
  Game.destroy({
    where: { playerId: id },
  })
    .then((num) => {
        console.log("NUM",num)
      if (num !== 0) {
        res.send({
          message: "Player games were deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Games with playerId=${id}. Maybe ID was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Games with player id" + id,
      });
    });
};

const db = require("../models");
const Player = db.player;
const Op = db.Sequelize.Op;

// Create and Save new player
exports.createPlayer = async (req, res) => {
  let playerName = "";
  let message = "";
  // Validate request
  if (
    Object.keys(req.body).length === 0 ||
    req.body.name === "" ||
    req.body.name === " "
  ) {
    playerName = "Anonimo";
    message = "New player added as ANONIMUS";
  } else {
    playerName = req.body.name;
  }
  // Create a player
  const player = {
    nickName: playerName,
  };

  // Save player in the database
  Player.create(player)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the player.",
      });
    });
};

// Retrieve a single player by ID
exports.findPlayer = async (req, res) => {
  const id = req.params.playerId;
  Player.findByPk(id)
    .then((data) => {
      if (!data)
        return res.status(200).send({
          message: "No Player with id=" + id,
        });
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Player with id=" + id,
      });
    });
};

//Retrieve all players
exports.findAll = async (req, res) => {
  Player.findAll()
    .then((data) => {
      console.log("Data", data.length);
      if (data.length === 0)
        return res.status(200).send({
          message: "No Player in Database",
        });
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving players.",
      });
    });
};

// Update player name
exports.updatePlayer = async (req, res) => {
  if (Object.keys(req.body).length === 0 || !req.body.id) {
    res
      .status(400)
      .send({ message: "Sorry, playerID and NewName needed to update!" });
  } else {
    Player.update(
      { nickName: req.body.newname },
      {
        where: { id: req.body.id },
      }
    )
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "player was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update player with id=${req.body.id}. Maybe player was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating player with id=" + req.body.id,
        });
      });
  }
};

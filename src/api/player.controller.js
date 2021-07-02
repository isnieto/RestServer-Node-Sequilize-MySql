const db = require("../models");
const Player = db.player;
const Game = db.game;
const Op = db.Sequelize.Op;


// Check if player name already in Database
const checkIfPlayerExists = (playerName) => {
  return new Promise((reject, resolve) => {
    const name = playerName;
    const condition = name ? { nickName: { [Op.like]: `%${name}%` } } : null;
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
          message:
            err.message || "Some error occurred while retrieving data.",
        });
      });
  });
};



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
  // Check if already Exist Name in Database
  try {
    // Check if playerid in database
    let playerExist = false;
    playerExist = await checkIfPlayerExists(playerName).catch((e) => e );
    if (!playerExist) {
      res.status(400).json({ message: "Sorry, Player already exists in database" });
    } else {
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

    }//else
  } catch (e) {
    res.status(500).json({ message: e });
  }
}
// Retrieve a single player by ID
exports.findPlayer = async (req, res) => {
  const id = req.params.playerId;
  Player.findByPk(id)
    .then((data) => {
      if (!data)
        return res.status(204).send({
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
      if (data.length === 0)
        return res.status(204).send({
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


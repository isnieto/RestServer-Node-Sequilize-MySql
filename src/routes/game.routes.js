// Setting route controllers for all endpoint of th app
//const express = require("express"); //or Router() needed;

module.exports = (app) => {
  const gameController = require("../api/game.controller.js");
  const playerController = require("../api/player.controller.js");

  const router = require("express").Router();
  // ADD  a new player
  router.post("/", playerController.createPlayer);

  // Retrieve a single player data by playerId
  router.get("/:playerId", playerController.findPlayer);

  //Retrieve all players from database FALTA percentage mig
  router.get("/", playerController.findAll);

   // Modify player name
  router.put("/", playerController.updatePlayer);

  // Play one Game
  router.post("/:playerId/games/", gameController.playOneGame);
  
  /*
  // Delete a Playger with playerId
  app.delete("/players/:playerId/games", playerController.deleteAll);



  // Retrieve a single player score list
  app.get("/players/:playerId/games", playerController.gamesAll);



  // Retrieve average ranking of all  players
  app.get("/players/ranking/all", playerController.findRanking);

  // Retrieve worst player
  app.get("/players/ranking/loser", playerController.findWorst);

  // Retrieve best player
  app.get("/players/ranking/winner", playerController.findBest);
 */

  app.use('/players', router);

  // Page not available
  app.all("*", (req, res) => {
    res.status(404).send("ERROR 404. This page is not available.");
  });
};

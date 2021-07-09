# Node REST Server + ORM(Sequilize) + MySql

Goal of the project is to build a API server that supports a simple dice game.
Following features have been taken in considereation to build the API:

- In case the result of the two dice is 7, the game is won, otherwise it is lost.
- In order to play the game, you must register as a player with a name. A player can see a list of all the rolls he has made and the success rate.
- In order to make a roll, a user must register with a non-repeated name. When created, it is assigned a unique numeric identifier and a registration date.
- If the user doesnt wish to insert a user name, the user name will be called "ANONYMOUS", as default value. There can be more than one "ANONYMOUS" player.
- Each player can see a list of all the rolls they have made, with the value of each dice and whether or not the game has been won. In addition, you can know your success rate for all the runs you have made.
- You can't delete a particular game, but you can delete the entire list of rolls per player.
- The software should be able to list all the players in the system, the success rate of each player and the average success rate of all the players in the system.
- The software must respect the main design patterns.
-

# Getting started

To get the Node server running locally:

- Clone this repository
- `npm install` o `npm i` to install all required dependencies
- Create mysql database with script located in - `scripts/` folder.
- Modify name of file `.env_template` to `.env`
- `npm start` to start the local server.
- API server can be tested with Postman. For routes see "Features".
- Enviroment variables are place in .env_template for exercises purposes.

## Code style

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/15339443-72c9dd5b-1de4-4a67-8bff-1f62d6018335?action=collection%2Ffork&collection-url=entityId%3D15339443-72c9dd5b-1de4-4a67-8bff-1f62d6018335%26entityType%3Dcollection%26workspaceId%3Da6fa5b46-d7c5-4fc9-bcde-2e9c3d86fb5d)

## Tech/framework used

<b>Built with</b>

- [Node](https://nodejs.org/es/)
- [Express](https://expressjs.com/es/)
- [ORM: Sequilize](https://sequelize.org/master/index.html)
- [mysql2](https://github.com/expressjs/express)

## Features

In order to test routes with Postmann check following link:
[![Run in Postman](https://www.getpostman.com/collections/758f3b2f2c1b39d1409b)

Methods Urls Actions

- POST /players > Add/Create a new player
- PUT /players > Update/Modify the name of an existing
- POST /players/{id}/games/ > A player plays one round.
- DELETE /players/{id}/games > Delete all rounds of a player
- GET /players/ > Retrieve the list of all players
- GET /players/{id}/games > Retrieve a list with all games and results of a player
- GET /players/ranking/all > Retrieve the ranking of all players and their average pencentage
- GET /players/ranking/loser > Retrieve best player average pencentage
- GET /players/ranking/winner > Retrieve worst player average pencentage

## Application Structure

The project try to implement best practices following the following structure:

<p align="center">
    <img src="https://github.com/uzs7jf/node-rest-mysql/blob/master/public/rest-api-structure.png">
</p>

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `api/` - This folder contains controller files.
- `config/` - This folder contains configuration for database as well as a central location for configuration/environment variables.
- `middleware/` - This folder contains middleware functions
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mysql database models

## Related projects

Here's a list of the related projects where you can find similar exercises with using other technologies:

- REST APi with NodeJS and MongoDB: https://github.com/uzs7jf/node-srv-mongodb
- REST APi with NodeJS and MongoDB and JWT: https://github.com/uzs7jf/node-rest-mongodb-JWT

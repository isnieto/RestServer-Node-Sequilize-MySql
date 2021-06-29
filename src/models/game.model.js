module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("games", {
      round: {
        type: Sequelize.DATE
      },
      result: {
        type: Sequelize.INTEGER
      },
      won: {
        type: Sequelize.BOOLEAN
      },
      playerId: {
        type: Sequelize.INTEGER // ForeignKey
      }
    });
  
    return Game;
  };
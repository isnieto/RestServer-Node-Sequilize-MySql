module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("player", {
      nickName: {
        type: Sequelize.STRING
      },
      registeredAt: {
        type: Sequelize.DATE
      }
    });
  
    return Player;
  };
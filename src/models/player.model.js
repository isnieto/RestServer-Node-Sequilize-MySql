module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("players", {
      nickName: {
        type: Sequelize.STRING
      },
      registeredAt: {
        type: Sequelize.DATEONLY 
      }
    });
  
    return Player;
  };
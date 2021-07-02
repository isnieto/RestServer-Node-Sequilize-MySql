module.exports = {
  createNewPlayer: (playerName) => {
    return `INSERT INTO players (nickName, registeredAt) VALUES ( '${playerName}', CURDATE())`;
  },

  modifyPlayerName: (playerId, newName) => {
    return `UPDATE players SET nickName = '${newName}' WHERE player_id = '${playerId}'`;
  },

  addNewGame: (playerId, result) => {
    return `INSERT INTO games (round, result, player_id, won) VALUES ( NOW(), '${result}', '${playerId}', (CASE WHEN result >= 6 THEN 1 ELSE 0 END));`;
  },

  getOnePlayer: (playerId) => {
    return `SELECT * FROM players WHERE player_id = ${playerId}`;
  },

  getScorePlayer: (playerId) => {
    return `SELECT * FROM games WHERE player_id= ${playerId} ORDER BY round ASC`;
  },

  searchByName: (playerName) => {
    return `SELECT * FROM players WHERE nickName = '${playerName}'`;
  },

  searchId: (playerId) => {
    return `SELECT * FROM players WHERE player_id = '${playerId}'`;
  },

  getAllPlayers: "SELECT * FROM players",

  getRankigAll:
    "SELECT p.nickName, count(*) AS Games, CONCAT( ROUND(((sum(g.won) * 100) / count(*)), 0), '%')" +
    " AS Percentage FROM games g LEFT JOIN players p ON g.player_id=p.player_Id GROUP BY g.player_id order by ((sum(won) * 100) / count(*)) DESC;",

  getWorstRanking:
    "SELECT p.nickName, count(*) AS Games, CONCAT( ROUND(((sum(g.won) * 100) / count(*)), 0), '%')  as Percentage FROM games g LEFT JOIN players p " +
    "ON g.playerId=p.id GROUP BY g.playerId order by ((sum(won) * 100) / count(*)) ASC LIMIT 1;",

  getBestRanking:
    "SELECT p.nickName, count(*) AS Games, CONCAT( ROUND(((sum(g.won) * 100) / count(*)), 0), '%')  as Percentage FROM games g LEFT JOIN players p ON g.playerId=p.id GROUP BY g.playerId order by ((sum(won) * 100) / count(*)) DESC LIMIT 1;",

  deleteGamesPlayer: (playerId) => {
    return `DELETE FROM games WHERE player_id=${playerId}`;
  },
};

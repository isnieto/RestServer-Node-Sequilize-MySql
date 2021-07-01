
exports.checkIfPlayerExists = async (playerName) => {
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
  
  // Check if player ID already in Database
exports.checkIfPlayerIDExists = async (playerId) => {
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
            message:
              err.message || "Some error occurred while retrieving data.",
          });
        });
    });
  };
  
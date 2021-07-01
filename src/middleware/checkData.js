exports.createPlayer = anc function checkIfPlayerExists(playerName){
    return new Promise((reject, resolve) => {
     
        const name = req.query.name;
        const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
      
        Player.findAll({ where: condition })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
          });
    });
  }
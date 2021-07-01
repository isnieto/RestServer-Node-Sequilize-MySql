// SERVER: App entry point
const app = require("./app");

// SERVER: port variable
const { PORT } = require("./config/index.js");

// Models
const db = require("./models/index");
/* db.sequelize.sync(); */

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// Routes
require("./routes/game.routes.js")(app);

app.listen(PORT, () => {
  console.log("Express server started and running on port: " + PORT);
});

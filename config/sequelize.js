const sequelize = require("sequelize");

const db = new sequelize(
   "NexusMart",
   "user",
   "pass",
    {
      host: "localhost",
      dialect: "mysql"
    }
  );

db.authenticate()
.then(() => {
   console.log("Connection has been established successfully");
})
.catch((error) => {
   console.error("Unable to connect to the database: ", error);
});

module.exports = db;
var Sequelize = require("sequelize").Sequelize;

var sequelize = new Sequelize("shop-kart", "star", "userpass", {
  dialect: "mysql",
  host: "localhost",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

module.exports = sequelize;
// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "shop-kart",
//   password: "star.2706"
// });

// module.exports = pool.promise();

const dbConfig = require("../config/db_config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.database,
        dbConfig.user,
        dbConfig.password, {
                host: dbConfig.host,
                port: dbConfig.port,
                dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.orders = require("./construct_order.js")(sequelize, Sequelize);

module.exports = db;
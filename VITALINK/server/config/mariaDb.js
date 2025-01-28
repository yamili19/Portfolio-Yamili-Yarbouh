//Archivo que se encarga de configurar la conexión
//a la BD remota

const { Sequelize } = require("sequelize");
require("dotenv").config();
//Datos de la BD

const database = process.env.MARIADB_DATABASE;
const username = process.env.MARIADB_USERNAME;
const password = process.env.MARIADB_PASSWORD;
const host = process.env.MARIADB_HOST;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mariadb",
});

const dbConnectionMariaDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("CONECTADO CON MARIADB!");
  } catch (error) {
    console.log("Error en la conexion de la BD: ", error);
  }
};

module.exports = { sequelize, dbConnectionMariaDb };

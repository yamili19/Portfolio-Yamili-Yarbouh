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
  dialectOptions: {
    connectTimeout: 60000, // 60 segundos
    charset: "utf8mb4",
  },
  timezone: "America/Argentina/Buenos_Aires",
  pool: {
    max: 10, // Número máximo de conexiones en el pool
    min: 0, // Número mínimo de conexiones en el pool
    acquire: 60000, // Tiempo máximo, en milisegundos, que Sequelize intentará obtener una conexión antes de lanzar un error
    idle: 10000, // Tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada
  },
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

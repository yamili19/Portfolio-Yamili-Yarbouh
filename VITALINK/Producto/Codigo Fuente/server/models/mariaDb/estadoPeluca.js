/**
 * Archivo que se usa para definir el modelo que representa la tabla estado_peluca
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");

const EstadoPeluca = sequelize.define(
  "estadoPeluca",
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "estado_peluca",
    timestamps: false,
  }
);

module.exports = EstadoPeluca;

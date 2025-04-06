/**
 * Archivo que se usa para definir el modelo que representa la tabla ciudad
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");

const Ciudad = sequelize.define(
  "ciudad",
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "ciudad",
    timestamps: false,
  }
);

module.exports = Ciudad;

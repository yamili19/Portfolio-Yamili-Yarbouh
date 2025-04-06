/**
 * Archivo que se utiliza para definir el modelo que representa la tabla obra social
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");

const ObraSocial = sequelize.define(
  "obraSocial",
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
    tableName: "obra social",
    timestamps: false,
  }
);

module.exports = ObraSocial;

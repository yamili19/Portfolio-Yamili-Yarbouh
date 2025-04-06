/**
 * Archivo que usa para definir el modelo que representa la tabla vinculo
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");

const Vinculo = sequelize.define(
  "vinculo",
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "vinculo",
    timestamps: false,
  }
);

module.exports = Vinculo;

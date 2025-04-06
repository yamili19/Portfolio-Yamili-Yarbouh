/**
 * Archivo que se utiliza para definir el modelo que representa la tabla rol
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");

const Rol = sequelize.define(
  "rol",
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
    tableName: "rol",
    timestamps: false,
  }
);

module.exports = Rol;

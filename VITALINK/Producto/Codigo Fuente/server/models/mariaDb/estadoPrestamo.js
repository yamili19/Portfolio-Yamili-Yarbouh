/**
 * Archivo que se usa para definir el modelo que represant la tabla estado_prestamo
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");

const EstadoPrestamo = sequelize.define(
  "estadoPrestamo",
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
    tableName: "estado_prestamo",
    timestamps: false,
  }
);

module.exports = EstadoPrestamo;

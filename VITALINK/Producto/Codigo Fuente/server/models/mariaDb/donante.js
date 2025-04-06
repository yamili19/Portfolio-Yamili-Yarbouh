/**
 * Archivo que se utiliza para definir el módelo que representa
 * la tabla donante
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");

const Donante = sequelize.define(
  "donante",
  {
    mail: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: true,
      //AGREGAR LA REFERENCIA A LA TABLA USUARIO
    },
  },
  {
    tableName: "donante",
    timestamps: false,
  }
);

module.exports = Donante;

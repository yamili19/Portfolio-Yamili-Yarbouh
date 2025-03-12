/**
 * Archivo que se utiliza para definir el modelo que representa la tabla de tipo_pelo
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");

const TipoPelo = sequelize.define(
  "tipoPelo",
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "tipo_pelo",
    timestamps: false,
  }
);

module.exports = TipoPelo;

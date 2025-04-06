/**
 * Archivo que se utiliza para definir el modelo que representa la tabla tipo_cara
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");
const TipoCaraPorPeluca = require("./tipoCaraPorPeluca");

const TipoCara = sequelize.define(
  "tipoCara",
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
    timestamps: false,
    tableName: "tipo_cara",
  }
);

/*
TipoCara.hasMany(TipoCaraPorPeluca, {
  foreignKey: "tipo_cara_id",
  as: "pelucasAsociadas",
});
*/

module.exports = TipoCara;

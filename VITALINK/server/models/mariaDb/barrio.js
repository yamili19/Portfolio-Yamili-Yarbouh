const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");

const Barrio = sequelize.define(
  "barrio",
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
    localidad: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: "localidad",
        key: "id",
      },
    },
  },
  {
    tableName: "barrio",
    timestamps: false,
  }
);

module.exports = Barrio;

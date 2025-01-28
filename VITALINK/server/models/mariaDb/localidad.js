const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");

const Localidad = sequelize.define("localidad", {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
});

module.exports = Localidad;

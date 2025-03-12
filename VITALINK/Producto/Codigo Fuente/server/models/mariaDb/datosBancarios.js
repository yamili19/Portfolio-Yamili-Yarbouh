const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");

const DatosBancarios = sequelize.define(
  "datos bancarios",
  {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    titular: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cbu: {
      type: DataTypes.STRING(22),
      allowNull: false,
    },
    alias: {
        type: DataTypes.STRING(100), 
        allowNull: false, 
    }, 
    banco: {
        type: DataTypes.STRING(100),
        allowNull: false, 
    }, 
    qr: {
        type: DataTypes.STRING(10000), 
        allowNull: true, 
    }, 
    mp: {
        type: DataTypes.STRING(2000),
        allowNull: true, 
    },
  },
  {
    tableName: "datos bancarios",
    timestamps: false,
  }
);

module.exports = DatosBancarios;
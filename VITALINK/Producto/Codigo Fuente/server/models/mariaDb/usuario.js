/**
 * Archivo que se utiliza para definir el modelo que representa la tabla usuario
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");
const Rol = require("./rol");

const Usuario = sequelize.define(
  "usuario",
  {
    nombreUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: "rol",
        key: "id",
      },
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

//Se define la asociación con la tabla rol
Usuario.belongsTo(Rol, {
  foreignKey: "rol",
  as: "Rol",
});

//Método para traer todos los usuarios con el nombre del rol incluido
Usuario.findAllUsersWithRol = function () {
  return this.findAll({
    include: {
      model: Rol,
      as: "Rol",
      attributes: ["nombre"],
    },
  });
};

module.exports = Usuario;

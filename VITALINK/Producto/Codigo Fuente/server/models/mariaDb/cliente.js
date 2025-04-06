/**
 * Archivo que se utiliza para definir el modelo que representa la tabla cliente
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");
const Ciudad = require("./ciudad");
const Usuario = require("./usuario");

const Cliente = sequelize.define(
  "cliente",
  {
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
    },
    nroTelefono: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "ciudad",
        key: "id",
      },
    },
    estaEnListaDeEspera: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: "usuario",
        key: "email",
      },
    },
  },
  {
    tableName: "cliente",
    timestamps: false,
  }
);

//Se define la relación con la tabla ciudad
Cliente.belongsTo(Ciudad, {
  foreignKey: "ciudad",
  as: "ciudadClienteData",
});

//Se define  la relación con la tabla usuario
Cliente.belongsTo(Usuario, {
  foreignKey: "usuario",
  as: "Usuario",
});

//Se define función para obtener todos los clientes con el nombre de la ciudad incluido
Cliente.findAllClienteWithCiudad = function () {
  return this.findAll({
    include: {
      model: Ciudad,
      as: "ciudadClienteData",
      attributes: ["nombre"],
    },
    order: [["dni"]],
  });
};

module.exports = Cliente;

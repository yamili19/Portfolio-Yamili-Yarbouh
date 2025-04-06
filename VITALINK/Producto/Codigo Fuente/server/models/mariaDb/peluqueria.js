const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");
const Barrio = require("./barrio");

const PeluqueriaAsociada = sequelize.define(
  "PeluqueriaAsociada",
  {
    nombre: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    contacto: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nroCelular: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    nroFijo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    calle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    latitud: {
      type: DataTypes.FLOAT, // Nuevo campo para latitud
      allowNull: true,
    },
    longitud: {
      type: DataTypes.FLOAT, // Nuevo campo para longitud
      allowNull: true,
    },
    barrio: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: "barrio", // Nombre de la tabla relacionada
        key: "id", // Llave primaria de la tabla relacionada
      },
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: "usuario", // Nombre de la tabla relacionada
        key: "email", // Llave primaria de la tabla relacionada
      },
    },
  },
  {
    tableName: "peluqueria asociada",
    timestamps: false,
  }
);

//Se define la asociación con la tabla barrio
PeluqueriaAsociada.belongsTo(Barrio, {
  foreignKey: "barrio",
  as: "Barrio",
});

//Método para obtener todas las peluquerías con el nombre del barrio incluido
PeluqueriaAsociada.findAllWithBarrio = function () {
  return this.findAll({
    include: {
      model: Barrio,
      as: "Barrio",
      attributes: ["nombre"],
    },
  });
};

// Método para buscar una peluquería por nombre con el barrio incluido
PeluqueriaAsociada.findWithBarrio = function (nombre) {
  return this.findOne({
    where: { nombre },
    include: {
      model: Barrio,
      as: "Barrio",
      attributes: ["nombre"],
    },
  });
};

module.exports = PeluqueriaAsociada;

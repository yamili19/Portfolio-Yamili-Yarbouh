/**
 * Archivo que se usa para definir le modelo que representa la tabla afiliacion
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");
const ObraSocial = require("./obraSocial");

const Afiliacion = sequelize.define(
  "afiliacion",
  {
    nroAfiliacion: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    obraSocial: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      references: {
        model: "obra social",
        key: "id",
      },
    },
    dni: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  },
  {
    tableName: "afiliacion",
    timestamps: false,
  }
);

//Se define la relación con la tabla obra social
Afiliacion.belongsTo(ObraSocial, {
  foreignKey: "obraSocial",
  as: "obraSocialData",
});

/**
 * Función para verificar si existe una afiliación con la obra social y el DNI ingresados.
 * @param {number} obraSocialId - ID de la obra social.
 * @param {number} dni - DNI del afiliado.
 * @returns {Promise<number|null>} - Retorna el número de afiliación si existe, de lo contrario null.
 */
Afiliacion.findAfiliacionByObraSocialAndDni = async function (
  obraSocialId,
  dni
) {
  const afiliacion = await Afiliacion.findOne({
    where: {
      obraSocial: obraSocialId,
      dni: dni,
    },
  });

  return afiliacion ? afiliacion.nroAfiliacion : null;
};

module.exports = Afiliacion;

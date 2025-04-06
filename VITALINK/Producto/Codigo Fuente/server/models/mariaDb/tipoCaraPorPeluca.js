/**
 * Archivo que se usa para definir el modelo que representa la tabla tipo_cara_x_peluca
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");
const Peluca = require("./peluca");
const TipoCara = require("./tipoCara");

const TipoCaraPorPeluca = sequelize.define(
  "tipoCaraPorPeluca",
  {
    codigo: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      references: {
        model: "peluca",
        key: "codigo",
      },
    },
    tipo_cara_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      references: {
        model: "tipo_cara",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "tipo_cara_x_peluca",
  }
);

/*
TipoCaraPorPeluca.belongsTo(Peluca, {
  foreignKey: "codigo",
  as: "peluca",
});

TipoCaraPorPeluca.belongsTo(TipoCara, {
  foreignKey: "tipo_cara_id",
  as: "tipoCara",
});
*/

/**
 * Función para obtener los nombre del tipo cara recomenda para una peluca
 * @param {*} codigo - Pasar el código de la peluca
 * @returns - Retorna el / los nombres del tipos de cara recomendada para esa peluca
 */
TipoCaraPorPeluca.getTiposCaraPorCodigoPeluca = async function (codigo) {
  return await this.findAll({
    where: { codigo },
    include: [
      {
        model: TipoCara,
        as: "tipoCara",
        attributes: ["nombre"],
      },
    ],
  });
};

module.exports = TipoCaraPorPeluca;

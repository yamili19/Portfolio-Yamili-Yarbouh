/**
 * Archivo para centralizar las relaciones entre los modelos Peluca, TipoCaraPorPeluca y TipoCara
 */

// models/mariaDb/relacionesPeluca.js

const Peluca = require("./peluca");
const TipoCara = require("./tipoCara");
const TipoCaraPorPeluca = require("./tipoCaraPorPeluca");

Peluca.hasMany(TipoCaraPorPeluca, {
  foreignKey: "codigo",
  as: "carasAsociadas",
});
TipoCaraPorPeluca.belongsTo(Peluca, { foreignKey: "codigo", as: "peluca" });

TipoCara.hasMany(TipoCaraPorPeluca, {
  foreignKey: "tipo_cara_id",
  as: "pelucasAsociadas",
});
TipoCaraPorPeluca.belongsTo(TipoCara, {
  foreignKey: "tipo_cara_id",
  as: "tipoCara",
});

module.exports = {
  Peluca,
  TipoCara,
  TipoCaraPorPeluca,
};

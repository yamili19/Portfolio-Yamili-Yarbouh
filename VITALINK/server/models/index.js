//Este archivo se utiliza para realizar las llamadas a cada tabla que sea necesaria

const models = {
  peluqueriaModel: require("./mariaDb/peluqueria"),
  barrioModel: require("./mariaDb/barrio"),
  localidadModel: require("./mariaDb/localidad"),
};

module.exports = models;

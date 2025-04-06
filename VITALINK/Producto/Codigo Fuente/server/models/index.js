//Este archivo se utiliza para realizar las llamadas a cada tabla que sea necesaria

const models = {
  peluqueriaModel: require("./mariaDb/peluqueria"),
  barrioModel: require("./mariaDb/barrio"),
  localidadModel: require("./mariaDb/localidad"),
  donacionModel: require("./mariaDb/donacion"),
  donanteModel: require("./mariaDb/donante"),
  obraSocialModel: require("./mariaDb/obraSocial"),
  usuarioModel: require("./mariaDb/usuario"),
  pedidoPelucaModel: require("./mariaDb/pedidoPeluca"),
  pelucaModel: require("./mariaDb/peluca"),
  tipoPeloModel: require("./mariaDb/tipoPelo"),
  estadoPelucaModel: require("./mariaDb/estadoPeluca"),
  vinculoModel: require("./mariaDb/vinculo"),
  estadoPrestamoModel: require("./mariaDb/estadoPrestamo"),
  prestamoModel: require("./mariaDb/prestamo"),
  ciudadModel: require("./mariaDb/ciudad"),
  clienteModel: require("./mariaDb/cliente"),
  afiliacionModel: require("./mariaDb/afiliacion"),
  tipoCaraModel: require("./mariaDb/tipoCara"),
  tipoCaraXPelucaModel: require("./mariaDb/tipoCaraPorPeluca"),
  listaEsperaModel: require("./mariaDb/listaEspera"),
  datosBancariosModel: require("./mariaDb/datosBancarios"),
  rolesModel: require("./mariaDb/rol"),
};

require("./mariaDb/relacionesPelucas");

module.exports = models;

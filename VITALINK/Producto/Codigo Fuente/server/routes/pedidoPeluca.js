/**
 * Archivo que se utiliza para definir las peticiones http para los pedidos de pelucas
 */

const express = require("express");
const {
  getAllPedidosPeluca,
  createPedidoPeluca,
  updatePedidoPeluca,
  deletePedidoPeluca,
  getPedidoPelucaByFecha,
  getPedidosEntreFechas,
} = require("../controllers/pedidoPeluca");
const {
  validatorCreatePedidoPeluca,
  validatorUpdatePedidoPeluca,
} = require("../validators/pedidoPeluca");
const router = express.Router();

//RECORDATORIO: Agregar permisos de acuero al rol

//TODO: /api/pedidos/
router.get("/", getAllPedidosPeluca);

//TODO: /api/pedidos/:fechaPedido
router.get("/:fechaPedido", getPedidoPelucaByFecha);

//TODO: /api/pedidos/
router.post("/", validatorCreatePedidoPeluca, createPedidoPeluca);

//TODO: /api/pedidos/:fechaPedido
router.put("/:fechaPedido", validatorUpdatePedidoPeluca, updatePedidoPeluca);

router.delete("/:fechaPedido", deletePedidoPeluca);

router.get("/:fechaInicio/:fechaFin");

module.exports = router;

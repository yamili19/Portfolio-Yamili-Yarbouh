const express = require("express");
const {
  getAllListaDeEspera,
  getListaDeEsperaByNroOrden,
  createListaEspera,
  deleteListaEspera, 
} = require("../controllers/listaEspera");

const router = express.Router();

// Ruta para obtener todas las entradas de la lista de espera
// TODO: /api/listaDeEspera
router.get("/", getAllListaDeEspera);

// Ruta para obtener una entrada de la lista de espera por número de orden
// TODO: /api/listaDeEspera/:nroOrden
router.get("/:nroOrden", getListaDeEsperaByNroOrden);

// Ruta para crear una nueva entrada en la lista de espera
// TODO: /api/listaDeEspera
router.post("/", createListaEspera); 

// Ruta para eliminar una entrada de la lista de espera por número de orden
// TODO: /api/listaDeEspera/:nroOrden
router.delete("/:nroOrden", deleteListaEspera); // Añadir la ruta de eliminación

module.exports = router;

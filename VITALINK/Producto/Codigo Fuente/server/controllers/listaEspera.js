const ListaDeEspera = require("../models/mariaDb/listaEspera");
const Cliente = require("../models/mariaDb/cliente");
const handleHttpError = require("../utils/handleError");

const getAllListaDeEspera = async (req, res) => {
  try {
    const listaDeEspera = await ListaDeEspera.findAllWithCliente();
    res.status(200).json(listaDeEspera);
  } catch (error) {
    console.log("Error, no se pudo obtener la lista de espera: ", error);
    handleHttpError(res, "ERROR_GET_ALL_LISTA_ESPERA", 500);
  }
};

const getListaDeEsperaByNroOrden = async (req, res) => {
  try {
    const { nroOrden } = req.params;
    const listaDeEspera = await ListaDeEspera.findByPk(nroOrden);
    if (!listaDeEspera) {
      return handleHttpError(res, "ERROR_LISTA_ESPERA_NOT_FOUND", 404);
    }

    res.status(200).json(listaDeEspera);
  } catch (error) {
    console.log("Error, no se pudo obtener el registro de la lista de espera: ", error);
    handleHttpError(res, "ERROR_GET_BY_NRO_ORDEN_LISTA_ESPERA", 500);
  }
};

// Crear un nuevo registro 
const createListaEspera = async (req, res) => {
  const { fechaSolicitud, dni, menor } = req.body;

  try {
    const cliente = await Cliente.findOne({ where: { dni } });
    if (!cliente) {
      return res.status(400).json({ error: "El cliente no existe." });
    }

    const listaDeEspera = await ListaDeEspera.create({
      fechaSolicitud,
      clienteId: cliente.dni, 
      menor,
    });

    return res.status(201).json(listaDeEspera);
  } catch (error) {
    console.error("Error al crear la lista de espera: ", error);
    return res.status(500).json({ error: "ERROR_CREATE_LISTA_ESPERA" });
  }
};


const deleteListaEspera = async (req, res) => {
  try {
    const { nroOrden } = req.params;
    const listaDeEspera = await ListaDeEspera.findByPk(nroOrden);
    if (!listaDeEspera) {
      return handleHttpError(res, "ERROR_LISTA_ESPERA_NOT_FOUND", 404);
    }

    //Eliminar
    await ListaDeEspera.destroy({
      where: { nroOrden }
    });

    return res.status(200).send();
  } catch (error) {
    console.log("Error al eliminar el registro de la lista de espera: ", error);
    handleHttpError(res, "ERROR_DELETE_LISTA_ESPERA", 500);
  }
};

module.exports = { 
  getAllListaDeEspera, 
  getListaDeEsperaByNroOrden, 
  createListaEspera,
  deleteListaEspera,
};

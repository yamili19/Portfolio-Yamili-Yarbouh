const { clienteModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllCliente = async (req, res) => {
  try {
    const clientes = await clienteModel.findAllClienteWithCiudad();
    res.status(200).json(clientes);
  } catch (error) {
    console.log("Error, no se pudo obtener los clientes: ", error);
    handleHttpError(res, "ERROR_GET_ALL_CLIENTE", 500);
  }
};

const getClienteByDni = async (req, res) => {
  try {
    const { dni } = req.params;
    const cliente = await clienteModel.findByPk(dni);
    if (!cliente) {
      return handleHttpError(res, "ERROR_CLIENTE_NOT_FOUND", 404);
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.log("Error, no se pudo obtener el cliente: ", error);
    handleHttpError(res, "ERROR_GET_BY_DNI_CLIENTE", 500);
  }
};

module.exports = { getAllCliente, getClienteByDni };

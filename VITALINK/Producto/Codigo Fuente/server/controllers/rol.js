/**
 * Archivo que se utiliza para definir el controlador para el rol del usuario
 */

const { rolesModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllRoles = async (req, res) => {
  try {
    const roles = await rolesModel.findAll({});
    res.status(200).json(roles);
  } catch (error) {
    console.log("Error al intentar obtener los roles de usuario: ", error);
    handleHttpError(res, "ERROR_GET_ALL_ROLES", 500);
  }
};

module.exports = { getAllRoles };

/**
 * Archivo controlador para el manejo de los usuarios
 */

const { Op, where } = require("sequelize");
const { usuarioModel } = require("../models");
const handleHttpError = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");
const { sequelize } = require("../config/mariaDb");

const getAllUsers = async (req, res) => {
  try {
    const users = await usuarioModel.findAllUsersWithRol();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error al intentar obtener los usuarios: ", error);
    handleHttpError(res, "ERROR_GET_ALL_USERS", 500);
  }
};

const getAllUsersPagination = async (req, res) => {
  try {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    //Se valida que el valor de la página sea válido
    if (isNaN(page) || page < 1) {
      page = 1; //Valor por defecto = 1
    }

    //Se valida que el limite de usuarios sea válido
    if (isNaN(limit) || limit < 1 || limit > 5) {
      limit = 5; //Valor por defecto = 10
    }

    const offset = (page - 1) * limit;

    //Se obtienen los 10 usuarios correspondientes a la página solicitada
    const { count, rows: users } =
      await usuarioModel.findAllUsersWithRolPagination({ limit, offset });

    res.status(200).json({
      totalUsuarios: count,
      totalPaginas: Math.ceil(count / limit),
      numeroPagina: page,
      users,
    });
  } catch (error) {
    console.log("Error al intentar obtener los usuarios: ", error);
    handleHttpError(res, "ERROR_GET_ALL_USERS", 500);
  }
};

const getUserByUserName = async (req, res) => {
  try {
    const { nombreUsuario } = req.params;

    const user = await usuarioModel.findOneUserWithRol(nombreUsuario);

    if (!user) {
      console.log("No se encontro el usuario con nombre: ", nombreUsuario);
      return handleHttpError(res, "ERROR_USER_NOT_FOUND", 404);
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error al intentar encontrar el usuario: ", error);
    handleHttpError(res, "ERROR_GET_USER_BY_USER_NAME", 500);
  }
};

const updateUserRol = async (req, res) => {
  const { nombreUsuario } = req.params;
  try {
    const { rol } = req.body;

    const user = await usuarioModel.findOne({
      where: { nombreUsuario: nombreUsuario },
    });

    if (!user) {
      return handleHttpError(res, "ERROR_USER_NOT_FOUND", 404);
    }

    await usuarioModel.update(
      { rol },
      { where: { nombreUsuario: nombreUsuario } }
    );

    const usuarioActualizado = await usuarioModel.findOneUserWithRol(
      nombreUsuario
    );

    res.status(200).json({
      message: "Rol del usuario actualizado con éxito",
      data: usuarioActualizado,
    });
  } catch (error) {
    console.log("Error, no se pudo modificar el rol del usuario: ", error);
    handleHttpError(res, "ERROR_UPDATE_USER_ROL", 500);
  }
};

//Caso de olvido de contraseña
const updateUserPassword = async (req, res) => {
  const { nombreUsuario } = req.params;
  try {
    const { password, passwordConfirm } = req.body;

    //Se controla que las contraseñas coincidan
    if (password !== passwordConfirm) {
      console.log("Error, las contraseñas no coinciden");
      return handleHttpError(res, "ERROR_PASSWORD_MISMATCH", 400);
    }

    //Se verifica la existencia del usuario
    const user = await usuarioModel.findOne({
      where: { nombreUsuario: nombreUsuario },
    });

    if (!user) {
      return handleHttpError(res, "ERROR_USER_NOT_FOUND", 404);
    }

    //Se actualiza la contraseña del usuario
    const passwordHash = await encrypt(password);

    await usuarioModel.update(
      { password: passwordHash },
      { where: { nombreUsuario: nombreUsuario } }
    );

    const usuarioActualizado = await usuarioModel.findOneUserWithRol(
      nombreUsuario
    );

    res.status(200).json({
      message: "Contraseña del usuario actualizada con éxito",
      data: usuarioActualizado,
    });
  } catch (error) {
    console.log(
      "Error, no se pudo modificar la contraseña del usuario: ",
      error
    );
    handleHttpError(res, "ERROR_UPDATE_USER_PASSWORD", 500);
  }
};

//Caso de gestión de contraseña (Usuario autenticado)
const updateUserPasswordAuth = async (req, res) => {
  const { nombreUsuario } = req.params;
  const { passwordActual, nuevaPassword, confirmarPassword } = req.body;
  try {
    //Se valida la existencia del usuario
    const user = await usuarioModel.findOne({
      where: { nombreUsuario: nombreUsuario },
    });

    if (!user) {
      return handleHttpError(res, "ERROR_USER_NOT_FOUND", 404);
    }

    //Se valida que la contraseña actual sea la correcta
    const checkPasswordActual = await compare(passwordActual, user.password);
    if (!checkPasswordActual) {
      return handleHttpError(res, "ERROR_PASSWORD_INVALID", 401);
    }

    //Se valida que la nueva contraseña y la confirmación coincidan
    if (nuevaPassword !== confirmarPassword) {
      return handleHttpError(res, "ERROR_PASSWORD_MISMATCH", 400);
    }

    //Se valida que la nueva contraseña sea diferente a la actual
    const checkPassword = await compare(nuevaPassword, user.password);
    if (checkPassword) {
      return handleHttpError(res, "ERROR_SAME_PASSWORD", 400);
    }

    //Se actualiza la contraseña del usuario logueado
    const nuevaPasswordHash = await encrypt(nuevaPassword);

    await usuarioModel.update(
      { password: nuevaPasswordHash },
      { where: { nombreUsuario: nombreUsuario } }
    );

    //Se obtiene el usuario
    const usuarioActualizado = await usuarioModel.findOneUserWithRol(
      nombreUsuario
    );

    res.status(200).json({
      message: "Contraseña del usuario logueado actualizada con éxito",
      data: usuarioActualizado,
    });
  } catch (error) {
    console.log(
      "Error, no se pudo actualizar la contraseña del usuario autenticado"
    );
    handleHttpError(res, "ERROR_UPDATE_USER_PASSWORD_AUTH", 500);
  }
};

const updateUserProfile = async (req, res) => {
  const { nombreUsuario } = req.params;
  const { nuevoNombreUsuario, nuevoEmail } = req.body;
  try {
    const user = await usuarioModel.findOne({
      where: { nombreUsuario: nombreUsuario },
    });

    if (!user) {
      return handleHttpError(res, "ERROR_USER_NOT_FOUND", 404);
    }

    const updateProfile = {};
    if (nuevoNombreUsuario) {
      //Se verifica si no existe un usuario con ese mismo nombre
      const upperUserName = nuevoNombreUsuario.toUpperCase();
      const existUser = await usuarioModel.findOne({
        where: sequelize.where(
          sequelize.fn("upper", sequelize.col("nombreUsuario")),
          upperUserName
        ),
        attributes: ["nombreUsuario"],
      });

      if (existUser) {
        return handleHttpError(res, "ERROR_USER_NAME_EXIST", 400);
      } else {
        updateProfile.nombreUsuario = nuevoNombreUsuario;
      }
    }
    if (nuevoEmail) {
      const existEmail = await usuarioModel.findOne({
        where: { email: nuevoEmail },
      });

      if (existEmail) {
        return handleHttpError(res, "ERROR_EMAIL_EXIST", 400);
      } else {
        updateProfile.email = nuevoEmail;
      }
    }

    //Se valida que al menos un campo fue modificado
    if (Object.keys(updateProfile).length === 0) {
      return handleHttpError(res, "ERROR_NO_DATA_NO_UPDATE", 400);
    }

    //Se actualiza el perfil del usuario
    await usuarioModel.update(updateProfile, {
      where: { nombreUsuario: nombreUsuario },
    });

    let usuarioActualizado = null;
    if (updateProfile.nombreUsuario || updateProfile.email) {
      if (updateProfile.nombreUsuario) {
        usuarioActualizado = await usuarioModel.findOne({
          where: { nombreUsuario: updateProfile.nombreUsuario },
        });
      } else {
        usuarioActualizado = await usuarioModel.findOne({
          where: { email: updateProfile.email },
        });
      }
    }

    const usuarioPerfil = {
      nombreUsuario: usuarioActualizado.nombreUsuario,
      email: usuarioActualizado.email,
      rol: usuarioActualizado.rol,
    };

    res.status(200).json({
      message: "Perfil del Usuario actualizado con éxito",
      data: usuarioPerfil,
    });
  } catch (error) {
    console.log("Error, no se pudo actualizar perfil del usuario: ", error);
    handleHttpError(res, "ERROR_UPDATE_USER_PROFILE");
  }
};

const deleteUser = async (req, res) => {
  const { nombreUsuario } = req.params;
  try {
    const user = await usuarioModel.findOne({
      where: { nombreUsuario: nombreUsuario },
    });

    if (!user) {
      return handleHttpError(res, "ERROR_USER_NOT_FOUND", 404);
    }

    await user.destroy();

    res
      .status(200)
      .json({ message: "Usuario eliminado con éxito", data: user });
  } catch (error) {
    console.log('"Error al intentar eliminar el usuario: ', error);
    handleHttpError(res, "ERROR_DELETE_USER", 500);
  }
};

const getSearchUsers = async (req, res) => {
  try {
    const { nombreUsuario, email, rol } = req.query;

    //Se busca el/los usuarios con las condiciones de búsqueda
    const users = await usuarioModel.searchUsers({ nombreUsuario, email, rol });
    res.status(200).json(users);
  } catch (error) {
    console.log("Error al buscar usuarios: ", error);
    handleHttpError(res, "ERROR_SEARCH_USERS", 500);
  }
};

module.exports = {
  getAllUsers,
  getAllUsersPagination,
  getUserByUserName,
  getSearchUsers,
  updateUserRol,
  updateUserPassword,
  updateUserProfile,
  updateUserPasswordAuth,
  deleteUser,
};

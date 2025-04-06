/**
 * Archivo que se utiliza para manejar el registro y el login de usuario
 */

const { Op } = require("sequelize");
const { usuarioModel } = require("../models");
const { sequelize } = require("../config/mariaDb");
const handleHttpError = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSing } = require("../utils/handleToken");

//Controlador para registrar un usuario

const registerCtrl = async (req, res) => {
  const { nombreUsuario, email, password } = req.body;
  try {
    //Se convierte el nombre de usuario todo en mayuscula para facilitar la comparación
    const upperNombreUsuario = nombreUsuario.toUpperCase();

    //Se verifica si ya existe un usuario con el nombre de usuario o el email ingresado
    const existingUser = await usuarioModel.findOne({
      where: {
        [Op.or]: [
          sequelize.where(
            sequelize.fn("upper", sequelize.col("nombreUsuario")),
            upperNombreUsuario
          ),
          { email },
        ],
      },
    });

    //En caso que exista el usuario se lanza un error
    if (existingUser) {
      return handleHttpError(res, "ERROR_USER_EXIST", 400);
    }

    //Si no existe se encripta la contraseña y se registra el nuevo usuario
    const passwordHash = await encrypt(password);
    const dataUser = {
      nombreUsuario,
      email,
      password: passwordHash,
    };

    const newUser = await usuarioModel.create(dataUser);
    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", data: newUser });
  } catch (error) {
    console.log("Error, no se pudo registrar el usuario: ", error);
    handleHttpError(res, "ERROR_POST_REGISTER_USER", 500);
  }
};

//Controlador para el login del usuario
const loginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usuarioModel.findOne({
      where: { email },
    });
    //Primero se verifica si existe un usuario con el email ingresado
    if (!user) {
      console.log("Error, el email es invaldo");
      return handleHttpError(res, "ERROR_EMAIL_INVALID", 401);
    }

    //Si existe el usuario, se verifica la contraseña del usuario
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      console.log("Error, la contraseña es incorrecta");
      return handleHttpError(res, "ERROR_PASSWORD_INVALID", 401);
    }

    //Se genera token de sesión
    const tokenSession = await tokenSing(user);

    //Email y contraseña correcta
    res.status(200).json({
      message: "Inicio de Sesión exitoso",
      data: {
        email: user.email,
        usuario: user.nombreUsuario,
      },
      token: tokenSession,
    });
  } catch (error) {
    console.log("Error, no se pudo loguear al usuario: ", error);
    handleHttpError(res, "ERROR_POST_LOGIN_USER", 500);
  }
};

module.exports = { registerCtrl, loginCtrl };

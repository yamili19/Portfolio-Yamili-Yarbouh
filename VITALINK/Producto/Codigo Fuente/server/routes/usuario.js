/**
 * Archivo que se utiliza para manejar las peticiones http de los usuarios
 */

const express = require("express");
const {
  getAllUsers,
  getUserByUserName,
  updateUserRol,
  deleteUser,
  getAllUsersPagination,
  getSearchUsers,
  updateUserPassword,
  updateUserProfile,
  updateUserPasswordAuth,
} = require("../controllers/usuario");
const {
  validatorUsuario,
  validatorSearchUsuario,
  validatorPasswordUsuario,
  validatorPasswordUsuarioAuth,
  validatorProfileUsuario,
} = require("../validators/usuario");
const { checkAuth } = require("../middleware/checkAuth");
const checkRoleAuth = require("../middleware/checkRoleAuth");
const router = express.Router();

router.get("/", checkAuth, checkRoleAuth(["Admin"]), getAllUsers);

router.get(
  "/paginados",
  checkAuth,
  checkRoleAuth(["Admin"]),
  getAllUsersPagination
);

router.get(
  "/buscar",
  checkAuth,
  checkRoleAuth(["Admin"]),
  validatorSearchUsuario,
  getSearchUsers
);

router.get(
  "/:nombreUsuario",
  checkAuth,
  checkRoleAuth(["Admin"]),
  getUserByUserName
);

router.patch(
  "/:nombreUsuario",
  checkAuth,
  checkRoleAuth(["Admin"]),
  validatorUsuario,
  updateUserRol
);

//Ruta para la gestión de contraseña (Usuario autenticado)
router.patch(
  "/gestion-password/:nombreUsuario",
  checkAuth,
  checkRoleAuth(["Coordinadora General", "Admin", "Peluquero", "Usuario"]),
  validatorPasswordUsuarioAuth,
  updateUserPasswordAuth
);

//Ruta para la recuperación de contraseña
router.patch(
  "/password/:nombreUsuario",
  validatorPasswordUsuario,
  updateUserPassword
);

router.patch(
  "/perfil/:nombreUsuario",
  checkAuth,
  checkRoleAuth(["Coordinadora General", "Admin", "Peluquero", "Usuario"]),
  validatorProfileUsuario,
  updateUserProfile
);

router.delete(
  "/:nombreUsuario",
  checkAuth,
  checkRoleAuth(["Admin"]),
  deleteUser
);

module.exports = router;

import { useContext, useEffect, useState } from "react";
import UsuarioTable from "../../components/usuario/UsuarioTable";
import AuthContext from "../../context/auth/AuthContext";
import {
  deleteUsuario,
  fetchUsuarios,
  updateUserRol,
} from "../../services/usuariosService";
import { fetchRoles } from "../../services/rolService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../../utils/sweetAlertGeneralize";
import { useNavigate } from "react-router-dom";

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const { userLog } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsuarios();
    loadRoles();
  }, []);

  const loadUsuarios = async () => {
    try {
      const usuariosList = await fetchUsuarios(userLog.token);
      setUsuarios(usuariosList);
    } catch (error) {
      //MySwal.close();
      if (error.message === "ERROR_USER_UNAUTHORIZED") {
        console.log("Error, acceso denegado");
        showErrorAlert(
          "Acceso Denegado, su usuario no tiene permisos para acceder a este recurso."
        );
        navigate("/inicio");
      } else {
        console.log("Error al obtener los usuarios: ", error);
      }
    }
  };

  const loadRoles = async () => {
    try {
      const rolesList = await fetchRoles();
      setRoles(rolesList);
    } catch (error) {
      console.log("Error al obtener los roles de usuarios: ", error);
    }
  };

  /**
   * Función para manejar la eliminación de un usuario
   * @param {*} nombreUsuario - Pasar el nombre del usuario a eliminar
   */
  const handleDeleteUsuario = async (nombreUsuario) => {
    try {
      showLoadingAlert("Eliminando Usuario...");
      const usuario = await deleteUsuario(userLog.token, nombreUsuario);
      MySwal.close();
      console.log("Usuario eliminado correctamente: ", usuario);
      showSuccessAlert(
        `El Usuario ${nombreUsuario} ha sido eliminado exitosamente.`
      );
      loadUsuarios();
    } catch (error) {
      MySwal.close();
      if (error.message === "ERROR_USER_UNAUTHORIZED") {
        console.log("Error, acceso denegado");
        showErrorAlert(
          "Acceso Denegado, su usuario no tiene permisos para acceder a este recurso."
        );
        navigate("/inicio");
      } else {
        console.log("Error al intentar eliminar usuario: ", error);
        showErrorAlert("Error al intentar eliminar el Usuario.");
      }
    }
  };

  /**
   * Función para manejar la actualización del rol del usuario
   * @param {*} nombreUsuario Pasar el nombre del usuario a actualizar su rol
   * @param {*} rol Pasar el ID del rol
   */
  const handleUpdateUserRol = async (nombreUsuario, rol) => {
    try {
      showLoadingAlert("Actualizando rol del Usuario...");
      const usuarioActualizado = await updateUserRol(
        userLog.token,
        nombreUsuario,
        Number(rol)
      );
      MySwal.close();
      console.log(
        "Rol del usuario actualizado correctamente: ",
        usuarioActualizado
      );
      showSuccessAlert(
        `Se ha actualizado el rol del Usuario ${nombreUsuario} a ${usuarioActualizado.Rol.nombre} exitosamente.`
      );
      loadUsuarios();
    } catch (error) {
      MySwal.close();
      if (error.message === "ERROR_USER_UNAUTHORIZED") {
        console.log("Error, acceso denegado");
        showErrorAlert(
          "Acceso denegado, su usuario no tiene permisos para acceder a este recurso."
        );
      } else {
        console.log("Error al intentar actualizar rol del usuario: ", error);
        showErrorAlert("Error al intentar actualizar rol del Usuario.");
      }
    }
  };
  return (
    <>
      <UsuarioTable
        usuarios={usuarios}
        roles={roles}
        onDelete={handleDeleteUsuario}
        onUpdateRole={handleUpdateUserRol}
      ></UsuarioTable>
    </>
  );
};

export default UsuarioList;

import { useNavigate } from "react-router-dom";
import UserLoginForm from "../components/UserLoginForm";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
} from "../utils/sweetAlertGeneralize";
import { useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import { loginUser } from "../services/autentificacionService";

const UserLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleSubmitLoginUser = async (usuario) => {
    try {
      showLoadingAlert("Iniciando Sesión...");
      const userLog = await loginUser(usuario);
      console.log("datos del usuario: ", userLog);
      login(userLog.data, userLog);
      MySwal.close();
      navigate("/inicio");
    } catch (error) {
      MySwal.close();
      if (error.message === "ERROR_EMAIL_INVALID") {
        console.log("Error, el email ingresado es invalido: ", error);
        showErrorAlert("El Email ingresado es inválido");
      } else if (error.message === "ERROR_PASSWORD_INVALID") {
        console.log("La contraseña ingresada es invalida: ", error);
        showErrorAlert("La contraseña ingresada es inválida");
      } else {
        console.log("Error, no se pudo loguear al usuario: ", error);
        throw new Error("Error al intentar loguear el usuario");
      }
    }
  };
  return (
    <>
      <UserLoginForm onSubmit={handleSubmitLoginUser}></UserLoginForm>
    </>
  );
};

export default UserLogin;

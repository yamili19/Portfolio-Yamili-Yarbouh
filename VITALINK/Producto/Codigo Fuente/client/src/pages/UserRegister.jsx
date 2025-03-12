import UserRegisterForm from "../components/UserRegisterForm";
import { registerUser } from "../services/autentificacionService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../utils/sweetAlertGeneralize";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
  const handleSubmitRegisterUser = async (usuario) => {
    try {
      showLoadingAlert("Registrando Usuario...");
      const userData = {
        nombreUsuario: usuario.nombreUsuario.toString(),
        email: usuario.email,
        password: usuario.password.toString(),
      };
      const newUser = await registerUser(userData);
      MySwal.close();
      //console.log("Usuario registrado con exito: ", newUser);
      showSuccessAlert(`Bienvenido/a ${newUser.data.nombreUsuario} a VitaLink`);
      navigate("/login");
    } catch (error) {
      MySwal.close();
      if (error.message === "ERROR_USER_EXIST") {
        console.log("Error, el usuario ya existe");
        showErrorAlert(
          "El nombre de usuario o el email ya están registrados. Por favor, elige otros."
        );
      } else {
        console.log("Error al intentar registrar el usuario: ", error);
        showErrorAlert("Error al intentar registrar el Usuario");
      }
    }
  };
  return (
    <>
      <UserRegisterForm onSubmit={handleSubmitRegisterUser}></UserRegisterForm>
    </>
  );
};

export default UserRegister;

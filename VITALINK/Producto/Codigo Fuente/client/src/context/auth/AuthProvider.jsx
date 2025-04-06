/**
 * Archivo que se encarga de manejar la lógica del estado de la sesión del usuario
 * y el manejo de las cookies
 * SE USAN COOKIES, EN VEZ DE LOCALSTORAGE PARA MAYOR SEGURIDAD
 */

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import {
  showConfirmationAlert,
  showLoadingAlertSession,
} from "../../utils/sweetAlertGeneralize";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLog, setUserLog] = useState(null);
  const navigate = useNavigate();

  // Al cargar la aplicación, recupera la información del usuario desde las cookies
  useEffect(() => {
    const userData = Cookies.get("userData");
    const userLog = Cookies.get("userLog");

    if (userData && userLog) {
      setUser(JSON.parse(userData));
      setUserLog(JSON.parse(userLog));
    }
  }, []);

  //Función para realizar el login del usuario y generar la cookie

  /**
   * Pasar el usuario que se quiere loguear
   * @param {*} userData
   */
  const login = (userData, userLog) => {
    setUser(userData);
    setUserLog(userLog);
    Cookies.set("userData", JSON.stringify(userData), { expires: 1 / 6 });
    Cookies.set("userLog", JSON.stringify(userLog), { expires: 1 / 6 });
    console.log("Cookies del usuario: ", user, userLog);
  };

  //Función para realizar el logout del usuario y eliminar la cookie

  const logout = () => {
    showConfirmationAlert("¿Desea cerrar sesión?", () => {
      showLoadingAlertSession("Cerrando sesión...");
      setTimeout(() => {
        setUser(null);
        setUserLog(null);
        Cookies.remove("userData");
        Cookies.remove("userLog");
        navigate("/login");
      }, 2000);
    });
  };
  return (
    <AuthContext.Provider value={{ user, userLog, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

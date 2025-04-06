/**
 * Componente que se usa para definir las rutas que son privadas
 */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  // Si el usuario no está autenticado, redirige al login.
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

/**
 * Componente que se usa para definir las rutas que son publicas
 */

import { useContext, useEffect } from "react";
//import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/aplicaciones");
    }
  }, [user, navigate]);

  return !user ? element : null;
};

// Si el usuario está autenticado, redirige al inicio.
//return user ? <Navigate to="/inicio" /> : element;

export default PublicRoute;

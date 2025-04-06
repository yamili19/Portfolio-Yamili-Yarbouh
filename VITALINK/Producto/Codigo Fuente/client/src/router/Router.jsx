import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Table from "../pages/Table";
import ConsultPeluqueria from "../pages/ConsultPeluqueria";
import EditPeluqueria from "../pages/EditPeluqueria";
import DonationRegister from "../pages/DonationRegister";
import DonationList from "../pages/DonationList";
import ObraSocialRegister from "../pages/ObraSocialRegister";
import ObraSocialList from "../pages/ObraSocialList";
import ObraSocialEdit from "../pages/ObraSocialEdit";
import UserRegister from "../pages/UserRegister";
import Home from "../pages/Home";
import UserLogin from "../pages/UserLogin";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PedidoPelucaRegister from "../pages/PedidoPelucaRegister";
import PedidoPelucaList from "../pages/PedidoPelucaList";
import PedidoPelucaEdit from "../pages/PedidoPelucaEdit";
import DonationEdit from "../pages/DonationEdit";
import PelucaRegister from "../pages/PelucaRegister";
import PelucaList from "../pages/PelucaList";
import PrestamoList from "../pages/prestamo/PrestamoList";
import PrestamoRegister from "../pages/prestamo/PrestamoRegister";
import PrestamoEdit from "../pages/prestamo/PrestamoEdit";
import PrestamoRenovar from "../pages/prestamo/PrestamoRenovar";
import PrestamoConsult from "../pages/prestamo/PrestamoConsult";
import ClienteList from "../pages/cliente/ClienteList";
import DonanteList from "../pages/donante/DonanteList";
import PelucaConsult from "../pages/peluca/PelucaConsult";
import Aplicaciones from "../pages/dashboard/Aplicaciones";
import RecomendarPeluca from "../pages/recomendarPeluca/RecomendarPeluca";
import MisReportesPage from "../pages/reporte/MisReportesPage";
import PeluqueriasMap from "../pages/PeluqueriasMap";

// Importación de las páginas para la Lista de Espera
import ListaEsperaList from "../pages/listaEspera/listaEsperaConsult";
import ListaEsperaRegister from "../pages/listaEspera/listaEsperaRegister";

// Importación de las páginas para la donación monetaria
import DonacionMonetaria from "../pages/donacionesMonetarias/DonacionMonetaria";
import UsuarioList from "../pages/usuario/UsuarioList";
import PerfilEdit from "../pages/usuario/PerfilEdit";
import PasswordAuthEdit from "../pages/usuario/PasswordAuthEdit";

const Router = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.2/mdb.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<PublicRoute element={<Home />} />} />
      <Route path="/login" element={<PublicRoute element={<UserLogin />} />} />
      <Route
        path="/registrarse"
        element={<PublicRoute element={<UserRegister />} />}
      />

      <Route path="/inicio" element={<PublicRoute element={<Home />} />} />
      <Route
        path="/aplicaciones"
        element={
          <PrivateRoute element={<Aplicaciones></Aplicaciones>}></PrivateRoute>
        }
      ></Route>
      <Route
        path="/registrarPeluca"
        element={
          <PrivateRoute
            element={<PelucaRegister></PelucaRegister>}
          ></PrivateRoute>
        }
      ></Route>
      <Route
        path="/pelucas"
        element={
          <PrivateRoute element={<PelucaList></PelucaList>}></PrivateRoute>
        }
      ></Route>
      <Route
        path="/pelucas/consultar/:codigo"
        element={
          <PrivateRoute
            element={<PelucaConsult></PelucaConsult>}
          ></PrivateRoute>
        }
      ></Route>
      <Route
        path="/registrarPeluqueria"
        element={<PrivateRoute element={<Register />} />}
      />
      <Route
        path="/peluquerias"
        element={<PrivateRoute element={<Table />} />}
      />
      <Route
        path="/peluquerias/consultar/:nombre"
        element={<PrivateRoute element={<ConsultPeluqueria />} />}
      />
      <Route
        path="/peluquerias/editar/:nombre"
        element={<PrivateRoute element={<EditPeluqueria />} />}
      />
      <Route
        path="/registrarPrestamo"
        element={
          <PrivateRoute
            element={<PrestamoRegister></PrestamoRegister>}
          ></PrivateRoute>
        }
      ></Route>
      <Route
        path="/prestamos"
        element={
          <PrivateRoute element={<PrestamoList></PrestamoList>}></PrivateRoute>
        }
      ></Route>
      <Route
        path="/prestamos/editar/:nroPrestamo"
        element={
          <PrivateRoute element={<PrestamoEdit></PrestamoEdit>}></PrivateRoute>
        }
      ></Route>
      <Route
        path="/prestamos/renovar/:nroPrestamo"
        element={
          <PrivateRoute
            element={<PrestamoRenovar></PrestamoRenovar>}
          ></PrivateRoute>
        }
      ></Route>
      <Route
        path="/prestamos/consultar/:nroPrestamo"
        element={
          <PrivateRoute
            element={<PrestamoConsult></PrestamoConsult>}
          ></PrivateRoute>
        }
      ></Route>
      <Route
        path="/clientes"
        element={
          <PrivateRoute element={<ClienteList></ClienteList>}></PrivateRoute>
        }
      ></Route>
      <Route
        path="/registrarDonacion"
        element={<PrivateRoute element={<DonationRegister />} />}
      />
      <Route
        path="/donaciones"
        element={<PrivateRoute element={<DonationList />} />}
      />
      <Route
        path="/donaciones/editar/:fecha"
        element={
          <PrivateRoute element={<DonationEdit></DonationEdit>}></PrivateRoute>
        }
      ></Route>
      <Route
        path="/donantes"
        element={
          <PrivateRoute element={<DonanteList></DonanteList>}></PrivateRoute>
        }
      ></Route>
      <Route
        path="/registrarPedido"
        element={
          <PrivateRoute
            element={<PedidoPelucaRegister></PedidoPelucaRegister>}
          ></PrivateRoute>
        }
      ></Route>
      <Route
        path="/pedidos"
        element={
          <PrivateRoute
            element={<PedidoPelucaList></PedidoPelucaList>}
          ></PrivateRoute>
        }
      ></Route>
      <Route
        path="/pedidos/editar/:fechaPedido"
        element={
          <PrivateRoute
            element={<PedidoPelucaEdit></PedidoPelucaEdit>}
          ></PrivateRoute>
        }
      ></Route>
      <Route
        path="/registrarObraSocial"
        element={<PrivateRoute element={<ObraSocialRegister />} />}
      />
      <Route
        path="/obrasSociales"
        element={<PrivateRoute element={<ObraSocialList />} />}
      />
      <Route
        path="/obrasSociales/editar/:id"
        element={<PrivateRoute element={<ObraSocialEdit />} />}
      />

      <Route
        path="/admin/usuarios"
        element={
          <PrivateRoute element={<UsuarioList></UsuarioList>}></PrivateRoute>
        }
      ></Route>

      <Route
        path="/reportes"
        element={
          <PrivateRoute
            element={<MisReportesPage></MisReportesPage>}
          ></PrivateRoute>
        }
      ></Route>

      <Route
        path="/recomendarPelucas"
        element={
          <PrivateRoute
            element={<RecomendarPeluca></RecomendarPeluca>}
          ></PrivateRoute>
        }
      ></Route>

      <Route
        path="/listaEspera"
        element={<PrivateRoute element={<ListaEsperaList />} />}
      />
      <Route
        path="/registrarListaEspera"
        element={
          <PrivateRoute
            element={<ListaEsperaRegister></ListaEsperaRegister>}
          ></PrivateRoute>
        }
      />
      <Route path="/peluquerias/mapa" element={<PeluqueriasMap />} />
      <Route path="/donaciones-monetarias" element={<DonacionMonetaria />} />
      <Route
        path="/usuarios/mi-perfil"
        element={
          <PrivateRoute element={<PerfilEdit></PerfilEdit>}></PrivateRoute>
        }
      ></Route>
      <Route
        path="/usuarios/gestion-contrasena"
        element={
          <PrivateRoute
            element={<PasswordAuthEdit></PasswordAuthEdit>}
          ></PrivateRoute>
        }
      ></Route>

      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default Router;

//import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import AuthContext from "../context/auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faScissors,
  faHandHoldingHeart,
  faSignOutAlt,
  faUserPlus,
  faSignInAlt,
  faBoxOpen,
  faHandshake,
  faRobot,
  faChartBar,
  faUserCog,
  faUser,
  faKey,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../css/navbar.css";
import ImgLogoVitaLink from "../assets/images/img-logo-removebg.png";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      bg={scrolling ? "pink" : "transparent"}
      expand="lg"
      className={`custom-navbar ${activeKey ? "active" : ""}`}
    >
      <Navbar.Brand
        as={Link}
        to="/inicio"
        onClick={() => setActiveKey("/inicio")}
      >
        <img
          src={ImgLogoVitaLink}
          alt="Vitalink Logo"
          style={{ height: "60px", width: "auto", marginRight: "15px" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown
            title={
              <>
                <FontAwesomeIcon icon={faLayerGroup} /> Aplicaciones
              </>
            }
            id="navbar-aplicaiones"
            active={activeKey === "/aplicaciones"}
            onClick={() => setActiveKey("/aplicaciones")}
          >
            <NavDropdown.Item
              as={Link}
              to="/aplicaciones"
              onClick={() => setActiveKey("/aplicaciones")}
            >
              Mis Aplicaciones
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <>
                <FontAwesomeIcon icon={faBoxOpen} /> Pelucas
              </>
            }
            id="navbar-pelucas"
            active={
              activeKey === "/registrarPeluca" || activeKey === "/pelucas"
            }
            onClick={() => setActiveKey("/registrarPeluca")}
          >
            <NavDropdown.Item
              as={Link}
              to="/registrarPeluca"
              onClick={() => setActiveKey("/registrarPeluca")}
            >
              Añadir Peluca
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/pelucas"
              onClick={() => setActiveKey("/pelucas")}
            >
              Inventario Pelucas
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <>
                <FontAwesomeIcon icon={faScissors} /> Peluquerías
              </>
            }
            id="navbar-peluquerias"
            active={
              activeKey === "/registrarPeluqueria" ||
              activeKey === "/peluquerias"
            }
            onClick={() => setActiveKey("/registrarPeluqueria")}
          >
            <NavDropdown.Item
              as={Link}
              to="/registrarPeluqueria"
              onClick={() => setActiveKey("/registrarPeluqueria")}
            >
              Registrar Peluquería
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/peluquerias"
              onClick={() => setActiveKey("/peluquerias")}
            >
              Peluquerías Afiliadas
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <>
                <FontAwesomeIcon icon={faHandshake} /> Préstamos
              </>
            }
            id="navbar-prestamos"
            active={
              activeKey === "/registrarPrestamo" ||
              activeKey === "/prestamos" ||
              activeKey === "/clientes"
            }
            onClick={() => setActiveKey("/registrarPrestamo")}
          >
            <NavDropdown.Item
              as={Link}
              to="/registrarPrestamo"
              onClick={() => setActiveKey("/registrarPrestamo")}
            >
              Registrar Préstamo
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/prestamos"
              onClick={() => setActiveKey("/prestamos")}
            >
              Préstamos Realizados
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/clientes"
              onClick={() => setActiveKey("/clientes")}
            >
              Mis Clientes
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title={
              <>
                <FontAwesomeIcon icon={faHandHoldingHeart} /> Donaciones
              </>
            }
            id="navbar-donaciones"
            active={
              activeKey === "/registrarDonacion" ||
              activeKey === "/donaciones" ||
              activeKey === "/donantes"
            }
            onClick={() => setActiveKey("/registrarDonacion")}
          >
            <NavDropdown.Item
              as={Link}
              to="/registrarDonacion"
              onClick={() => setActiveKey("/registrarDonacion")}
            >
              Registrar Donación
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/donaciones"
              onClick={() => setActiveKey("/donaciones")}
            >
              Donaciones Realizadas
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/donantes"
              onClick={() => setActiveKey("/donantes")}
            >
              Donantes
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <>
                <FontAwesomeIcon icon={faChartBar} /> Reportes
              </>
            }
            id="navbar-reportes"
            active={activeKey === "/reportes"}
            onClick={() => setActiveKey("/reportes")}
          >
            <NavDropdown.Item
              as={Link}
              to="/reportes"
              onClick={() => setActiveKey("/reportes")}
            >
              Mis Reportes
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title={
              <>
                <FontAwesomeIcon icon={faUserCog} /> Gestión Usuarios
              </>
            }
            id="navbar-usuarios"
            active={activeKey === "/admin/usuarios"}
            onClick={() => setActiveKey("/admin/usuarios")}
          >
            <NavDropdown.Item
              as={Link}
              to="/admin/usuarios"
              onClick={() => setActiveKey("/admin/usuarios")}
            >
              Usuarios
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title={
              <>
                <FontAwesomeIcon icon={faRobot} /> Recomendar Peluca
              </>
            }
            id="navbar-recomendeacion"
            active={activeKey === "/recomendarPelucas"}
            onClick={() => setActiveKey("/recomendarPelucas")}
          >
            <NavDropdown.Item
              as={Link}
              to="/recomendarPelucas"
              onClick={() => setActiveKey("/recomendarPelucas")}
            >
              Consulta la Mejor Peluca Para Ti
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="ms-auto">
          {user ? (
            <>
              <NavDropdown
                title={
                  <>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="me-2"
                    ></FontAwesomeIcon>
                    Bienvenido/a, {user.usuario}
                  </>
                }
                align="end"
              >
                <NavDropdown.Item as={Link} to="/usuarios/mi-perfil">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="me-2"
                  ></FontAwesomeIcon>
                  Mi Perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/usuarios/gestion-contrasena">
                  <FontAwesomeIcon
                    icon={faKey}
                    className="me-2"
                  ></FontAwesomeIcon>
                  Gestión de Contraseña
                </NavDropdown.Item>
                <NavDropdown.Divider></NavDropdown.Divider>
                <NavDropdown.Item onClick={logout}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="me-2"
                  ></FontAwesomeIcon>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="login-link">
                <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
              </Nav.Link>
              <Nav.Link as={Link} to="/registrarse">
                <FontAwesomeIcon icon={faUserPlus} /> Registrarse
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

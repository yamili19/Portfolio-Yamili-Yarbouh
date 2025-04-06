import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faScissors,
  faHandHoldingHeart,
  faGift,
  faHandshake,
  faBoxOpen,
  faBuilding,
  faRobot,
  faChartBar,
  faClock,
  faDonate,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { keyframes } from "@mui/system";
//import { icon } from "leaflet";

const AplicacionEstructura = () => {
  const navigate = useNavigate();
  const aplicaciones = [
    {
      title: "Pelucas",
      path: "/pelucas",
      icon: faBoxOpen,
      info: "Gestiona el Inventario de Pelucas.",
      color: "#00FF00",
    },
    {
      title: "Peluquerías",
      path: "/peluquerias",
      icon: faScissors,
      info: "Registra y consulta las Peluquerías asociadas.",
      color: "#FFFF00",
    },
    {
      title: "Donaciones",
      path: "/donaciones",
      icon: faHandHoldingHeart,
      info: "Registra y agradece las Donaciones de Cabello.",
      color: "#FF0000",
    },
    {
      title: "Préstamos",
      path: "/prestamos",
      icon: faHandshake,
      info: "Gestiona y controla los Préstamos de Pelucas.",
      color: "#0000FF",
    },
    {
      title: "Pedidos de Pelucas",
      path: "/pedidos",
      icon: faGift,
      info: "Analiza y consulta los Pedidos de Pelucas.",
      color: "#000000",
    },
    {
      title: "Obras Sociales",
      path: "/obrasSociales",
      icon: faBuilding,
      info: "Administra las Obras Sociales disponibles.",
      color: "#800080",
    },
    {
      title: "Reportes",
      path: "/reportes",
      icon: faChartBar,
      info: "Genera y consulta informes detallados.",
      color: "#FFA500",
    },
    {
      title: "Recomendar Peluca",
      path: "/recomendarPelucas",
      icon: faRobot,
      info: "Encuentra las Pelucas que mejor se adapten a tu rostro.",
      color: "#00FFFF",
    },
    {
      title: "Lista de Espera",
      path: "/listaEspera",
      icon: faClock,
      info: "Consulta y gestiona la Lista de Espera de Pelucas.",
      color: "#FF69B4",
    },
    {
      title: "Donaciones Monetarias",
      path: "/donaciones-monetarias",
      icon: faDonate,
      info: "Realiza Donaciones Monetarias para ayudar a la fundación a seguir funcionando.",
      color: "#000000",
    },
    {
      title: "Gestión de Usuarios",
      path: "/admin/usuarios",
      icon: faUserCog,
      info: "Administra y controla los permisos, roles y acceso de los usuarios del sistema.",
      color: "#4A90E2",
    },
  ];

  // Animación de entrada de las tarjetas
  const fadeInUp = keyframes`
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  // Función para navegar a la aplicación seleccionada
  const navigateToApplication = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        padding: "16px",
        marginTop: "16px",
        marginLeft: { xs: "5px", md: "7px" },
        marginRight: { xs: "5px", md: "7px" },
      }}
    >
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={1}>
        {/* Panel Izquierdo */}
        <Box
          sx={{
            width: { xs: "100%", md: "400px" },
            backgroundColor: "#ffe4e1",
            padding: "16px",
            boxShadow: 2,
            borderRadius: "16px",
            border: "2px solid #ff69b4",
            display: { xs: "none", md: "block" },
            marginRight: "10px",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#ff69b4" }}
          >
            Menú
          </Typography>
          <Divider />
          {aplicaciones.map((app) => (
            <Link
              to={app.path}
              key={app.title}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  margin: "10px 0",
                  "&:hover": {
                    color: "#ff69b4",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  },
                }}
              >
                <FontAwesomeIcon
                  icon={app.icon}
                  style={{ marginRight: "8px" }}
                />
                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                  {app.title}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>

        {/* Contenedor de Tarjetas */}
        <Box
          sx={{
            flexGrow: 1,
            padding: "16px",
            backgroundColor: "#ffe4e1",
            borderRadius: "16px",
            border: "2px solid #ff69b4",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#ff69b4" }}
          >
            Mis Aplicaciones
          </Typography>

          <Divider sx={{ marginBottom: "16px" }} />

          <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
            {aplicaciones.map((app, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={app.title}
                sx={{
                  animation: `${fadeInUp} 0.5s ease`,
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: "forwards",
                  opacity: 0,
                  display: "flex",
                }}
              >
                <Card
                  sx={{
                    borderRadius: "16px",
                    backgroundColor: "#ffffff",
                    boxShadow: 3,
                    transition:
                      "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                      border: "2px solid #ff69b4",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: app.color,
                          borderRadius: "10px",
                          marginRight: "8px",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={app.icon}
                          style={{ fontSize: "24px", color: "white" }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#ff69b4",
                        }}
                      >
                        {app.title}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary">{app.info}</Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ borderRadius: "20px", padding: "10px 20px" }}
                      onClick={() => navigateToApplication(app.path)}
                      endIcon={
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={{ color: "white" }}
                        />
                      }
                    >
                      Ingresar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AplicacionEstructura;

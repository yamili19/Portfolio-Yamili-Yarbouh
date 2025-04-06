//import React from "react";

//import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons"; // Ícono para "Ver Reporte"
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  keyframes,
  Divider,
} from "@mui/material";
import { useState } from "react";
import ReporteDonacionPorMesPage from "../../pages/reporte/ReporteDonacionPorMesPage";
import ReportePelucasNoDevueltasPorAñoPage from "../../pages/reporte/ReportePelucasNoDevueltasPorAñoPage";
import ReporteTiempoPromedioPrestamoPage from "../../pages/reporte/ReporteTiempoPromedioPrestamoPage"
// Definimos los keyframes para la animación de entrada
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

const ReporteEstructura = () => {
  //const navigate = useNavigate();
  const [tituloReporte, setTituloReporte] = useState("");
  const [componenteSeleccionado, setComponenteSeleccionado] = useState(null);
  const reportes = [
    {
      title: "Pelucas no devueltas por Año",
      info: "Consulta la cantidad de pelucas en demora, clasificadas por año.",
      color: "#FFFACD",
      componente: <ReportePelucasNoDevueltasPorAñoPage></ReportePelucasNoDevueltasPorAñoPage>,
    },
    {
      title: "Tiempo Promedio de Préstamos",
      info: "Revisa la duración promedios de los préstamos realizados en un período específico.",
      color: "#ADD8E6",
      componente: <ReporteTiempoPromedioPrestamoPage></ReporteTiempoPromedioPrestamoPage>,
    },
    {
      title: "Donaciones por Mes",
      //path: "/reportes/donacionesPorMes",
      //components:
      info: "Analiza el total de donaciones realizadas mensualmente en el año seleccionado.",
      color: "#90EE90",
      componente: <ReporteDonacionPorMesPage></ReporteDonacionPorMesPage>,
    },
  ];

  //Función para modificar el titulo de Mis Reportes / de forma dinámica
  const handleVerReporteClick = (title) => {
    setTituloReporte(title);
    const reporteSeleccionado = reportes.find(
      (reporte) => reporte.title === title
    );
    if (reporteSeleccionado) {
      setComponenteSeleccionado(reporteSeleccionado.componente); // Establece el componente correspondiente
    }
  };
  return (
    <div className="m-4">
      {/* Título principal con una línea divisoria */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "fuchsia",
          marginBottom: "10px",
          textAlign: "left",
        }}
      >
        Mis Reportes{" "}
        {tituloReporte && (
          <>
            /{" "}
            <Typography
              component="span"
              sx={{
                fontSize: "24px",
                color: "#007bff",
                fontWeight: "normal",
              }}
            >
              {tituloReporte}
            </Typography>
          </>
        )}
      </Typography>
      <Divider
        sx={{
          borderBottomWidth: 3,
          borderColor: "fuchsia",
          marginBottom: "20px",
        }}
      />

      {/* Grid de los reportes */}
      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        {reportes.map((reporte, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={reporte.title}
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
                backgroundColor: reporte.color,
                border: "none",
                boxShadow: 3,
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                  border: "2px solid fuchsia",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "fuchsia",
                    marginBottom: "8px",
                  }}
                >
                  {reporte.title}
                </Typography>
                <Typography color="text.secondary">{reporte.info}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "20px", padding: "10px 20px" }}
                  onClick={() => handleVerReporteClick(reporte.title)}
                  endIcon={
                    <FontAwesomeIcon
                      icon={faChartBar}
                      style={{ color: "white" }}
                    />
                  }
                >
                  Ver Reporte
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Línea divisoria adicional después del grid de los reportes */}
      <Divider
        sx={{
          borderTop: 3,
          borderColor: "fuchsia",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />

      {componenteSeleccionado && (
        <>
          <div style={{ marginTop: "20px" }}>{componenteSeleccionado}</div>
          <Divider
            sx={{
              borderTop: 3,
              borderColor: "fuchsia",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />
        </>
      )}
    </div>
  );
};

export default ReporteEstructura;

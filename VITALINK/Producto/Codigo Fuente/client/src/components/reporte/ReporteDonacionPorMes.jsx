/* eslint-disable react/prop-types */
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import Loading from "../loading/Loading";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import "../../css/reporteDonacion.css";

// Función para abrir vista de impresión en PDF
const abrirVistaImpresion = () => {
  window.print();
};

// Registrar el plugin
ChartJS.register(ChartDataLabels);

// Registramos los componentes de Chart.js que se van a usar
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement, // Para el pie chart
  annotationPlugin
);

const ReporteDonacionPorMes = ({ donacionesData, year }) => {
  if (!donacionesData) {
    return <Loading></Loading>;
  }

  if (donacionesData.total === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>No se encontraron resultados</h2>
      </div>
    );
  }

  const meses = donacionesData.donacionesPorMes.map((item) => item.mes);
  const cantidades = donacionesData.donacionesPorMes.map(
    (item) => item.cantidad
  );

  // Array de colores para cada mes
  const coloresMeses = [
    "rgba(128, 255, 99, 0.5)",
    "rgba(128, 54, 162, 0.5)",
    "rgba(255, 235, 205, 0.5)",
    "rgba(184, 134, 11, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(85, 107, 47, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
  ];

  const top5Donaciones = [...donacionesData.donacionesPorMes]
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);

  const promedio =
    cantidades.reduce((acc, curr) => acc + curr, 0) / cantidades.length;

  const barData = {
    labels: meses.map((mes) => {
      const date = new Date(0, mes - 1);
      return date.toLocaleString("default", { month: "long" });
    }),
    datasets: [
      {
        label: "Donaciones por Mes",
        data: cantidades,
        backgroundColor: meses.map(
          (_, index) => coloresMeses[index % coloresMeses.length] // Colores sin transparencia
        ),
        borderColor: "#444", // Borde sólido oscuro
        borderWidth: 1, // Grosor del borde
      },
      {
        label: "Promedio",
        type: "line",
        data: Array(cantidades.length).fill(parseFloat(promedio.toFixed(2))),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        datalabels: {
          display: false, // Ocultar las etiquetas de datos
        },
      },
      {
        label: "Punto Medio",
        type: "line",
        data: cantidades,
        borderColor: "rgba(75, 192, 192, 0.7)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Color del punto circular
        pointBorderColor: "#444", // Borde del punto circular
        pointBorderWidth: 1,
        pointRadius: 8, // Radio del punto
      },
    ],
  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Total de Donaciones: ${donacionesData.total}, Año: ${year}`,
      },
      annotation: {
        annotations: {
          promedioLabel: {
            type: "label",
            xValue: 11,
            yValue: promedio,
            backgroundColor: "rgba(255, 99, 132, 0.25)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            content: `Promedio: ${promedio.toFixed(2)}`,
            enabled: true,
            position: "end",
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...cantidades) + 5, // Para asegurar espacio en el eje Y
      },
    },
  };

  const pieData = {
    labels: meses.map((mes) => {
      const date = new Date(0, mes - 1);
      return date.toLocaleString("default", { month: "long" });
    }),
    datasets: [
      {
        data: cantidades,
        backgroundColor: meses.map(
          (_, index) => coloresMeses[index % coloresMeses.length]
        ),
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const porcentaje = (
              (context.raw / donacionesData.total) *
              100
            ).toFixed(2);
            return `${context.label}: ${porcentaje}%`;
          },
        },
      },
    },
  };

  const doughnutData = {
    labels: meses.map((mes) => {
      const date = new Date(0, mes - 1);
      return date.toLocaleString("default", { month: "long" });
    }),
    datasets: [
      {
        data: cantidades,
        backgroundColor: coloresMeses,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const porcentaje = (
              (context.raw / donacionesData.total) *
              100
            ).toFixed(2);
            return `${context.label}: ${porcentaje}%`;
          },
        },
      },
      datalabels: {
        color: "black", // Color del texto
        anchor: "end", // Anclar la etiqueta al final de la línea
        align: "start", // Alinear la etiqueta hacia arriba
        offset: 10, // Desplazar la etiqueta un poco lejos del segmento
        formatter: (value, context) => {
          const porcentaje = ((value / donacionesData.total) * 100).toFixed(2);
          return `${value} (${porcentaje}%)`; // Mostrar cantidad y porcentaje
        },
        // Estilo de la línea de conexión
        borderColor: "black", // Color de la línea de conexión
        //borderWidth: 1, // Grosor de la línea de conexión
        display: (context) => context.dataset.data[context.dataIndex] > 0, // Solo mostrar si hay un valor
      },
    },
  };

  const horizontalBarData = {
    labels: meses.map((mes) => {
      const date = new Date(0, mes - 1);
      return date.toLocaleString("default", { month: "long" });
    }),
    datasets: [
      {
        label: "Donaciones",
        data: cantidades,
        backgroundColor: coloresMeses,
      },
    ],
  };

  const horizontalBarOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className="reporte-imprimible"
      style={{
        display: "flex",
        flexDirection: "column", // Cambiado a columna para las dos filas
        marginTop: "20px",
        gap: "10px",
      }}
    >
      {/* Fila superior: Gráfico de Barras, Pie Chart y Top 5 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "10px",
        }}
      >
        {/* Gráfico de Barras */}
        <div
          style={{
            flex: 2,
            marginRight: "10px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            padding: "10px",
            display: "flex",
          }}
        >
          <div style={{ flex: 1, position: "relative" }}>
            <Bar
              data={barData}
              options={barOptions}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>

        {/* Gráfico Circular y Top 5 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderBottom: "2px solid #ccc",
              textAlign: "center",
            }}
          >
            <h5>Gráfico Circular</h5>
          </div>
          <div
            style={{
              borderRadius: "10px",
              border: "1px solid #ddd",
              padding: "10px",
              alignItems: "center",
              height: "250px", // Tamaño reducido del pie chart
            }}
          >
            <Pie data={pieData} options={pieOptions} />
          </div>
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderBottom: "2px solid #ccc",
              textAlign: "center",
            }}
          >
            <h5>Top 5 Meses con Mayor Donaciones</h5>
          </div>
          <div
            style={{
              borderRadius: "10px",
              border: "1px solid #ddd",
              padding: "10px",
            }}
          >
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {top5Donaciones.map((item, index) => {
                const date = new Date(0, item.mes - 1);
                const mesNombre = date.toLocaleString("default", {
                  month: "long",
                });
                const color = coloresMeses[item.mes - 1];
                const porcentaje = (
                  (item.cantidad / donacionesData.total) *
                  100
                ).toFixed(2);
                return (
                  <li
                    key={index}
                    style={{
                      backgroundColor: color,
                      marginBottom: "5px",
                      padding: "5px",
                      borderRadius: "5px",
                      color: "#483D8B",
                    }}
                  >
                    {mesNombre}: {porcentaje}% ({item.cantidad} donaciones)
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Fila inferior: Doughnut y Horizontal Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {/* Doughnut Chart */}
        <div
          style={{
            flex: 1,
            borderRadius: "10px",
            border: "1px solid #ddd",
            padding: "10px",
            width: "300px", // Ancho fijo
            height: "450px", // Alto fijo
            margin: "0 auto", // Centrar el gráfico horizontalmente
            display: "flex", // Usar flexbox para controlar la distribución
            flexDirection: "column", // Organizar el contenido en columna
          }}
        >
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderBottom: "2px solid #ccc",
              textAlign: "center",
            }}
          >
            <h5>Gráfico de Anillos</h5>
          </div>
          <div
            style={{
              flex: 1, // Ocupa todo el espacio disponible
              display: "flex", // Usar flexbox para centrar el gráfico
              justifyContent: "center", // Centrar horizontalmente
              alignItems: "center", // Centrar verticalmente
            }}
          >
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Horizontal Bar Chart */}
        <div
          style={{
            flex: 1,
            borderRadius: "10px",
            border: "1px solid #ddd",
            padding: "10px",
            width: "300px", // Ancho fijo
            height: "450px", // Alto fijo
            margin: "0 auto", // Centrar el gráfico horizontalmente
            display: "flex", // Usar flexbox para controlar la distribución
            flexDirection: "column", // Organizar el contenido en columna
          }}
        >
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderBottom: "2px solid #ccc",
              textAlign: "center",
            }}
          >
            <h5>Gráfico de Barra Horizontal</h5>
          </div>
          <div
            style={{
              flex: 1, // Ocupa todo el espacio disponible
              display: "flex", // Usar flexbox para centrar el gráfico
              justifyContent: "center", // Centrar horizontalmente
              alignItems: "center", // Centrar verticalmente
            }}
          >
            <Bar data={horizontalBarData} options={horizontalBarOptions} />
          </div>
        </div>
      </div>

      {/* Fila de Botones */}
      {donacionesData.total > 0 && (
        <div
          className="no-print"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <button
            className="btn btn-danger"
            style={{ display: "flex", alignItems: "center", width: "180px" }}
            onClick={abrirVistaImpresion}
          >
            <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: "5px" }} />
            <div style={{ textAlign: "center" }}>Imprimir</div>
          </button>
          <button
            className="btn btn-success"
            style={{ display: "flex", alignItems: "center", width: "180px" }}
            onClick={() => window.alert("Funcionalidad en Desarrollo...")}
          >
            <FontAwesomeIcon
              icon={faFileExcel}
              style={{ marginRight: "5px" }}
            />
            <div style={{ textAlign: "center" }}>Generar Excel</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReporteDonacionPorMes;

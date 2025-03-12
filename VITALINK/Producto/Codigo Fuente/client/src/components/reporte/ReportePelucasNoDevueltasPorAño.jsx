import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";

// Función para abrir vista de impresión en PDF
const abrirVistaImpresion = () => {
    window.print();
};

const ReportePelucasNoDevueltasPorAño = ({ reportData, year1, year2 }) => {
    if (reportData.total === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h2>No se encontraron resultados</h2>
            </div>
        );
    }
    
    const total = reportData.total; 
    const pelucasAño1 = reportData.pelucasPorAño[year1];
    const pelucasAño2 = reportData.pelucasPorAño[year2];
    const totalPrestamos = reportData.totalPrestamosFinalizados;

    // Datos para el gráfico de barras existente
    const data = {
        labels: [year1, year2],
        datasets: [
            {
                label: 'Pelucas no devueltas',
                data: [pelucasAño1 || 0, pelucasAño2 || 0],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
    const anio = fecha.getFullYear();

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true, 
              text: `Total de Pelucas No Devueltas: ${total} - Años: ${year1}-${year2} - Prestamos que deberían haber finalizado a la fecha: ${totalPrestamos} - Fecha: ${dia}/${mes}/${anio}`,
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `Pelucas No Devueltas: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Años',
                },
                ticks: {
                    color: '#333',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Cantidad de Pelucas No Devueltas',
                },
                ticks: {
                    color: '#333',
                },
            },
        },
    };

    // Datos para el gráfico de anillos (Doughnut)
    const doughnutData = {
        labels: [year1, year2], // Cambia las etiquetas según los datos reales
        datasets: [
            {
                label: 'Pelucas No Devueltas',
                data: [pelucasAño1, pelucasAño2], 
                backgroundColor: ['#87CEEB', '#FFE4B5'],
                hoverBackgroundColor: ['#87CEEB', '#FFE4B5'],
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
                  (context.raw / totalPrestamos) *
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
              const porcentaje = ((value / reportData.total) * 100).toFixed(2);
              return `${value} (${porcentaje}%)`; // Mostrar cantidad y porcentaje
            },
            // Estilo de la línea de conexión
            borderColor: "black", // Color de la línea de conexión
            //borderWidth: 1, // Grosor de la línea de conexión
            display: (context) => context.dataset.data[context.dataIndex] > 0, // Solo mostrar si hay un valor
          },
        },
    };

    // Datos para el gráfico de barras horizontal
    const horizontalBarData = {
        labels: [year1, year2], 
        datasets: [
            {
                label: 'Pelucas No Devueltas',
                data: [pelucasAño1, pelucasAño2], 
                backgroundColor: ['#98FB98', '#FFE4B5', '#87CEEB'],
                borderWidth: 1,
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
              data={data}
              options={options}
              style={{ height: "100%", width: "100%" }}
            />
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
      {reportData.total > 0 && (
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

export default ReportePelucasNoDevueltasPorAño;

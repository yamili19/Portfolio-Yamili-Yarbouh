import React, { useState, useEffect } from 'react';
import {
  fetchDatosBancarios,
  updateDatosBancarios,
} from "../../services/datosBancariosService";
import {
  showLoadingAlert,
  showSuccessAlert,
  showErrorAlert,
} from "../../utils/sweetAlertGeneralize";

const DonacionMonetaria = () => {
  const [datosCuenta, setDatosCuenta] = useState(null);
  const [mensajeInspirador, setMensajeInspirador] = useState(
    'Con tu donación, podremos continuar ofreciendo pelucas oncológicas gratuitas a personas que enfrentan el cáncer, ayudándolas a recuperar su confianza y mejorar su calidad de vida. Además, nos permitirá seguir llevando a cabo campañas de prevención que salvan vidas. Tu generosidad marca la diferencia en esta lucha y nos acerca a un futuro más esperanzador para quienes más lo necesitan.'
  );
  const [modoEdicion, setModoEdicion] = useState(false);
  const [errorCBU, setErrorCBU] = useState(""); // Estado para el mensaje de error del CBU

  // Fetch de datos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await fetchDatosBancarios();
        setDatosCuenta(datos);
        console.log("Datos cuenta", datos);
      } catch (error) {
        console.error("Error al cargar los datos bancarios:", error);
      }
    };
    cargarDatos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validación específica para el campo CBU
    if (name === "cbu") {
      if (!/^\d*$/.test(value)) {
        // Solo permitir números
        return;
      }
      if (value.length > 22) {
        // Restringir a 22 caracteres
        return;
      }
    }

    setDatosCuenta((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar el mensaje de error si el CBU es válido
    if (name === "cbu" && value.length === 22) {
      setErrorCBU("");
    }
  };

  const handleMensajeChange = (e) => {
    setMensajeInspirador(e.target.value);
  };

  const toggleModoEdicion = async () => {
    if (modoEdicion) {
      // Validar campos obligatorios
      if (!datosCuenta.titular || !datosCuenta.cbu || !datosCuenta.banco) {
        showErrorAlert("Por favor, completa los campos obligatorios: Titular, CBU y Alias.");
        return;
      }
      if (datosCuenta.cbu.length !== 22) {
        showErrorAlert("El campo CBU debe tener exactamente 22 números.");
        return;
      }

      // Guardar cambios
      try {
        showLoadingAlert("Guardando cambios...");
        await updateDatosBancarios(datosCuenta);
        showSuccessAlert("Los datos bancarios han sido actualizados exitosamente.");
      } catch (error) {
        console.error("Error al actualizar los datos bancarios:", error);
        showErrorAlert("Error al intentar actualizar los datos bancarios.");
      }
    }
    setModoEdicion((prev) => !prev);
  };

  const handleCancelEdit = () => {
    setModoEdicion(false);

    // Recargar los datos originales
    const cargarDatos = async () => {
      try {
        const datos = await fetchDatosBancarios();
        setDatosCuenta(datos);
      } catch (error) {
        console.error("Error al recargar los datos bancarios:", error);
      }
    };
    cargarDatos();
  };

  if (!datosCuenta) {
    return <p>Cargando datos...</p>; // Mensaje de carga inicial
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>¡Ayúdanos a seguir ayudando!</h1>
      {modoEdicion ? (
        <textarea
          value={mensajeInspirador}
          onChange={handleMensajeChange}
          style={{ ...styles.mensaje, height: '100px' }}
        />
      ) : (
        <p style={styles.mensaje}>{mensajeInspirador}</p>
      )}

      <div style={styles.section}>
        <h2>Donar a través de transferencia bancaria</h2>
        {modoEdicion ? (
          <>
            <label>Titular:</label>
            <input
              type="text"
              name="titular"
              value={datosCuenta.titular}
              onChange={handleInputChange}
              style={styles.input}
            />
            <label>CBU:</label>
            <input
              type="text"
              name="cbu"
              value={datosCuenta.cbu}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errorCBU && <p style={styles.error}>{errorCBU}</p>}
            <label>Alias:</label>
            <input
              type="text"
              name="alias"
              value={datosCuenta.alias}
              onChange={handleInputChange}
              style={styles.input}
            />
            <label>Banco:</label>
            <input
              type="text"
              name="banco"
              value={datosCuenta.banco}
              onChange={handleInputChange}
              style={styles.input}
            />
            <label>Enlace QR:</label>
            <input
              type="text"
              name="qrSrc"
              value={datosCuenta.qr}
              onChange={handleInputChange}
              style={styles.input}
            />
          </>
        ) : (
          <>
            <img
              src={datosCuenta.qr}
              alt="QR para transferencia"
              style={styles.qr}
            />
            <p>
              <strong>Titular:</strong> {datosCuenta.titular}
            </p>
            <p>
              <strong>CBU:</strong> {datosCuenta.cbu}
            </p>
            <p>
              <strong>Alias:</strong> {datosCuenta.alias}
            </p>
            <p>
              <strong>Banco:</strong> {datosCuenta.banco}
            </p>
          </>
        )}
      </div>

      <div style={styles.section}>
        <h2>Donar a través de Mercado Pago</h2>
        {modoEdicion ? (
          <input
            type="text"
            name="linkMercadoPago"
            value={datosCuenta.mp}
            onChange={handleInputChange}
            style={styles.input}
          />
        ) : (
          <a
            href={datosCuenta.mp}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.boton}
          >
            Donar con Mercado Pago
          </a>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {modoEdicion && (
          <button
            onClick={handleCancelEdit}
            style={{
              ...styles.botonEdicion,
              backgroundColor: '#E4717A', // Rojo para cancelar
            }}
          >
            Cancelar
          </button>
        )}
        <button
          onClick={toggleModoEdicion}
          style={{
            ...styles.botonEdicion,
            backgroundColor: '#4CAF50', // Verde
          }}
        >
          {modoEdicion ? 'Guardar Cambios' : 'Editar Información'}
        </button>
      </div>

      <p style={styles.gracias}>¡Gracias por tu generosidad!</p>
    </div>
  );
};

// Estilos para el componente
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  titulo: {
    color: '#E4717A',
  },
  mensaje: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
    width: '100%',
  },
  section: {
    marginBottom: '30px',
  },
  qr: {
    width: '200px',
    height: '200px',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  boton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#318CE7', // Azul (solo para el botón de Mercado Pago)
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
  botonEdicion: {
    display: 'inline-block',
    padding: '10px 20px',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
  },
  gracias: {
    fontSize: '20px',
    color: '#388e3c',
    marginTop: '20px',
  },
};

export default DonacionMonetaria;

/**
 * Archivo generico para el uso de alertas
 */

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const MySwal = withReactContent(Swal);

// Función genérica para mostrar una alerta
export const showAlert = ({
  title = "",
  text = "",
  icon = "info",
  confirmButtonText = "OK",
  cancelButtonText = "Cancelar",
  showCancelButton = false,
  background = "#fff",
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  MySwal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    cancelButtonText,
    showCancelButton,
    background,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel();
    }
  });
};

// Función genérica para una alerta de éxito

/**
 * Pasar texto a mostrar en el cuadro de dialogo
 * @param {*} text
 */
export const showSuccessAlert = (text) => {
  showAlert({
    title: "¡Éxito!",
    text,
    icon: "success",
    confirmButtonText: "OK",
    background: "#ffecec",
  });
};

// Función genérica para una alerta de error

/**
 * Pasar texto a mostrar en el cuadro de dialogo
 * @param {*} message
 */
export const showErrorAlert = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    timer: 5000, // Ajusta el tiempo de visualización en milisegundos
    timerProgressBar: true,
    showCloseButton: true,
  });
};

// Función genérica para una alerta de confirmación

/**
 * Pasar texto a mostrar en el cuadro de dialogo y función flecha
 * @param {*} text
 * @param {*} onConfirm
 */
export const showConfirmationAlert = (text, onConfirm) => {
  showAlert({
    title: "¿Estás seguro?",
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar",
    background: "#ffecec",
    customClass: {
      popup: "swal-popup", // Clase personalizada para el popup
    },
    onConfirm,
  });
};

//Función genérica para una alerta de confirmación de eliminación
/**
 * Pasar texto a mostrar en el cuadro de dialogo y la función flecha
 * @param {*} text
 * @param {*} onConfirm
 */
export const showDeleteConfirmationAlert = (text, onConfirm) => {
  showAlert({
    title: "¿Estás seguro?",
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    background: "#ffecec",
    onConfirm,
  });
};

// Función para mostrar una alerta de carga

/**
 * Pasar el mensaje de espera, Buscando... o Cargando...
 * @param {*} message
 */
export const showLoadingAlert = (message) => {
  MySwal.fire({
    title: message,
    icon: "info",
    showConfirmButton: false,
    allowOutsideClick: false,
    background: "#fff",
    showLoaderOnConfirm: true, // Mostrar icono de carga
    onOpen: () => {
      MySwal.showLoading();
    },
  });
};

/**
 * Cuadro de dialogo de cargando...
 * @param {*} message - Mensaje a mostrar en el cuadro de dialogo
 */
export const showLoadingAlertSession = (message) => {
  MySwal.fire({
    title: message,
    icon: "info",
    showConfirmButton: false,
    allowOutsideClick: false,
    background: "#fff",
    didOpen: () => {
      MySwal.showLoading(); // Asegúrate de que el loading se muestre
    },
    timer: 2000, // Tiempo que la alerta permanecerá visible
    timerProgressBar: true, // Muestra una barra de progreso del temporizador
    didClose: () => {
      // Aquí puedes agregar cualquier acción que desees realizar cuando se cierre la alerta
    },
  });
};

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

//Estos alert se pueden modificar para generalizarlo y pasar por parametros los valores de acuerdo al contexto

export const showSuccessAlert = () => {
  MySwal.fire({
    title: "Registrado!",
    text: "La peluquería ha sido registrada exitosamente.",
    icon: "success",
    confirmButtonText: "OK",
    background: "#ffecec",
  });
};

export const showErrorAlert = (message) => {
  MySwal.fire({
    title: "Error",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  });
};

export const showConfirmationAlert = (onConfirm) => {
  MySwal.fire({
    title: "¿Estás seguro?",
    text: "¿Deseas registrar esta peluquería?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, registrar",
    cancelButtonText: "Cancelar",
    background: "#ffecec",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};

export const showDeleteConfirmationAlert = (onConfirm) => {
  MySwal.fire({
    title: "¿Estás seguro?",
    text: "¿Deseas eliminar esta peluquería?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      MySwal.fire("Eliminado!", "La peluquería ha sido eliminada.", "success");
    }
  });
};

export const showDeleteSuccessAlert = () => {
  MySwal.fire({
    title: "Eliminado!",
    text: "La peluquería ha sido eliminada correctamente.",
    icon: "success",
    confirmButtonText: "OK",
  });
};

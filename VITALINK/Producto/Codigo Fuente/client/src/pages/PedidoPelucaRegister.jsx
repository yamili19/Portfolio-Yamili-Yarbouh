import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PedidoPelucaForm from "../components/PedidoPelucaForm";
import { createPedidoPeluca } from "../services/pedidoPelucaService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../utils/sweetAlertGeneralize";

const PedidoPelucaRegister = () => {
  const [showForm, setShowForm] = useState(true); // Estado para controlar visibilidad del formulario
  const navigate = useNavigate();

  const onSubmitPedidoPeluca = async (pedido) => {
    try {
      setShowForm(false); // Ocultar el formulario antes de mostrar el mensaje
      showLoadingAlert("Registrando...");
      
      const pedidoData = {
        fechaPedido: pedido.fechaPedido.toString(),
        cantCabello: pedido.cantCabello,
      };
      const newPedido = await createPedidoPeluca(pedidoData);
      MySwal.close();
      
      console.log("Pedido registrado exitosamente: ", newPedido);
      showSuccessAlert("El Pedido de Peluca ha sido registrado exitosamente.");

      // Esperar a que el mensaje de éxito se muestre antes de reactivar el formulario
      setTimeout(() => {
        setShowForm(true);
        navigate("/pedidos");
      }, 2000); // Ajusta el tiempo si es necesario
    } catch (error) {
      MySwal.close();
      
      if (error.message === "ERROR_PEDIDO_EXIST") {
        console.log("Ya existe un pedido con la fecha ingresada.");
        showErrorAlert(
          "Ya existe un Pedido con la fecha ingresada. Por favor, elige otra fecha"
        );
      } else {
        console.log("Error, no se pudo registrar el pedido de peluca: ", error);
        showErrorAlert("Error al intentar registrar el Pedido de Peluca");
      }

      // Restaurar el formulario después de mostrar el mensaje de error
      setTimeout(() => {
        setShowForm(true);
      }, 2000); // Ajusta el tiempo si es necesario
    }
  };

  return (
    <>
      {showForm && (
        <PedidoPelucaForm
          onSubmit={onSubmitPedidoPeluca}
          isEdit={false}
        />
      )}
    </>
  );
};

export default PedidoPelucaRegister;

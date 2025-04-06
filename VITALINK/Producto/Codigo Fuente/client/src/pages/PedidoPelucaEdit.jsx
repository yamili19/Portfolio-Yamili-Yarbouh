import { useEffect, useState } from "react";
import PedidoPelucaForm from "../components/PedidoPelucaForm";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPedidoPelucaByFecha,
  updatePedidoPeluca,
} from "../services/pedidoPelucaService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../utils/sweetAlertGeneralize";
import Loading from "../components/loading/Loading";

const PedidoPelucaEdit = () => {
  const [pedido, setPedido] = useState(null);
  const { fechaPedido } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadPedido();
  }, [fechaPedido]);

  const loadPedido = async () => {
    try {
      const pedidoObtenido = await fetchPedidoPelucaByFecha(fechaPedido);
      setPedido(pedidoObtenido);
    } catch (error) {
      console.log("Error, no se pudo obtner el pedido: ", error);
    }
  };

  const onSubmitEditPedidoPeluca = async (pedidoActualizado) => {
    try {
      showLoadingAlert("Actualizando...");
      const pedido = await updatePedidoPeluca(fechaPedido, pedidoActualizado);
      MySwal.close();
      console.log("Pedido actualizado correctamente: ", pedido);
      showSuccessAlert("El Pedido de Peluca ha sido actualizado exitosamente.");
      navigate("/pedidos");
    } catch (error) {
      MySwal.close();
      console.log("Error, no se pudo editar el pedido");
      showErrorAlert("Error al intentar actualizar el Pedido.");
    }
  };

  if (!pedido) {
    return <Loading></Loading>;
  }

  return (
    <>
      <PedidoPelucaForm
        pedido={pedido}
        onSubmit={onSubmitEditPedidoPeluca}
        isEdit={true}
      ></PedidoPelucaForm>
    </>
  );
};

export default PedidoPelucaEdit;

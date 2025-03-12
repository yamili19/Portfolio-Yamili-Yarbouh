import { useEffect, useState } from "react";
import PedidoPelucaTable from "../components/PedidoPelucaTable";

import {
  deletePedidoPeluca,
  fetchPedidosPelucas,
} from "../services/pedidoPelucaService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../utils/sweetAlertGeneralize";

const PedidoPelucaList = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    loadPedidos();
  }, []);

  const loadPedidos = async () => {
    try {
      const pedidosData = await fetchPedidosPelucas();
      setPedidos(pedidosData);
      console.log("Pedido que se obtienen del fetching: ", pedidos);
    } catch (error) {
      console.log("Error en el fetching de pedidos de pelucas");
    }
  };

  const handleDeletePedidoPeluca = async (fechaPedido) => {
    try {
      showLoadingAlert("Eliminando...");
      const pedido = await deletePedidoPeluca(fechaPedido);
      MySwal.close();
      console.log("Pedido eliminado exitosamente: ", pedido);
      showSuccessAlert("El pedido ha sido eliminado exitosamente.");
      loadPedidos();
    } catch (error) {
      MySwal.close();
      console.log("Error, no se pudo eliminar el pedido");
      showErrorAlert("Error al intentar eliminar el Pedido.");
    }
  };

  return (
    <>
      <PedidoPelucaTable
        pedidos={pedidos}
        onDelete={handleDeletePedidoPeluca}
      ></PedidoPelucaTable>
    </>
  );
};

export default PedidoPelucaList;

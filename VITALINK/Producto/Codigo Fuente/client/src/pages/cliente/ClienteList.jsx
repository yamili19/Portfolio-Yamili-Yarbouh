import { useEffect, useState } from "react";
import ClienteTable from "../../components/cliente/ClienteTable";
import { fetchClientes } from "../../services/clienteService";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      const clientesData = await fetchClientes();
      setClientes(clientesData);
    } catch (error) {
      console.log("Error al obtener los clientes: ", error);
    }
  };

  return (
    <>
      <ClienteTable clientes={clientes}></ClienteTable>
    </>
  );
};

export default ClienteList;

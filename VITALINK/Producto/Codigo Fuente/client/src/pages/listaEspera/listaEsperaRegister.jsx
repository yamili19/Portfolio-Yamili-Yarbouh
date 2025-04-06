import { useEffect, useState } from "react";
import ListaEsperaForm from "../../components/ListaEsperaForm"; 
import { fetchClienteByDni } from "../../services/clienteService"; 
import { createListaEspera } from "../../services/listaEsperaService";
import { MySwal, showErrorAlert, showLoadingAlert, showSuccessAlert } from "../../utils/sweetAlertGeneralize";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const ListaEsperaRegister = () => {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState({ nombre: "", apellido: "" });
  const [dni, setDni] = useState("");
  const [menor, setMenor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fechaSolicitud, setFechaSolicitud] = useState(""); 

  // Establecer la fecha actual 
  useEffect(() => {
    const today = new Date();
    
    // Formatear la fecha como YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes desde 0, asi que sumamos 1
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    setFechaSolicitud(formattedDate); 
  }, []);

  const onDniSearch = async () => {
    try {
      showLoadingAlert("Buscando paciente...");
      const pacienteData = await fetchClienteByDni(dni); 
      if (pacienteData) {
        setPaciente({
          nombre: pacienteData.nombre,
          apellido: pacienteData.apellido,
        });
        MySwal.close();
      } else {
        MySwal.close();
        showErrorAlert("No se encontró un paciente con ese DNI.");
      }
    } catch (error) {
      MySwal.close();
      showErrorAlert("Error al buscar el paciente.");
    }
  };

  const onSubmitListaEsperaRegister = async (data) => {
    try {
      console.log(data);  // Verificar
      showLoadingAlert("Registrando en la lista de espera...");
      const listaEsperaData = {
        dni: data.dni,
        menor: menor, 
        fechaSolicitud: fechaSolicitud, 
      };
      const newRegistro = await createListaEspera(listaEsperaData);
      MySwal.close();
      showSuccessAlert("El registro ha sido exitoso.");
      navigate("/listaEspera");
    } catch (error) {
      MySwal.close();
      showErrorAlert("Error al intentar registrar en la lista de espera con ese DNI.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ListaEsperaForm
        dni={dni}
        setDni={setDni}
        paciente={paciente}
        menor={menor} 
        setMenor={setMenor} 
        onDniSearch={onDniSearch}
        onSubmit={onSubmitListaEsperaRegister}
        fechaSolicitud={fechaSolicitud} 
      />
    </>
  );
};

export default ListaEsperaRegister;

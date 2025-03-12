import { useEffect, useState } from "react";
import PelucaEstructuraConsult from "../../components/peluca/PelucaEstructuraConsult";
import { useParams } from "react-router-dom";
import { fetchPelucaByCodigo } from "../../services/pelucaService";

const PelucaConsult = () => {
  const [peluca, setPeluca] = useState(null);
  const { codigo } = useParams();

  console.log("Valor del codigo: ", codigo);

  useEffect(() => {
    loadPeluca();
  }, [codigo]);

  const loadPeluca = async () => {
    try {
      console.log("valor del codigo: ", codigo);
      const pelucaData = await fetchPelucaByCodigo(codigo);
      setPeluca(pelucaData);
    } catch (error) {
      console.log("Error, no se pudo obtener la peluca: ", error);
    }
  };
  return (
    <>
      <PelucaEstructuraConsult peluca={peluca}></PelucaEstructuraConsult>
    </>
  );
};

export default PelucaConsult;

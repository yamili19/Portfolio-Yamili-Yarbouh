import { useEffect, useState } from "react";
import DonanteTable from "../../components/donante/DonanteTable";
import { fetchDonantes } from "../../services/donanteService";
import Loading from "../../components/loading/Loading";

const DonanteList = () => {
  const [donantes, setDonantes] = useState([]);

  useEffect(() => {
    loadDonantes();
  }, []);

  const loadDonantes = async () => {
    try {
      const donanteData = await fetchDonantes();
      setDonantes(donanteData);
    } catch (error) {
      console.log("Error, no se pudo obtener los donantes: ", error);
    }
  };

  if (!donantes) {
    return <Loading></Loading>;
  }
  return (
    <>
      <DonanteTable donantes={donantes}></DonanteTable>
    </>
  );
};

export default DonanteList;

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Table from "../pages/Table";
import ConsultPeluqueria from "../pages/ConsultPeluqueria";
import EditPeluqueria from "../pages/EditPeluqueria";

const Router = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.2/mdb.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Register></Register>}></Route>
        <Route path="/peluquerias" element={<Table></Table>}></Route>
        <Route
          path="/peluquerias/consultar/:nombre"
          element={<ConsultPeluqueria></ConsultPeluqueria>}
        ></Route>
        <Route
          path="/peluquerias/editar/:nombre"
          element={<EditPeluqueria></EditPeluqueria>}
        ></Route>
        <Route path="*" element={<Register></Register>}></Route>
      </Routes>
    </>
  );
};

export default Router;

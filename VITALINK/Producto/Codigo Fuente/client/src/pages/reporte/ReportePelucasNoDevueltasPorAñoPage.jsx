import { useForm } from "react-hook-form";
import { anio } from "../../data/anio"; // Assumed array of years
import useLoadMDBScript from "../../hooks/useLoadMDBScript";
import { useContext, useState } from "react";
import { fetchPelucasNoDevueltasPorAño } from "../../services/reporteService";
import AuthContext from "../../context/auth/AuthContext";
import ReportePelucasNoDevueltasPorAño from "../../components/reporte/ReportePelucasNoDevueltasPorAño";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
} from "../../utils/sweetAlertGeneralize";

const ReportePelucasNoDevueltasPorAñoPage = () => {
  const { userLog } = useContext(AuthContext);
  const [reportData, setReportData] = useState(null);
  const [year1, setYear1] = useState(null); // Initialize year1 state
  const [year2, setYear2] = useState(null); // Initialize year2 state
  useLoadMDBScript();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitReporte = async (data) => {
    const selectedYear1 = parseInt(data.year1, 10);
    const selectedYear2 = parseInt(data.year2, 10);

    // Validation for consecutive years
    if (selectedYear1 === selectedYear2) {
      showErrorAlert("Los años seleccionados deben ser diferentes.");
      return;
    }

    if (selectedYear2 - selectedYear1 !== 1 && selectedYear2 - selectedYear1 > 0) {
      showErrorAlert("Los años seleccionados deben ser consecutivos.");
      return;
    }
    if (selectedYear2 - selectedYear1 < 0) {
        showErrorAlert("El año 1 debe ser menor que el año 2")
        return;
    }

    // Set years in state
    setYear1(selectedYear1);
    setYear2(selectedYear2);

    await loadReporteTiempoPromedioPrestamo(selectedYear1, selectedYear2);
  };

  const loadReporteTiempoPromedioPrestamo = async (year1, year2) => {
    const token = userLog.token;

    try {
      showLoadingAlert("Generando Reporte...");
      const reporteData = await fetchPelucasNoDevueltasPorAño(year1, year2, token.toString());
      MySwal.close();
      setReportData(reporteData);
    } catch (error) {
      MySwal.close();
      console.log(
        "Error al intentar obtener el reporte de pelucas no devueltas por año: ",
        error
      );
      showErrorAlert("Error al Generar Reporte.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitReporte)}>
        <div className="row mb-4">
          <div className="col-md-4">
            <select
              className="form-select"
              {...register("year1", { required: "Seleccione el primer año" })}
            >
              <option value="">Año 1 *</option>
              {anio.map((a) => (
                <option key={a.id} value={a.year}>{a.year}</option>
              ))}
            </select>
            {errors.year1 && <div className="text-danger mt-1">{errors.year1.message}</div>}
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              {...register("year2", { required: "Seleccione el segundo año" })}
            >
              <option value="">Año 2 *</option>
              {anio.map((a) => (
                <option key={a.id} value={a.year}>{a.year}</option>
              ))}
            </select>
            {errors.year2 && <div className="text-danger mt-1">{errors.year2.message}</div>}
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <button type="submit" className="btn btn-success" style={{ height: "38px", marginTop: "7px" }}>
              Generar Reporte
            </button>
          </div>
        </div>
      </form>

      {reportData && year1 && year2 && ( // Ensure year1 and year2 are defined before passing
        <ReportePelucasNoDevueltasPorAño reportData={reportData} year1={year1} year2={year2} />
      )}
    </>
  );
};

export default ReportePelucasNoDevueltasPorAñoPage;

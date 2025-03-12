import { useForm } from "react-hook-form";
import { anio } from "../../data/anio";
import useLoadMDBScript from "../../hooks/useLoadMDBScript";
import { useContext, useState } from "react";
import { fetchDonacionesPorMes } from "../../services/reporteService";
import AuthContext from "../../context/auth/AuthContext";
import ReporteDonacionPorMes from "../../components/reporte/ReporteDonacionPorMes";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
} from "../../utils/sweetAlertGeneralize";

const ReporteDonacionPorMesPage = () => {
  const { userLog } = useContext(AuthContext);
  const [year, setYear] = useState("");
  const [donacionesPorMes, setDonacionesPorMes] = useState(null);
  useLoadMDBScript();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitReporteDonacionPorMes = async (data) => {
    console.log(data);
    setYear(data.year);
    await loadReporteDonacionesPorMes(data.year);
  };

  const loadReporteDonacionesPorMes = async (year) => {
    const token = userLog.token;

    try {
      showLoadingAlert("Generando Reporte...");
      const reporteData = await fetchDonacionesPorMes(year, token.toString());
      MySwal.close();
      setDonacionesPorMes(reporteData);
    } catch (error) {
      MySwal.close();
      console.log(
        "Error al intentar obtener el reporte de donaciones por mes: ",
        error
      );
      showErrorAlert("Error al Generar Reporte.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitReporteDonacionPorMes)}>
        <div className="row mb-4">
          <div className="col-md-8 ">
            <div className="form-outline">
              <select
                className="form-select"
                id="year"
                {...register("year", {
                  required: "Este campo es obligatorio",
                })}
              >
                <option value="">
                  Seleccione el Año para generar Reporte *
                </option>
                {anio.map((a) => (
                  <option key={a.id} value={a.year}>
                    {a.year}
                  </option>
                ))}
              </select>
            </div>
            {errors.year && (
              <div className="text-danger mt-1">{errors.year.message}</div>
            )}
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <button
              type="submit"
              className="btn btn-success "
              style={{ height: "38px", marginTop: "7px" }}
            >
              Generar Reporte
            </button>
          </div>
        </div>
      </form>

      {donacionesPorMes && donacionesPorMes.total !== undefined && (
        <ReporteDonacionPorMes donacionesData={donacionesPorMes} year={year} />
      )}
    </>
  );
};

export default ReporteDonacionPorMesPage;

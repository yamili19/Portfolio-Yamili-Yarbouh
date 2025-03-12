/* eslint-disable react/prop-types */

/**
 * Archivo para definir el formulario para las pelucas
 */

import talles from "../data/talle";
import useLoadMDBScript from "../hooks/useLoadMDBScript";
import RegisterButton from "./buttons/RegisterButton";
import "../css/pelucaForm.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { showConfirmationAlert } from "../utils/sweetAlertGeneralize";
import CancelButton from "./buttons/CancelButton";
import { colors } from "../data/color";
import { useState, useRef } from "react";
//import { CirclePicker } from "react-color";
//import ReactCircleColorPicker from "react-circle-color-picker";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faFileImage,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./loading/Loading";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB en bytes
const ALLOWED_FILE_TYPES = /jpeg|jpg|png/;

const CustomCircle = ({ color, selected, onClick, colorName }) => (
  <div
    onClick={onClick}
    className={`custom-circle ${selected ? "selected-circle" : ""}`}
    style={{ backgroundColor: color }}
    title={colorName} // Agrega el atributo title para mostrar el nombre del color al pasar el mouse
  >
    {selected && <span className="checkmark">✔</span>}
    {/* Tooltip para mostrar el nombre del color */}
    <span className="color-tooltip">{colorName}</span>
  </div>
);

const PelucaForm = ({
  tiposPelo,
  estadosPelucas,
  tiposCara,
  onSubmit,
  isEdit,
}) => {
  useLoadMDBScript();
  const [selectedColor, setSelectedColor] = useState("#000000"); // Color inicial negro
  const [selectedColorName, setSelectedColorName] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileIcon, setFileIcon] = useState(faUpload);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  //useInitializeMDB();
  const navigate = useNavigate();
  const navigateToListPelucas = () => {
    navigate("/pelucas");
  };

  const validateFechaConfeccion = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      selectedDate <= today ||
      "La fecha de confección no puede ser mayor a la actual"
    );
  };

  const handleColorChange = (color) => {
    const selected = colors.find((c) => c.valor === color.hex);
    setSelectedColor(color.hex);
    setSelectedColorName(selected?.nombre || "");
    setValue("color", selected?.nombre || "");
  };

  // Función para validar archivo
  const validateFile = (file) => {
    if (!file) return true; // Si no hay archivo, no hay error (opcional)

    if (!ALLOWED_FILE_TYPES.test(file.type)) {
      return "Solo se permiten archivos con extensión JPEG, JPG o PNG.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "El archivo debe ser menor o igual a 5MB.";
    }

    return true;
  };

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      const validationMessage = validateFile(selectedFile);
      if (validationMessage !== true) {
        setError(validationMessage); // Establece el error en el estado
        setFile(null);
        setFileName("");
        return; // Sale de la función si hay error
      }
      setError(""); // Limpiar el error
      setFile(selectedFile);
      setFileName(selectedFile.name);

      // Establece el ícono según el tipo de archivo
      if (selectedFile.type.startsWith("image/")) {
        setFileIcon(faFileImage); // Ícono para imágenes
      } else if (selectedFile.type === "application/pdf") {
        setFileIcon(faFilePdf); // Ícono para PDF
      } else {
        setFileIcon(faUpload); // Ícono por defecto
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*", // Solo permite imágenes
  });

  const handleSubmitFormPeluca = (peluca) => {
    //console.log("Valor de la peluca: ", peluca);
    const message = isEdit
      ? "¿Desea actualizar está Peluca?"
      : "¿Desea registrar está Peluca?";
    showConfirmationAlert(message, () => {
      const pelucaData = {
        ...peluca,
        color: selectedColorName,
        foto: file,
      };
      console.log("Valor de peluca data: ", pelucaData);
      onSubmit(pelucaData);
      reset();
    });
  };

  if (!tiposCara || !tiposPelo || !estadosPelucas) {
    return <Loading></Loading>;
  }

  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h5>{isEdit ? "Editar Peluca" : "Registrar Peluca"}</h5>
          </div>
          <div className="card-body card-body-peluca">
            <form onSubmit={handleSubmit(handleSubmitFormPeluca)}>
              {/* Fila 1: Fecha Confección y Talle */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-outline">
                    <input
                      type="date"
                      id="fechaConfeccion"
                      className="form-control"
                      {...register("fechaConfeccion", {
                        required: "Este campo es obligatorio",
                        validate: validateFechaConfeccion,
                      })}
                    />
                    <label className="form-label" htmlFor="fechaConfeccion">
                      Fecha Confección *
                    </label>
                  </div>
                  {errors.fechaConfeccion && (
                    <div className="text-danger mt-1">
                      {errors.fechaConfeccion.message}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <div className="form-outline">
                    <select
                      className="form-select"
                      id="talle"
                      {...register("talle", {
                        required: "Este campo es obligatorio",
                      })}
                    >
                      <option value="">Seleccione talle *</option>
                      {talles.map((talle) => (
                        <option key={talle.id} value={talle.nombre}>
                          {talle.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.talle && (
                    <div className="text-danger mt-1">
                      {errors.talle.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Fila 2: Tipo de Pelo y Estado de Peluca */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-outline">
                    <select
                      className="form-select"
                      id="tipoPelo"
                      {...register("tipoPelo", {
                        required: "Este campo es obligatorio",
                      })}
                    >
                      <option value="">Seleccione el tipo de pelo *</option>
                      {tiposPelo.map((tipoPelo) => (
                        <option key={tipoPelo.id} value={tipoPelo.id}>
                          {tipoPelo.descripcion}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.tipoPelo && (
                    <div className="text-danger">{errors.tipoPelo.message}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <div className="form-outline">
                    <select
                      className="form-select"
                      id="estadoPeluca"
                      {...register("estadoPeluca", {
                        required: "Este campo es obligatorio",
                      })}
                    >
                      <option value="">
                        Seleccione el estado de la peluca *
                      </option>
                      {estadosPelucas.map((estadoPeluca) => (
                        <option key={estadoPeluca.id} value={estadoPeluca.id}>
                          {estadoPeluca.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.estadoPeluca && (
                    <div className="text-danger mt-1">
                      {errors.estadoPeluca.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Tipos de Cara (Checkboxes) */}
              <div className="row mb-4">
                <div className="col-md-12 tipo-cara-container">
                  <label className="form-label">
                    Seleccione uno o más Tipos de Cara Recomendados *
                  </label>
                  <div className="separator-line"></div>

                  {/* Generar los checkboxes de tipos de cara */}
                  {tiposCara.map((tc) => (
                    <div key={tc.id} className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={tc.id}
                        value={tc.id}
                        {...register("tiposCara", {
                          required:
                            "Debes seleccionar al menos un tipo de cara recomendada",
                        })}
                      />
                      <label className="form-check-label" htmlFor={tc.id}>
                        {tc.nombre}
                      </label>
                    </div>
                  ))}

                  {/* Mostrar el error si no se selecciona ningún checkbox */}
                  {errors.tiposCara && (
                    <div className="text-danger mt-1">
                      {errors.tiposCara.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Fila 3: Color y Descripción */}
              <div className="row mb-4">
                {/* Color input */}
                <div className="col-md-4 color-container">
                  {" "}
                  <label className="form-label">
                    Seleccione Color (Por defecto color Negro) *
                  </label>
                  <div className="separator-line"></div>{" "}
                  {/* Línea de separación */}
                  <div className="circle-picker">
                    {colors.map((color) => (
                      <CustomCircle
                        key={color.valor}
                        color={color.valor}
                        selected={selectedColor === color.valor}
                        onClick={() => handleColorChange({ hex: color.valor })}
                        colorName={color.nombre}
                      />
                    ))}
                  </div>
                  <input
                    type="hidden"
                    {...register("color", {
                      required: "Debes seleccionar un color",
                    })}
                  />
                  {errors.color && (
                    <div className="text-danger mt-1">
                      {errors.color.message}
                    </div>
                  )}
                </div>

                {/* Descripción input */}
                <div className="col-md-8 description-container">
                  {" "}
                  <label className="form-label">Descripción</label>
                  <div className="separator-line"></div>{" "}
                  {/* Línea de separación */}
                  <div className="form-outline">
                    <textarea
                      id="descripcion"
                      className="form-control"
                      rows="5"
                      placeholder="Descripción"
                      {...register("descripcion", {
                        required: false,
                        maxLength: {
                          value: 200,
                          message:
                            "La descripción no puede contener más de 200 caracteres",
                        },
                      })}
                    ></textarea>
                  </div>
                  {errors.descripcion && (
                    <div className="text-danger mt-1">
                      {errors.descripcion.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Foto input */}
              <div className="row mb-4">
                <div className="col-md-12 imagen-container">
                  <label className="form-label" htmlFor="foto">
                    Subir Imágen de Peluca (archivos permitidos: *.jpeg | jpg |
                    png)
                  </label>
                  <div className="separator-line"></div>{" "}
                  <div
                    {...getRootProps({
                      className: `dropzone ${isDragActive ? "active" : ""}`,
                      onClick: () => inputRef.current.click(), // Permite hacer clic para abrir el selector de archivos
                    })}
                  >
                    <input
                      {...getInputProps({
                        onChange: (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const validationMessage = validateFile(file);
                            if (validationMessage !== true) {
                              setFile(null);
                              setFileName("");
                            }
                            setFile(file);
                            setFileName(file.name);
                          }
                        },
                      })}
                      ref={inputRef} // Referencia para el input de archivos
                    />
                    <div className="dropzone-content">
                      <FontAwesomeIcon
                        icon={fileIcon}
                        className="upload-icon"
                      />
                      {fileName ? (
                        <div className="file-info">
                          <span>{fileName}</span>{" "}
                          {/* Muestra el nombre del archivo */}
                        </div>
                      ) : (
                        <p>
                          Arrastra un archivo aquí o haz clic para seleccionar
                          uno
                        </p>
                      )}
                    </div>
                  </div>
                  {error && <div className="text-danger mt-1">{error}</div>}
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  {/* Submit button */}
                  <RegisterButton
                    accion={isEdit ? "Guardar Cambios" : "Registrar Peluca"}
                  />
                </div>
                <div className="col-md-6">
                  <CancelButton
                    onClick={() => navigateToListPelucas()}
                  ></CancelButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PelucaForm;

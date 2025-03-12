/* eslint-disable react/prop-types */

/**
 * Archivo para definir la estrucura del formulario de préstamo
 */

import { useForm, Controller } from "react-hook-form";
import RegisterButton from "../buttons/RegisterButton";
import useLoadMDBScript from "../../hooks/useLoadMDBScript";
import {
  MySwal,
  showConfirmationAlert,
  showErrorAlert,
  showLoadingAlert,
} from "../../utils/sweetAlertGeneralize";
import { useEffect, useState } from "react";
import CancelButton from "../buttons/CancelButton";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import imgNullPeluca from "../../assets/images/img-null-peluca-removebg.png";
import { fetchClienteByDni } from "../../services/clienteService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const PrestamoForm = ({
  ciudades,
  pelucas,
  vinculos,
  obrasSociales,
  estadosPrestamos,
  prestamoData,
  onSubmit,
  isEdit,
  isRenovar,
}) => {
  useLoadMDBScript();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: {
      dni: prestamoData?.cliente?.dni || "",
      nombre: prestamoData?.cliente?.nombre || "",
      apellido: prestamoData?.cliente?.apellido || "",
      nroTelefono: prestamoData?.cliente?.nroTelefono || "",
      usuario: prestamoData?.cliente?.usuario || "",
      fechaPrestamo: prestamoData?.fechaPrestamo || "",
      fechaDevolucion: prestamoData?.fechaDevolucion || "",
      ciudad: prestamoData?.cliente?.ciudad || "",
      codigoPeluca: prestamoData?.Peluca?.codigo || "",
      estadoPrestamo: prestamoData?.estadoPrestamo || "",
      vinculo: prestamoData?.vinculo || "",
      obraSocial: prestamoData?.afiliado?.obraSocial || "",
    },
  });

  useEffect(() => {
    if (prestamoData) {
      reset({
        dni: prestamoData.cliente?.dni || "",
        nombre: prestamoData.cliente?.nombre || "",
        apellido: prestamoData.cliente?.apellido || "",
        nroTelefono: prestamoData.cliente?.nroTelefono || "",
        usuario: prestamoData.cliente?.usuario || "",
        fechaPrestamo: prestamoData.fechaPrestamo || "",
        fechaDevolucion: prestamoData.fechaDevolucion || "",
        ciudad: prestamoData.cliente?.ciudad || "",
        codigoPeluca: prestamoData.Peluca?.codigo || "",
        estadoPrestamo: prestamoData.estadoPrestamo || "",
        vinculo: prestamoData.vinculo || "",
        obraSocial: prestamoData.afiliado?.obraSocial || "",
      });

      // Forzar actualización de los labels
      setTimeout(() => {
        const inputs = document.querySelectorAll(".form-outline input");
        inputs.forEach((input) => {
          if (input.value) {
            input.classList.add("active");
            const label = input.nextElementSibling;
            if (label && label.classList.contains("form-label")) {
              label.classList.add("active");
            }
          }
        });
        const selects = document.querySelectorAll(".form-outline select");
        selects.forEach((select) => {
          if (select.value) {
            const label = select.previousElementSibling;
            if (label && label.classList.contains("form-label")) {
              label.classList.add("active");
            }
          }
        });
      }, 0);
    }
  }, [prestamoData, reset]);

  //const [email, setEmail] = useState("");
  const [clienteData, setClienteData] = useState({
    nombre: "",
    apellido: "",
    nroTelefono: "",
    usuario: "",
    ciudad: "",
  });

  useEffect(() => {
    if (clienteData) {
      // Forzar actualización de los labels después de buscar un donante
      setTimeout(() => {
        const inputs = document.querySelectorAll(".form-outline input");
        inputs.forEach((input) => {
          if (input.value) {
            input.classList.add("active");
            const label = input.nextElementSibling;
            if (label && label.classList.contains("form-label")) {
              label.classList.add("active");
            }
          }
        });
      }, 0);
    }
  }, [clienteData]);

  const dniValue = watch("dni");

  useEffect(() => {
    if (clienteData) {
      setValue("nombre", clienteData.nombre);
      setValue("apellido", clienteData.apellido);
      setValue("nroTelefono", clienteData.nroTelefono);
      setValue("usuario", clienteData.usuario);
      setValue("ciudad", clienteData.ciudad);
    }
  }, [clienteData, setValue]);

  const handleDniVerification = async () => {
    const dni = getValues("dni");
    console.log("Dni ingresado: ", dni);
    if (!dni) return;

    try {
      showLoadingAlert("Buscando...");
      const cliente = await fetchClienteByDni(dni);
      console.log("El cliente es: ", cliente);
      MySwal.close();
      if (cliente) {
        setClienteData({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          nroTelefono: cliente.nroTelefono,
          usuario: cliente.usuario,
          ciudad: cliente.ciudad,
        });
        setValue("nombre", cliente.nombre);
        setValue("apellido", cliente.apellido);
        setValue("nroTelefono", cliente.nroTelefono);
        setValue("usuario", cliente.usuario);
        setValue("ciudad", cliente.ciudad);
      } else {
        setClienteData({
          nombre: "",
          apellido: "",
          nroTelefono: "",
          usuario: "",
          ciudad: "",
        });
        setValue("nombre", "");
        setValue("apellido", "");
        setValue("nroTelefono", "");
        setValue("usuario", "");
        setValue("ciudad", "");
        showErrorAlert("No se encontró un cliente con dni: " + dni.toString());
      }
    } catch (error) {
      setClienteData({
        nombre: "",
        apellido: "",
        nroTelefono: "",
        usuario: "",
        ciudad: "",
      });
      setValue("nombre", "");
      setValue("apellido", "");
      setValue("nroTelefono", "");
      setValue("usuario", "");
      setValue("ciudad", "");
      showErrorAlert("Error al verificar el dni");
      console.log("Error al verificar el dni: ", error);
      MySwal.close();
    }
  };

  // Formato de opciones para React-Select
  const pelucasOptions = pelucas.map((peluca) => ({
    value: peluca.codigo,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={
            peluca.foto
              ? `http://localhost:8000/${peluca.foto.replace(/\\/g, "/")}`
              : imgNullPeluca
          }
          alt={`Peluca ${peluca.codigo}`}
          style={{ width: 50, height: 50, objectFit: "cover", marginRight: 10 }}
        />
        <div>
          <strong>{`Código: ${peluca.codigo}`}</strong>
          <br />
          <span>{`Talle: ${peluca.talle}`}</span>
          <br />
          <span>{`Color: ${peluca.color}`}</span>
          <br />
          <span>{`Fecha Confección: ${new Date(
            peluca.fechaConfeccion
          ).toLocaleDateString("es-ES")}`}</span>
          <br />
          <span>{`Estado: ${peluca.estado.nombre}`}</span>
        </div>
      </div>
    ),
  }));

  const handleSelectChange = (selectedOption) => {
    setValue("codigoPeluca", selectedOption ? selectedOption.value : "");
  };

  const selectedPeluca = pelucasOptions.find(
    (option) => option.value === getValues("codigoPeluca")
  );

  // Obtenemos los estados en En Prestamo y Devuelta
  const estadosFiltrados =
    isEdit && Array.isArray(estadosPrestamos)
      ? estadosPrestamos.filter((estado) => estado.id === 1 || estado.id === 2)
      : [];

  const getNameEstadoPrestamo = (idPrestamo) => {
    const estado = estadosPrestamos.find((estado) => estado.id === idPrestamo);
    return estado ? estado.nombre : "";
  };

  const navigateToListPrestamos = () => {
    const urlListPrestamos = "/prestamos";
    reset();
    navigate(urlListPrestamos);
  };

  const handleSubmitFormPrestamo = (prestamo) => {
    let message;

    if (isRenovar) {
      message = "¿Desea renovar este Préstamo?";
    } else if (isEdit) {
      message = "¿Desea actualizar este Préstamo?";
    } else {
      message = "¿Desea registrar este Préstamo?";
    }

    showConfirmationAlert(message, () => {
      onSubmit(prestamo);
      reset();
    });
  };

  /*
  const handleSubmitFormPrestamo = (prestamo) => {
    console.log("Datos del prestamo: ", prestamo);
  };
  */
  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h5>
              {isRenovar && prestamoData
                ? `Renovar Préstamo - Nro. Préstamo: ${prestamoData.nroPrestamo}`
                : isEdit && prestamoData
                ? `Editar Préstamo - Nro. Préstamo: ${prestamoData.nroPrestamo}`
                : "Registrar Préstamo"}
            </h5>
          </div>
          <div className="card-body card-body-peluca">
            <form onSubmit={handleSubmit(handleSubmitFormPrestamo)}>
              {/* dni input */}
              <div className="form-group mb-4">
                <div className="row">
                  <div className="col-md-11">
                    <div className="form-outline">
                      <input
                        type="number"
                        id="dni"
                        className="form-control"
                        {...register("dni", {
                          required: "Este campo es obligatorio",
                          maxLength: {
                            value: 11,
                            message:
                              "El DNI no puede contener más de 11 dígitos",
                          },
                        })}
                        readOnly={isEdit || isRenovar}
                      />
                      <label className="form-label" htmlFor="dni">
                        DNI *
                      </label>
                    </div>
                  </div>
                  <div className="col-md-1 d-flex align-items-center justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm ml-2"
                      title="Buscar Cliente"
                      onClick={handleDniVerification}
                      disabled={!dniValue || isEdit || isRenovar}
                      style={{
                        marginTop: "12px",
                        height: "35px",
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
                {errors.dni && (
                  <div className="text-danger mt-1">{errors.dni.message}</div>
                )}
              </div>

              {/* nombre input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    {...register("nombre", {
                      required: "Este campo es obligatorio",
                      maxLength: {
                        value: 50,
                        message:
                          "El nombre no puede contener más de 50 caracteres",
                      },
                    })}
                    readOnly={isRenovar}
                  />
                  <label className="form-label" htmlFor="nombre">
                    Nombre *
                  </label>
                </div>
                {errors.nombre && (
                  <div className="text-danger mt-1">
                    {errors.nombre.message}
                  </div>
                )}
              </div>

              {/* apellido input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <input
                    type="text"
                    id="apellido"
                    className="form-control"
                    {...register("apellido", {
                      required: "Este campo es obligatorio",
                      maxLength: {
                        value: 50,
                        message:
                          "El apellido no puede contener más de 50 caracteres",
                      },
                    })}
                    readOnly={isRenovar}
                  />
                  <label className="form-label" htmlFor="nombre">
                    Apellido *
                  </label>
                </div>
                {errors.apellido && (
                  <div className="text-danger mt-1">
                    {errors.apellido.message}
                  </div>
                )}
              </div>

              {/* nroTelefono input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <input
                    type="number"
                    id="nroTelefono"
                    className="form-control"
                    {...register("nroTelefono", {
                      required: "Este campo es obligatorio",
                      maxLength: {
                        value: 15,
                        message:
                          "El número de teléfono no puede contener más de 15 dígitos",
                      },
                    })}
                    readOnly={isRenovar}
                  />
                  <label className="form-label" htmlFor="nroTelefono">
                    Número de Teléfono / Celular *
                  </label>
                </div>
                {errors.nroTelefono && (
                  <div className="text-danger mt-1">
                    {errors.nroTelefono.message}
                  </div>
                )}
              </div>

              {/* usuario input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <input
                    type="email"
                    id="usuario"
                    className="form-control"
                    {...register("usuario", {
                      required: false,
                      maxLength: {
                        value: 50,
                        message:
                          "El email no puede contener más de 50 caracteres",
                      },
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Formato de email incorrecto",
                      },
                    })}
                    readOnly={isRenovar}
                  />
                  <label className="form-label" htmlFor="usuario">
                    Email
                  </label>
                </div>
                {errors.usuario && (
                  <div className="text-danger mt-1">
                    {errors.usuario.message}
                  </div>
                )}
              </div>

              {/* Fecha Prestamo y Fecha Devolucion en la misma fila */}
              {(isEdit || isRenovar) && (
                <div className="row">
                  {/* fechaPrestamo input */}
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input
                        type="date"
                        id="fechaPrestamo"
                        className="form-control"
                        {...register("fechaPrestamo", {
                          required: "Este campo es obligatorio",
                        })}
                        readOnly={isEdit || isRenovar}
                      />
                      <label className="form-label" htmlFor="fechaPrestamo">
                        Fecha Préstamo
                      </label>
                    </div>
                    {errors.fechaPrestamo && (
                      <div className="text-danger mt-1">
                        {errors.fechaPrestamo.message}
                      </div>
                    )}
                  </div>

                  {/* fechaDevolucion input */}
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input
                        type="date"
                        id="fechaDevolucion"
                        className="form-control"
                        {...register("fechaDevolucion", {
                          required: "Este campo es obligatorio",
                          validate: (value) => {
                            const fechaPrestamo = new Date(
                              getValues("fechaPrestamo")
                            );
                            const fechaDevolucionInput = new Date(value);
                            const fechaActual = new Date();
                            let fechaDevolucionAnterior = fechaPrestamo; // Default to fechaPrestamo if not renewing

                            if (isEdit) {
                              // Validación solo para edición: la fecha de devolución debe ser mayor a la fecha de préstamo
                              return (
                                fechaDevolucionInput > fechaPrestamo ||
                                "La fecha de devolución debe ser mayor que la fecha de préstamo"
                              );
                            } else if (isRenovar) {
                              // Si es una renovación, se establece la fecha de devolución anterior
                              if (
                                prestamoData &&
                                prestamoData.fechaDevolucion
                              ) {
                                fechaDevolucionAnterior = new Date(
                                  prestamoData.fechaDevolucion
                                );
                              }

                              // Validaciones para renovación:
                              if (fechaDevolucionInput <= fechaPrestamo) {
                                return "La fecha de devolución debe ser mayor que la fecha de préstamo";
                              }

                              if (fechaDevolucionInput <= fechaActual) {
                                return "La fecha de devolución debe ser mayor que la fecha actual";
                              }

                              if (
                                fechaDevolucionInput <= fechaDevolucionAnterior
                              ) {
                                return "La fecha de devolución renovada debe ser mayor que la fecha de devolución anterior";
                              }

                              return true;
                            }
                          },
                        })}
                      />
                      <label className="form-label" htmlFor="fechaDevolucion">
                        Fecha Devolución
                      </label>
                    </div>
                    {errors.fechaDevolucion && (
                      <div className="text-danger mt-1">
                        {errors.fechaDevolucion.message}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Selected Ciudad input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <select
                    className="form-select"
                    id="ciudad"
                    {...register("ciudad", {
                      required: "Este campo es obligatorio",
                    })}
                    disabled={isRenovar}
                  >
                    <option value="">Seleccione Ciudad *</option>
                    {ciudades.map((ciudad) => (
                      <option key={ciudad.id} value={ciudad.id}>
                        {ciudad.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.ciudad && (
                  <div className="text-danger mt-1">
                    {errors.ciudad.message}
                  </div>
                )}
              </div>

              {/* Selected peluca input 
                  <div className="form-group mb-4">
                <div className="form-outline">
                  <select
                    className="form-select"
                    id="codigoPeluca"
                    {...register("codigoPeluca", {
                      required: "Este campo es obligatorio",
                    })}
                    disabled={isRenovar}
                  >
                    <option value="">Seleccione Peluca Disponible *</option>
                    {pelucas.map((peluca) => (
                      <option key={peluca.codigo} value={peluca.codigo}>
                        {`Código: ${peluca.codigo} - Talle: ${
                          peluca.talle
                        } - Color: ${
                          peluca.color
                        } - Fecha Confección: ${new Date(
                          peluca.fechaConfeccion
                        ).toLocaleDateString("es-ES")}`}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.codigoPeluca && (
                  <div className="text-danger">
                    {errors.codigoPeluca.message}
                  </div>
                )}
              </div>

              */}

              {/* Selected Peluca input con React-Select */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <Controller
                    name="codigoPeluca"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={pelucasOptions}
                        isDisabled={isRenovar}
                        placeholder="Seleccione Peluca Disponible *"
                        onChange={(selectedOption) =>
                          field.onChange(
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        value={
                          pelucasOptions.find(
                            (option) => option.value === field.value
                          ) || null
                        }
                      />
                    )}
                  />
                </div>
                {errors.codigoPeluca && (
                  <div className="text-danger mt-1">
                    {errors.codigoPeluca.message}
                  </div>
                )}
              </div>

              {/* Selected estadoPrestamo input */}
              {(isEdit || isRenovar) && (
                <div className="form-group mb-4">
                  <div className="form-outline">
                    {isRenovar ? (
                      <input
                        type="text"
                        className="form-control"
                        value={
                          prestamoData
                            ? getNameEstadoPrestamo(
                                Number(prestamoData.estadoPrestamo)
                              )
                            : ""
                        }
                        readOnly
                      />
                    ) : (
                      <select
                        className="form-select"
                        id="estadoPrestamo"
                        {...register("estadoPrestamo", {
                          required: "Este campo es obligatorio",
                        })}
                      >
                        <option value="">
                          Seleccione Estado del Préstamo *
                        </option>
                        {estadosFiltrados.map((estadoPrestamo) => (
                          <option
                            key={estadoPrestamo.id}
                            value={estadoPrestamo.id}
                          >
                            {estadoPrestamo.nombre}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  {errors.estadoPrestamo && (
                    <div className="text-danger">
                      {errors.estadoPrestamo.message}
                    </div>
                  )}
                </div>
              )}

              {/* Selected Vinculo input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <select
                    className="form-select"
                    id="vinculo"
                    {...register("vinculo", {
                      required: "Este campo es obligatorio",
                    })}
                    disabled={isRenovar}
                  >
                    <option value="">Seleccione el Vinculo *</option>
                    {vinculos.map((vinculo) => (
                      <option key={vinculo.id} value={vinculo.id}>
                        {vinculo.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.vinculo && (
                  <div className="text-danger mt-1">
                    {errors.vinculo.message}
                  </div>
                )}
              </div>

              {/* Selected Obra Social input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <select
                    className="form-select"
                    id="obraSocial"
                    {...register("obraSocial", {
                      required: false,
                    })}
                    disabled={isRenovar}
                  >
                    <option value="">Seleccione Obra Social</option>
                    {obrasSociales.map((obraSocial) => (
                      <option key={obraSocial.id} value={obraSocial.id}>
                        {obraSocial.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <RegisterButton
                    accion={
                      isRenovar
                        ? "Renovar Prestamo"
                        : isEdit
                        ? "Guardar cambios"
                        : "Registrar Prestamo"
                    }
                  />
                </div>
                <div className="col-md-6">
                  <CancelButton
                    onClick={() => navigateToListPrestamos()}
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

export default PrestamoForm;

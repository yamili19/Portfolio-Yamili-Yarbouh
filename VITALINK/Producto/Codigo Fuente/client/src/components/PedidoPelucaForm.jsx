/* eslint-disable react/prop-types */

import { useEffect } from "react";
import useLoadMDBScript from "../hooks/useLoadMDBScript";
//import { showConfirmationAlert } from "../utils/sweetAlertGeneralize";
import RegisterButton from "./buttons/RegisterButton";
import { useForm } from "react-hook-form";
import CancelButton from "./buttons/CancelButton";
import { useNavigate } from "react-router-dom";
import "../css/pedidoPeluca.css";

const PedidoPelucaForm = ({ pedido, onSubmit, isEdit }) => {
  useLoadMDBScript();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: pedido });

  useEffect(() => {
    reset(pedido);

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
    }, 0);
  }, [pedido, reset]);

  /**
   * Valida que la fecha ingresada no sea mayor a la actual
   * @param {*} value - Fecha del pedido
   * @returns - La fecha del pedido o mensaje de error en caso que la fecha sea superior a la actual
   */
  const validateFechaPedido = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      selectedDate <= today ||
      "La fecha del pedido no puede ser mayor a la actual"
    );
  };

  const navigateToListPedidos = () => {
    const urlListPedidos = "/pedidos/";
    navigate(urlListPedidos);
  };

  const handleFormSubmitPedidoPeluca = (pedido) => {
    onSubmit(pedido);
    reset();
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="card">
          <div className="card-header">
            <h5>
              {isEdit
                ? "Editar Pedido de Peluca"
                : "Registrar Pedido de Peluca"}
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(handleFormSubmitPedidoPeluca)}>
              {/* Fecha Pedido input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <input
                    type="date"
                    id="fechaPedido"
                    className="form-control"
                    {...register("fechaPedido", {
                      required: "Este campo es obligatorio",
                      validate: validateFechaPedido,
                    })}
                    readOnly={isEdit}
                  />
                  <label className="form-label" htmlFor="fechaPedido">
                    Fecha Pedido *
                  </label>
                </div>
                {errors.fechaPedido && (
                  <div className="text-danger mt-1">
                    {errors.fechaPedido.message}
                  </div>
                )}
              </div>

              {/* Cantidad Cabello input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <input
                    type="number"
                    id="cantCabello"
                    className="form-control"
                    {...register("cantCabello", {
                      required: "Este campo es obligatorio",
                      min: {
                        value: 1,
                        message: "El valor de este campo debe ser positivo",
                      },
                      maxLength: {
                        value: 11,
                        message:
                          "La cantidad de cabello no debe superar los 11 dígitos",
                      },
                    })}
                  />
                  <label className="form-label" htmlFor="cantCabello">
                    Cantidad Cabello (Kg) *
                  </label>
                </div>
                {errors.cantCabello && (
                  <div className="text-danger mt-1">
                    {errors.cantCabello.message}
                  </div>
                )}
              </div>

              {isEdit && (
                <div className="form-group mb-4">
                  <div className="form-outline">
                    <input
                      type="number"
                      id="cantPelucasLlegaron"
                      className="form-control"
                      {...register("cantPelucasLlegaron", {
                        maxLength: {
                          value: 11,
                          message:
                            "La cantidad de pelucas que llegaron no debe superar los 11 dígitos",
                        },
                        min: {
                          value: 1,
                          message: "El valor de este campo debe ser positivo",
                        },
                      })}
                    />
                    <label className="form-label" htmlFor="cantPelucasLlegaron">
                      Cantidad de Pelucas que llegaron
                    </label>
                  </div>
                  {errors.cantPelucasLlegaron && (
                    <div className="text-danger mt-1">
                      {errors.cantPelucasLlegaron.message}
                    </div>
                  )}
                </div>
              )}

              {/* Submit button */}
              <div className="row mb-4">
                <div className="col-md-12">
                  <RegisterButton
                    accion={
                      isEdit ? "Guardar Cambios" : "Registrar Pedido Peluca"
                    }
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12">
                  <CancelButton
                    onClick={() => navigateToListPedidos()}
                  ></CancelButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoPelucaForm;

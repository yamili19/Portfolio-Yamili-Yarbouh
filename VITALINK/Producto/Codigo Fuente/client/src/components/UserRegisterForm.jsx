/* eslint-disable react/prop-types */

import useLoadMDBScript from "../hooks/useLoadMDBScript";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import "../css/userRegisterForm.css";

const UserRegisterForm = ({ onSubmit }) => {
  useLoadMDBScript();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmitRegisterUser = (usuario) => {
    onSubmit(usuario);
  };
  return (
    <div className="container py-3 h-100 mt-1 mb-1">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{ borderRadius: "25px" }}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p className="title-register-user text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Crea tu cuenta VitaLink
                  </p>
                  <form
                    className="mx-1 mx-md-4"
                    onSubmit={handleSubmit(onSubmitRegisterUser)}
                  >
                    <div className="d-flex flex-row align-items-center mb-4">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="fa-lg me-3 fa-fw"
                      ></FontAwesomeIcon>
                      <div
                        data-mdb-input-init
                        className="form-group flex-fill mb-0"
                      >
                        <div className="form-outline">
                          <input
                            type="text"
                            id="nombreUsuario"
                            className="form-control"
                            {...register("nombreUsuario", {
                              required: "Este campo es obligatorio",
                              maxLength: {
                                value: 255,
                                message:
                                  "El nombre de usuario debe contener menos de 255 caracteres",
                              },
                            })}
                          />
                          <label className="form-label" htmlFor="nombreUsuario">
                            Nombre Usuario *
                          </label>
                        </div>
                        {errors.nombreUsuario && (
                          <div className="text-danger mt-1">
                            {errors.nombreUsuario.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="fa-lg me-3 fa-fw"
                      ></FontAwesomeIcon>
                      <div
                        data-mdb-input-init
                        className="form-group flex-fill mb-0"
                      >
                        <div className="form-outline">
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            {...register("email", {
                              required: "Este campo es obligatorio",
                              pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Formato de email incorrecto",
                              },
                              maxLength: {
                                value: 255,
                                message:
                                  "El email debe contener menos de 255 caracteres",
                              },
                            })}
                          />
                          <label className="form-label" htmlFor="email">
                            Email *
                          </label>
                        </div>
                        {errors.email && (
                          <div className="text-danger mt-1">
                            {errors.email.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="fa-lg me-3 fa-fw"
                      ></FontAwesomeIcon>
                      <div
                        data-mdb-input-init
                        className="form-group flex-fill mb-0"
                      >
                        <div className="form-outline">
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            {...register("password", {
                              required: "Este campo es obligatorio",
                              maxLength: {
                                value: 255,
                                message:
                                  "La contraseña debe contener menos de 255 caracteres",
                              },
                            })}
                          />
                          <label className="form-label" htmlFor="password">
                            Contraseña *
                          </label>
                        </div>
                        {errors.password && (
                          <div className="text-danger mt-1">
                            {errors.password.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <FontAwesomeIcon
                        icon={faKey}
                        className="fa-lg me-3 fa-fw"
                      ></FontAwesomeIcon>
                      <div
                        data-mdb-input-init
                        className="form-group flex-fill mb-0"
                      >
                        <div className="form-outline">
                          <input
                            type="password"
                            id="passwordRepeat"
                            className="form-control"
                            {...register("passwordRepeat", {
                              required: "Este campo es obligatorio",
                              maxLength: {
                                value: 255,
                                message:
                                  "La contraseña debe contener menos de 255 caracteres",
                              },
                              validate: (value) =>
                                value === password ||
                                "Las contraseñas no coinciden",
                            })}
                          />
                          <label
                            className="form-label"
                            htmlFor="passwordRepeat"
                          >
                            Repita Contraseña *
                          </label>
                        </div>
                        {errors.passwordRepeat && (
                          <div className="text-danger mt-1">
                            {errors.passwordRepeat.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-lg"
                      >
                        Registrarse
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    className="img-fluid"
                    alt="Registro"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterForm;

/* eslint-disable react/prop-types */

import useLoadMDBScript from "../hooks/useLoadMDBScript";
import { useNavigate } from "react-router-dom";
import "../css/userLoginForm.css";
import { useForm } from "react-hook-form";
import logo from "../assets/images/img-logo-removebg.png";

const UserLoginForm = ({ onSubmit }) => {
  useLoadMDBScript();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitLoginUser = (usuario) => {
    //console.log("Usuario logueado: ", data);
    onSubmit(usuario);
  };

  const navigateToPageRegisterUser = () => {
    const urlRegisterUser = "/registrarse";
    navigate(urlRegisterUser);
  };
  return (
    <>
      <div className="container py-3 h-100 mt-1 mb-1">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img src={logo} style={{ width: "185px" }} alt="logo" />
                      <h4 className="title-login-user mt-1 mb-5 pb-1">
                        Nosotros somos el equipo de VitaLink
                      </h4>
                    </div>

                    <form onSubmit={handleSubmit(onSubmitLoginUser)}>
                      <p>Por Favor, ingrese a su cuenta</p>
                      <div className="form-group mb-4">
                        <div className="form-outline">
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Ingrese su email de VitaLink"
                            {...register("email", {
                              required: "Este campo es obligatorio",
                              maxLength: {
                                value: 255,
                                message:
                                  "El email no debe contener más de 255 caracteres",
                              },
                              pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Formato de email incorrecto",
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

                      <div className="form-group mb-4">
                        <div className="form-outline">
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Ingrese la contraseña"
                            {...register("password", {
                              required: "Este campo es obligatorio",
                              maxLength: {
                                value: 255,
                                message:
                                  "La contraseña no debe contener más de 255 caracteres",
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

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          Ingresar
                        </button>
                        {/*
                          <a className="text-muted" href="#!">
                            Olvido su contraseña?
                          </a>
                           */}
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">¿No tienes una cuenta?</p>
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-outline-danger"
                          onClick={() => navigateToPageRegisterUser()}
                        >
                          Crear cuenta
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">
                      Empoderando con Esperanza y Solidaridad
                    </h4>
                    <p className="small mb-0">
                      En VitaLink, transformamos el coraje en confianza. Nuestro
                      compromiso es brindar esperanza y fuerza a pacientes
                      oncológicos a través de la donación de pelucas hechas con
                      amor y solidaridad. Cada peluca cuenta una historia de
                      compasión, ayudando a nuestros héroes a enfrentar el
                      desafío del cáncer con dignidad y valentía.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLoginForm;

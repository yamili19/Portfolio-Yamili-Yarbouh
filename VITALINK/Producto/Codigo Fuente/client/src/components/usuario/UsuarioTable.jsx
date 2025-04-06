/* eslint-disable react/prop-types */

/**
 * Archivo que representa la estructura de la tabla de usuarios
 */
//import React from "react";

import { useState } from "react";
import { showConfirmationAlert } from "../../utils/sweetAlertGeneralize";
import Loading from "../loading/Loading";

const UsuarioTable = ({ usuarios, roles, onDelete, onUpdateRole }) => {
  let count = 1;
  const [selectedRoles, setSelectedRoles] = useState({});

  const getRolColor = (rol) => {
    switch (rol) {
      case 1:
        return "bg-danger text-white"; //Rojo para Coordinadora General
      case 2:
        return "bg-secondary text-white"; //Gris para Admin
      case 3:
        return "bg-warning text-white"; //Amarillo para Peluquero
      case 4:
        return "bg-success text-white"; //Verde para Usuario común
      default:
        return "bg-dark text-white"; //Negro para el resto
    }
  };

  /**
   * Función para confirmar la eliminación del usuario
   * @param {*} nombreUsuario Pasar el nombre del usuario a eliminar
   */
  const confirmDeleteUsuario = (nombreUsuario) => {
    showConfirmationAlert("¿Desea eliminar este Usuario?", () => {
      onDelete(nombreUsuario);
    });
  };

  const handleRoleChange = (nombreUsuario, rolId) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [nombreUsuario]: Number(rolId),
    }));
  };

  const confirmUpdateRolUsuario = (nombreUsuario) => {
    showConfirmationAlert(
      `¿Desea actualizar el rol del Usuario ${nombreUsuario}`,
      () => {
        onUpdateRole(nombreUsuario, selectedRoles[nombreUsuario]);
      }
    );
  };

  if (!usuarios || !roles) {
    return <Loading></Loading>;
  }

  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h5>Administración de Usuarios</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>USUARIO</th>
                  <th>EMAIL</th>
                  <th>ROL</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.nombreUsuario}>
                    <td>{count++}</td>
                    <td>{usuario.nombreUsuario}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <div className="position-relative d-inline-block">
                        <select
                          className={`form-select form-select-sm border-0 rounded-pill ${
                            usuario.rol
                              ? getRolColor(usuario.rol)
                              : "text-muted bg-transparent"
                          } pe-4 text-center`}
                          style={{
                            appearance: "none",
                            backgroundImage:
                              "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.5rem center",
                            backgroundSize: "1em",
                            outline: "none",
                            boxShadow: "none",
                            width: "auto",
                            paddingRight: "1.5rem",
                            minWidth: "120px",
                          }}
                          value={
                            selectedRoles[usuario.nombreUsuario] ??
                            usuario.rol ??
                            ""
                          }
                          onChange={(e) =>
                            handleRoleChange(
                              usuario.nombreUsuario,
                              e.target.value
                            )
                          }
                        >
                          {!usuario.rol && (
                            <option value="">- Sin rol -</option>
                          )}
                          {roles.map((rol) => (
                            <option key={rol.id} value={rol.id}>
                              {rol.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() =>
                          confirmUpdateRolUsuario(usuario.nombreUsuario)
                        }
                        disabled={
                          !selectedRoles[usuario.nombreUsuario] ||
                          selectedRoles[usuario.nombreUsuario] === usuario.rol
                        }
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() =>
                          confirmDeleteUsuario(usuario.nombreUsuario)
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsuarioTable;

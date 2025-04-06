/**
 * Archivo controlador para el manejo de las peticiones para el prestamo de peluca
 */
const { sequelize } = require("../config/mariaDb");
const {
  prestamoModel,
  clienteModel,
  pelucaModel,
  usuarioModel,
  obraSocialModel,
  afiliacionModel,
  vinculoModel,
} = require("../models");
const handleHttpError = require("../utils/handleError");
const { sendEmailDonante, sendEmailCliente } = require("../config/emailer");

const getAllPrestamo = async (req, res) => {
  try {
    // Obtenemos todos los préstamos
    const prestamos = await prestamoModel.FindAllDataPrestamo();

    // Se Filtra los préstamos que deben ser actualizados en caso de demora
    const prestamosEnDemora = prestamos.filter((prestamo) => {
      const fechaDevolucion = new Date(prestamo.fechaDevolucion); // Aseguramos que sea un objeto Date
      const fechaActual = new Date(); // Obtenemos la fecha actual

      return (
        fechaDevolucion < fechaActual &&
        prestamo.estadoPrestamo !== 2 &&
        prestamo.estadoPrestamo !== 3
      );
    });

    // Actualiza el estado de los préstamos que deben ser actualizados
    if (prestamosEnDemora.length > 0) {
      await Promise.all(
        prestamosEnDemora.map((prestamo) => {
          return prestamoModel.update(
            { estadoPrestamo: 5 }, // Actualiza a "En Demora"
            { where: { nroPrestamo: prestamo.nroPrestamo } }
          );
        })
      );
    }

    // Devuelve los préstamos actualizados
    const updatedPrestamos = await prestamoModel.FindAllDataPrestamo();
    res.status(200).json(updatedPrestamos);
  } catch (error) {
    console.log("Error, no se pudo obtener los prestamos: ", error);
    handleHttpError(res, "ERROR_GET_ALL_PRESTAMO", 500);
  }
};

const getPrestamoByNro = async (req, res) => {
  try {
    const { nroPrestamo } = req.params;
    const prestamo = await prestamoModel.FindOneDataPrestamo(nroPrestamo);

    if (!prestamo) {
      return handleHttpError(res, "ERROR_PRESTAMO_NOT_FOUND", 404);
    }

    res.status(200).json(prestamo);
  } catch (error) {
    console.log("Error, no se pudo obtener el prestamo: ", error);
    handleHttpError(res, "ERROR_GET_BY_NRO_PRESTAMO", 500);
  }
};

const createPrestamo = async (req, res) => {
  const {
    dni,
    nombre,
    apellido,
    nroTelefono,
    ciudad,
    codigoPeluca,
    vinculo,
    obraSocial,
  } = req.body;
  let { usuario } = req.body;
  const fechaPrestamo = new Date();
  // Por defecto la fecha de devolución son 8 meses
  const fechaDevolucion = new Date(fechaPrestamo);
  fechaDevolucion.setMonth(fechaDevolucion.getMonth() + 8);
  let nroAfiliacion = null;
  const transaction = await sequelize.transaction();

  try {
    //Se verifica si existe una peluca con dicho código
    const peluca = await pelucaModel.findByPk(codigoPeluca);

    if (!peluca) {
      return handleHttpError(res, "ERROR_PELUCA_NOT_FOUND", 404);
    }

    //Se verifica la peluca con dicho código esta disponoble
    const pelucaEnPrestamo = await prestamoModel.isPelucaEnPrestamo(
      codigoPeluca
    );

    //Si retorna true, entonces esa peluca no esta disponible
    if (pelucaEnPrestamo) {
      return handleHttpError(res, "ERROR_PELUCA_EN_PRESTAMO", 409);
    }

    //Se verifica si existe un usuario con el email ingresado
    if (usuario) {
      let existUser = await usuarioModel.findOne({
        where: { email: usuario },
      });

      usuario = !existUser ? null : existUser.email;
    }

    if (obraSocial) {
      //Se verifica si existe una obra social con el id de obra social ingresado
      const obra = await obraSocialModel.findOne({
        where: {
          id: obraSocial,
        },
      });

      if (!obra) {
        return handleHttpError(res, "ERROR_OBRA_SOCIAL_NOT_FOUND", 404);
      }

      //Verficicar si existe una afiliacion con id de la obra social ingresado y el dni
      nroAfiliacion = await afiliacionModel.findAfiliacionByObraSocialAndDni(
        obraSocial,
        dni
      );

      //Si no existe se crea una nueva afiliación
      if (!nroAfiliacion) {
        const newAfiliacion = await afiliacionModel.create(
          {
            obraSocial,
            dni,
          },
          { transaction }
        );
        nroAfiliacion = newAfiliacion.nroAfiliacion;
      }
    }

    //Se verifica si el cliente ya existe
    let cliente = await clienteModel.findByPk(dni, { transaction });

    //Si el cliente no existe se procede a crear el mismo
    if (!cliente) {
      cliente = await clienteModel.create(
        {
          nombre,
          apellido,
          dni,
          nroTelefono,
          ciudad,
          usuario,
        },
        { transaction }
      );
    }

    //Se define el estado del préstamo, por defecto es En Prestamo (1)
    const estadoPrestamo = setEstadoPrestamo(1);

    //Se crea el nuevo préstamo
    const newPrestamo = await prestamoModel.create(
      {
        dni,
        codigoPeluca,
        fechaPrestamo,
        vinculo,
        fechaDevolucion,
        estadoPrestamo,
        nroAfiliacion,
      },
      { transaction }
    );

    // Actualiza el estado de la peluca a "Usada", si esta en estado "Rota" se mantiene en rota
    await pelucaModel.updateEstadoPelucaToUsada(codigoPeluca, transaction);

    await transaction.commit();
    res
      .status(201)
      .json({ message: "Préstamo registrado con éxito", data: newPrestamo });
  } catch (error) {
    await transaction.rollback();
    console.log("Error, no se pudo registrar el prestamo: ", error);
    handleHttpError(res, "ERROR_CREATE_PRESTAMO", 500);
  }
};

// Después del cambio de estado que se le envie el mail al cliente preguntandole si quiere realizar 
// una donación monetaria
const updatePrestamo = async (req, res) => {
  const { nroPrestamo } = req.params;
  const {
    nombre,
    apellido,
    nroTelefono,
    ciudad,
    codigoPeluca,
    vinculo,
    obraSocial,
    fechaDevolucion,
  } = req.body;
  let { usuario, estadoPrestamo } = req.body;
  let nroAfiliacion = null;
  const transaction = await sequelize.transaction();
  console.log("Datos recibidos en el body: ", req.body);
  try {
    //Verificamos si existe el número de préstamo que se obtiene por párametro
    const prestamo = await prestamoModel.findByPk(nroPrestamo);

    if (!prestamo) {
      return handleHttpError(res, "ERROR_PRESTAMO_NOT_FOUND", 404);
    }

    const fechaPrestamo = new Date(prestamo.fechaPrestamo);
    const fechaDevolucionDate = new Date(fechaDevolucion);

    // Verificamos que la fechaDevolucion no sea menor o igual a la fechaPrestamo
    if (fechaDevolucionDate <= fechaPrestamo) {
      return handleHttpError(res, "ERROR_FECHA_DEVOLUCION_INVALIDA", 400);
    }

    //Si el estado actual es: En Demora, solo puede cambiar a Devuelto
    if (
      (Number(prestamo.estadoPrestamo === 5) ||
        Number(prestamo.estadoPrestamo === 4)) &&
      Number(estadoPrestamo) !== 2
    ) {
      return handleHttpError(res, "ERROR_ESTADO_INVALIDO", 400);
    }

    //Si existe el préstamo, verificamos si existe el cliente para actualizar sus datos si es necesario
    const cliente = await clienteModel.findByPk(prestamo.dni);
    if (!cliente) {
      return handleHttpError("ERROR_CLIENTE_NOT_FOUND", 404);
    }

    //Se verifica si existe un usuario con el email ingresado
    if (usuario) {
      let existUser = await usuarioModel.findOne({
        where: { email: usuario },
      });

      usuario = !existUser ? null : existUser.email;
    }

    //Si existe el cliente, verificamos si existe la peluca seleccionada
    const peluca = await pelucaModel.findByPk(codigoPeluca);
    if (!peluca) {
      return handleHttpError(res, "ERROR_PELUCA_NOT_FOUND", 404);
    }

    //Se verifica la peluca con dicho código esta disponoble
    if (Number(codigoPeluca) !== Number(prestamo.codigoPeluca)) {
      const pelucaEnPrestamo = await prestamoModel.isPelucaEnPrestamo(
        codigoPeluca
      );

      //Si retorna true, entonces esa peluca no esta disponible
      if (pelucaEnPrestamo) {
        return handleHttpError(res, "ERROR_PELUCA_EN_PRESTAMO", 409);
      }
    }

    //Se verifica si existe el vinculo
    const existVinculo = await vinculoModel.findByPk(vinculo);
    if (!existVinculo) {
      return handleHttpError(res, "ERROR_VINCULO_NOT_FOUND", 404);
    }

    if (obraSocial) {
      //Se verifica si existe una obra social con el id de obra social ingresado
      const obra = await obraSocialModel.findOne({
        where: {
          id: obraSocial,
        },
      });

      if (!obra) {
        return handleHttpError(res, "ERROR_OBRA_SOCIAL_NOT_FOUND", 404);
      }

      //Verficicar si existe una afiliacion con id de la obra social ingresado y el dni
      nroAfiliacion = await afiliacionModel.findAfiliacionByObraSocialAndDni(
        obraSocial,
        prestamo.dni
      );

      //Si no existe se crea una nueva afiliación
      if (!nroAfiliacion) {
        const newAfiliacion = await afiliacionModel.create(
          {
            obraSocial,
            dni: prestamo.dni,
          },
          { transaction }
        );
        nroAfiliacion = newAfiliacion.nroAfiliacion;
      }
    }

    //Verificamos si la fecha de devolución es menor o igual a la fecha de préstamo

    //Actualizamos los datos del cliente
    await cliente.update(
      {
        nombre,
        apellido,
        nroTelefono: nroTelefono,
        ciudad,
        usuario,
      },
      { transaction }
    );

    //Actualizamos los datos del préstamo
    await prestamo.update(
      {
        codigoPeluca,
        vinculo,
        fechaDevolucion: fechaDevolucionDate,
        estadoPrestamo: Number(estadoPrestamo),
        nroAfiliacion,
      },
      { transaction }
    );

    // Actualiza el estado de la peluca a "Usada", si esta en estado "Rota" se mantiene en rota
    await pelucaModel.updateEstadoPelucaToUsada(codigoPeluca, transaction);

    //Se envía el correo y se verifica el estadio del envío
    await sendEmailCliente(cliente);

    await transaction.commit();
    res
      .status(200)
      .json({ message: "Préstamo actualizado exitosamente", data: prestamo });
  } catch (error) {
    await transaction.rollback();
    console.log("Error, no se pudo actualizar el préstamo: ", error);
    handleHttpError("ERROR_PUT_PRESTAMO", 500);
  }
};

const updateRenovarPrestamo = async (req, res) => {
  const { nroPrestamo } = req.params;
  const { fechaDevolucion } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const prestamo = await prestamoModel.findByPk(nroPrestamo, { transaction });
    if (!prestamo) {
      return handleHttpError(res, "ERROR_PRESTAMO_NOT_FOUND", 404);
    }

    //Verificamos que la fecha devolución sea mayor a la fecha de préstamo,a la actual y la fecha de devolución actual del préstamo
    const fechaDevolucionDate = new Date(fechaDevolucion);
    const fechaPrestamoDate = new Date(prestamo.fechaPrestamo);
    const fechaActualDate = new Date();
    const fechaActualDevolucionDate = new Date(prestamo.fechaDevolucion);

    // Verificar que fechaDevolucion sea mayor que fechaPrestamo, la fecha actual y la fechaDevolucion actual
    if (
      fechaDevolucionDate <= fechaPrestamoDate ||
      fechaDevolucionDate <= fechaActualDate ||
      fechaDevolucionDate <= fechaActualDevolucionDate
    ) {
      await transaction.rollback();
      return handleHttpError(res, "ERROR_FECHA_DEVOLUCION_INVALIDA", 400);
    }

    await prestamo.update(
      {
        fechaDevolucion: fechaDevolucion,
        estadoPrestamo: setEstadoPrestamo(4),
      },
      { transaction }
    );

    await transaction.commit();
    res
      .status(200)
      .json({ message: "Préstamo renovado exitosamente: ", data: prestamo });
  } catch (error) {
    await transaction.rollback();
    console.log("Error, no se pudo renovar el préstamo: ", error);
    handleHttpError(res, "ERROR_PUT_RENOVAR_PRESTAMO", 500);
  }
};

const deletePrestamo = async (req, res) => {
  try {
    const { nroPrestamo } = req.params;
    const prestamo = await prestamoModel.findOne({
      where: { nroPrestamo },
    });

    if (!prestamo) {
      return handleHttpError(res, "ERROR_PRESTAMO_NOT_FOUND", 404);
    }

    await prestamo.destroy();

    res
      .status(200)
      .json({ message: "Préstamo eliminada con éxito", data: prestamo });
  } catch (error) {
    console.log("Error, no se pudo eliminar el préstamo: ", error);
    handleHttpError("ERROR_DELETE_PRESTAMO", 500);
  }
};

/**
 * Función para actualizar el estado del préstamo
 * 1 - En Prestamo
 * 2 - Devuelta
 * 3 - Donada
 * 4 - Renovó
 * 5 - En Demora
 * @param {*} idEstadoPrestamo - Pasar el id del estado del préstamo a asignar
 */
const setEstadoPrestamo = (idEstadoPrestamo) => {
  return idEstadoPrestamo;
};

const getResumenPrestamo = async (req, res) => {
  try {
    const resumenPrestamo = await prestamoModel.obtenerResumenPrestamo();
    const resumenData = {
      totalPrestamos: resumenPrestamo.totalPrestamos,
      enPrestamo: resumenPrestamo.enPrestamo,
      renovado: resumenPrestamo.renovado,
      enDemora: resumenPrestamo.enDemora,
    };
    res.status(200).json({
      message: "Datos resumen de los préstamos: ",
      data: resumenData,
    });
  } catch (error) {
    console.log(
      "Error, no se pudo obtener el resumen de los préstamos: ",
      error
    );
    handleHttpError(res, "ERROR_GET_RESUMEN_PRESTAMO", 500);
  }
};

module.exports = {
  getAllPrestamo,
  getPrestamoByNro,
  createPrestamo,
  updatePrestamo,
  updateRenovarPrestamo,
  deletePrestamo,
  getResumenPrestamo,
};
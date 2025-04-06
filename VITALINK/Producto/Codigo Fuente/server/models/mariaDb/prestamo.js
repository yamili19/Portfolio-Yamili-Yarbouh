/**
 * Archivo que se usa para definir el modelo que representa la tabla prestamo
 */

const { Op, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");
const Peluca = require("./peluca");
const Vinculo = require("./vinculo");
const EstadoPrestamo = require("./estadoPrestamo");
const Afiliacion = require("./afiliacion");
const Cliente = require("./cliente");
const ObraSocial = require("./obraSocial");
const Ciudad = require("./ciudad");

const Prestamo = sequelize.define(
  "prestamo",
  {
    nroPrestamo: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      references: {
        model: "cliente",
        key: "dni",
      },
    },
    codigoPeluca: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "peluca",
        key: "codigo",
      },
    },
    fechaPrestamo: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    vinculo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "vinculo",
        key: "id",
      },
    },
    fechaDevolucion: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    estadoPrestamo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "estado_prestamo",
        key: "id",
      },
    },
    nroAfiliacion: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: "afiliacion",
        key: "nroAfiliacion",
      },
    },
  },
  {
    tableName: "prestamo",
    timestamps: false,
  }
);

//Se define la relación con la tabla peluca
Prestamo.belongsTo(Peluca, {
  foreignKey: "codigoPeluca",
  as: "Peluca",
});

//Se define la relación con la tabla cliente
Prestamo.belongsTo(Cliente, {
  foreignKey: "dni",
  as: "cliente",
});

//Se define la relación con la tabla vinculo
Prestamo.belongsTo(Vinculo, {
  foreignKey: "vinculo",
  as: "Vinculo",
});

//Se define la relación con la tabla estadoPrestamo
Prestamo.belongsTo(EstadoPrestamo, {
  foreignKey: "estadoPrestamo",
  as: "EstadoPrestamo",
});

//Se define la relación con la tabla nroAfiliación
Prestamo.belongsTo(Afiliacion, {
  foreignKey: "nroAfiliacion",
  as: "afiliado",
});

//Función para obtener en detalles los datos del préstamo
Prestamo.FindAllDataPrestamo = function () {
  return this.findAll({
    include: [
      {
        model: Cliente,
        as: "cliente",
        attributes: [
          "nombre",
          "apellido",
          "dni",
          "nroTelefono",
          "nroTelefono",
          "ciudad",
          "estaEnListaDeEspera",
          "usuario",
        ],
        include: [
          {
            model: Ciudad,
            as: "ciudadClienteData",
            attributes: ["nombre"],
          },
        ],
      },
      {
        model: Peluca,
        as: "Peluca",
        attributes: ["codigo", "talle", "color", "foto"],
      },
      {
        model: Vinculo,
        as: "Vinculo",
        attributes: ["nombre"],
      },
      {
        model: EstadoPrestamo,
        as: "EstadoPrestamo",
        attributes: ["nombre"],
      },
      {
        model: Afiliacion,
        as: "afiliado",
        attributes: ["nroAfiliacion", "obraSocial", "dni"],
        include: [
          {
            model: ObraSocial,
            as: "obraSocialData",
            attributes: ["nombre"],
          },
        ],
      },
    ],
    order: [["fechaPrestamo", "DESC"]],
  });
};

Prestamo.FindOneDataPrestamo = function (nroPrestamo) {
  return this.findOne({
    where: { nroPrestamo },
    include: [
      {
        model: Cliente,
        as: "cliente",
        attributes: [
          "nombre",
          "apellido",
          "dni",
          "nroTelefono",
          "nroTelefono",
          "ciudad",
          "estaEnListaDeEspera",
          "usuario",
        ],
        include: [
          {
            model: Ciudad,
            as: "ciudadClienteData",
            attributes: ["nombre"],
          },
        ],
      },
      {
        model: Peluca,
        as: "Peluca",
        attributes: ["codigo", "talle", "color", "foto"],
      },
      {
        model: Vinculo,
        as: "Vinculo",
        attributes: ["nombre"],
      },
      {
        model: EstadoPrestamo,
        as: "EstadoPrestamo",
        attributes: ["nombre"],
      },
      {
        model: Afiliacion,
        as: "afiliado",
        attributes: ["nroAfiliacion", "obraSocial", "dni"],
        include: [
          {
            model: ObraSocial,
            as: "obraSocialData",
            attributes: ["nombre"],
          },
        ],
      },
    ],
    order: [["fechaPrestamo", "DESC"]],
  });
};

//Función para verificar si una peluca está en préstamo
/**
 * Función para verificar si una peluca está en préstamo
 * @param {*} codigoPeluca - Pasar el códigod de la peluca
 * @returns - Retorna true si la peluca esta en préstamo, false en caso contrario
 */
Prestamo.isPelucaEnPrestamo = async function (codigoPeluca) {
  const prestamo = await this.findOne({
    where: {
      codigoPeluca,
      estadoPrestamo: {
        [Op.not]: 2, // Estado distinto de "Devuelta"
      },
    },
  });
  return !!prestamo; // Retorna true si la peluca está en préstamo, false si no lo está
};

// Función para verificar si una peluca está en préstamo activo, en demora, o renovada
Prestamo.isPelucaDisponible = async function (codigoPeluca) {
  // Buscar si existe algún préstamo activo, en demora o renovado para la peluca
  const prestamoActivo = await this.findOne({
    where: {
      codigoPeluca,
      [Op.or]: [
        { estadoPrestamo: 1 }, // En Préstamo
        { estadoPrestamo: 4 }, // Renovó
        { estadoPrestamo: 5 }, // En Demora
      ],
    },
  });

  // La peluca está disponible si no hay ningún préstamo activo, renovado o en demora
  return !prestamoActivo; // Devuelve true si no hay ningún préstamo activo, renovado o en demora, false en caso contrario
};

Prestamo.obtenerResumenPrestamo = async function () {
  try {
    const resumen = await this.findOne({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("nroPrestamo")), "totalPrestamos"],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal(`CASE WHEN estadoPrestamo = 1 THEN 1 ELSE 0 END`)
          ),
          "enPrestamo",
        ],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal(`CASE WHEN estadoPrestamo = 4 THEN 1 ELSE 0 END`)
          ),
          "renovado",
        ],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal(`CASE WHEN estadoPrestamo = 5 THEN 1 ELSE 0 END`)
          ),
          "enDemora",
        ],
      ],
      raw: true,
    });

    console.log("Resumen de préstamos:", resumen); // Agregado para depuración

    return resumen;
  } catch (error) {
    throw new Error(
      "Error al obtener el resumen de préstamos: " + error.message
    );
  }
};

/* 
Esta funcion recibe dos años como parametro y me devuelvelos prestamos que se encuentran 
en estado en En Demora, el total, el total por año y la cantidad de prestamos que al dia 
de la fecha ya deberían haber finalizado (sin importar si realmente finalizaron o no)
*/
Prestamo.getCantidadPelucasNoDevueltasPorAño = async function (yearStart, yearEnd) {
  try {
    // Consulta para obtener la cantidad de pelucas no devueltas por año en el rango especificado
    const pelucasNoDevueltasPorAno = await this.findAll({
      attributes: [
        [sequelize.fn("YEAR", sequelize.col("fechaPrestamo")), "year"],
        [sequelize.fn("COUNT", sequelize.col("codigoPeluca")), "cantidadNoDevueltas"],
      ],
      where: {
        estadoPrestamo: 5, // EN DEMORA
        fechaPrestamo: {
          [Op.between]: [new Date(`${yearStart}-01-01`), new Date(`${yearEnd}-12-31`)],
        },
      },
      group: [sequelize.fn("YEAR", sequelize.col("fechaPrestamo"))],
      order: [[sequelize.fn("YEAR", sequelize.col("fechaPrestamo")), "ASC"]],
      raw: true,
    });

    // Calcular el total de pelucas no devueltas en todo el rango de años
    const totalNoDevueltas = pelucasNoDevueltasPorAno.reduce(
      (sum, item) => sum + parseInt(item.cantidadNoDevueltas),
      0
    );

    // Organizar los datos por año
    const response = {};
    for (let year = yearStart; year <= yearEnd; year++) {
      const yearData = pelucasNoDevueltasPorAno.find((d) => d.year === year);
      response[year] = yearData ? parseInt(yearData.cantidadNoDevueltas) : 0;
    }

    console.log("Response: ", response);

    // Consulta adicional para obtener el total de préstamos que deberían haber finalizado
    const prestamosFinalizados = await this.count({
      where: {
        fechaDevolucion: {
          [Op.lte]: new Date(), // fechaDevolucion <= fecha actual
        },
      },
    });

    return {
      total: totalNoDevueltas, // Total de pelucas no devueltas en todos los años
      pelucasPorAño: response, // Datos de pelucas no devueltas por año
      totalPrestamosFinalizados: prestamosFinalizados, // Total de préstamos finalizados
    };
  } catch (error) {
    throw new Error(
      "Error al obtener la cantidad de pelucas no devueltas y préstamos finalizados: " + error.message
    );
  }
};

Prestamo.obtenerResumenPrestamosPorAnios = async function (anioInicio, anioFin) {
  try {
    // Obtener todos los préstamos devueltos en el rango de años especificado
    const prestamosDevueltos = await this.findAll({
      where: {
        estadoPrestamo: 2, // Suponiendo que el estado "Devuelta" es 2
        fechaPrestamo: {
          [Op.between]: [new Date(`${anioInicio}-01-01`), new Date(`${anioFin}-12-31`)],
        },
      },
      raw: true,
    });

    // Contar la cantidad total de préstamos devueltos
    const cantidadPrestamosTotal = prestamosDevueltos.length;
    // Inicializar variables para el conteo por año y el tiempo total en meses
    let tiempoTotalMeses = 0;
    let prestamosPorAnio = {
      [1]: 0,
      [2]: 0,
    };

    prestamosDevueltos.forEach((prestamo) => {
      const fechaDevolucion = new Date(prestamo.fechaDevolucion);
      const fechaPrestamo = new Date(prestamo.fechaPrestamo);

      // Calcular la diferencia en meses
      const diferenciaMeses = (fechaDevolucion.getFullYear() - fechaPrestamo.getFullYear()) * 12 + 
                              (fechaDevolucion.getMonth() - fechaPrestamo.getMonth());
      tiempoTotalMeses += diferenciaMeses;

      // Contar el préstamo en el año de su fecha de préstamo
      const anioPrestamo = fechaPrestamo.getFullYear();
      if (anioPrestamo.toString() === anioInicio) {
        prestamosPorAnio[1] += 1;
      }
      if (anioPrestamo.toString() === anioFin) {
        prestamosPorAnio[2] += 1;
      }
    });
    console.log("Total: ", cantidadPrestamosTotal);
    console.log("Tiempo total: ", tiempoTotalMeses);
    console.log("totalPorAnio", prestamosPorAnio)

    return {
      total: cantidadPrestamosTotal,
      tiempoTotal: tiempoTotalMeses,
      totalPorAnio: prestamosPorAnio,
    };
  } catch (error) {
    throw new Error("Error al obtener el resumen de préstamos: " + error.message);
  }
};




module.exports = Prestamo;

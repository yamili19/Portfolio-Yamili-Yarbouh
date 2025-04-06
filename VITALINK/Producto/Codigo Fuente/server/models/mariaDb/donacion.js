/**
 * En este archivo se define el modelo de la tabla 'donacion'
 */

const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");
const Donante = require("./donante");
const PeluqueriaAsociada = require("./peluqueria");

const Donacion = sequelize.define(
  "donacion",
  {
    fecha: {
      type: DataTypes.DATE,
      primaryKey: true,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
      references: {
        model: "donante",
        key: "mail",
      },
    },
    entidad: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: "peluqueria asociada",
        key: "nombre",
      },
    },
    mailEnviado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    tableName: "donacion",
    timestamps: false,
  }
);

//Se define la asociación con la tabla donante
Donacion.belongsTo(Donante, {
  foreignKey: "mail",
  as: "Donante",
});

//Se define la asociación con la tabla peluquería
Donacion.belongsTo(PeluqueriaAsociada, {
  foreignKey: "entidad",
  as: "Peluqueria",
});

//Método para devolver las donaciones en conjunto con los datos del donante
Donacion.findAllWithDonante = function () {
  return this.findAll({
    include: {
      model: Donante,
      as: "Donante",
      attributes: ["mail", "telefono", "nombre", "apellido"],
    },
    order: [["fecha", "DESC"]],
  });
};

//Método para devolver una donación en conjunto con los datos del donante
Donacion.findWithDonante = function (fecha) {
  return this.findOne({
    where: { fecha },
    include: {
      model: Donante,
      as: "Donante",
      attributes: ["mail", "telefono", "nombre", "apellido"],
    },
  });
};

// Método para obtener las donaciones agrupadas por mes en un año específico
Donacion.getDonationsByMonth = async function (year) {
  const donationsByMonth = await this.findAll({
    attributes: [
      [sequelize.fn("MONTH", sequelize.col("fecha")), "mes"],
      [sequelize.fn("COUNT", sequelize.col("fecha")), "cantidad"],
    ],
    where: {
      fecha: {
        [Op.between]: [new Date(`${year}-01-01`), new Date(`${year}-12-31`)],
      },
    },
    group: [sequelize.fn("MONTH", sequelize.col("fecha"))],
    order: [[sequelize.fn("MONTH", sequelize.col("fecha")), "ASC"]],
  });

  // Calcular el total de donaciones del año
  const totalDonations = donationsByMonth.reduce(
    (sum, item) => sum + parseInt(item.dataValues.cantidad),
    0
  );

  // Se crea un Array para representar los 12 meses
  const response = Array.from({ length: 12 }, (_, index) => {
    const monthData = donationsByMonth.find(
      (d) => d.dataValues.mes === index + 1
    );
    return {
      mes: index + 1, // Mes (1 para enero, 2 para febrero, etc.)
      cantidad: monthData ? parseInt(monthData.dataValues.cantidad) : 0,
    };
  });

  return {
    total: totalDonations,
    donacionesPorMes: response,
  };
};

module.exports = Donacion;

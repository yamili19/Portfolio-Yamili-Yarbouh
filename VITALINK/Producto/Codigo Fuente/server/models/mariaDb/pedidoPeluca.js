/**
 * Archivo que se usa para definir el modelo que representa la tabla pedido peluca
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");

const PedidoPeluca = sequelize.define(
  "pedidoPeluca",
  {
    fechaPedido: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    cantCabello: {
      type: DataTypes.DOUBLE(),
      allowNull: false,
    },
    cantPelucasEstimadas: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    cantPelucasLlegaron: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
  },
  {
    tableName: "pedido peluca",
    timestamps: false,
  }
);

PedidoPeluca.obtenerPedidosEntreFechas = async function (fechaInicio, fechaFin) {
  try {
    const pedidos = await PedidoPeluca.findAll({
      where: {
        fechaPedido: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      },
    });
    return pedidos;
  } catch (error) {
    console.error("Error al obtener pedidos entre fechas:", error);
    throw error;
  }
}

module.exports = PedidoPeluca;

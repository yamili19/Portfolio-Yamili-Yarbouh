/**
 * Archivo que se utiliza para definir el modelo que representa la tabla peluca
 */

const { Op, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");
const TipoPelo = require("./tipoPelo");
const EstadoPeluca = require("./estadoPeluca");
const TipoCaraPorPeluca = require("./tipoCaraPorPeluca");
const TipoCara = require("./tipoCara");

const Peluca = sequelize.define(
  "peluca",
  {
    codigo: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    talle: {
      type: DataTypes.STRING("2"),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    tipoPelo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "tipo_pelo",
        key: "id",
      },
    },
    fechaConfeccion: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    estadoPeluca: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "estado_peluca",
        key: "id",
      },
    },
    foto: {
      type: DataTypes.TEXT(),
      allowNull: true,
    },
    tieneApross: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "peluca",
    timestamps: false,
  }
);

//Se define la relación con tipoPelo
Peluca.belongsTo(TipoPelo, {
  foreignKey: "tipoPelo",
  as: "tipoDePelo",
});

//Se define la relación con estadoPeluca
Peluca.belongsTo(EstadoPeluca, {
  foreignKey: "estadoPeluca",
  as: "estado",
});

Peluca.hasMany(TipoCaraPorPeluca, {
  foreignKey: "codigo",
  as: "carasDePelucas",
});

Peluca.findAllPelucasWithTipoPeloAndEstadoPeluca = function () {
  return this.findAll({
    include: [
      {
        model: TipoPelo,
        as: "tipoDePelo",
        attributes: ["descripcion"],
      },
      {
        model: EstadoPeluca,
        as: "estado",
        attributes: ["nombre"],
      },
      {
        model: TipoCaraPorPeluca,
        as: "carasDePelucas",
        include: [
          {
            model: TipoCara,
            as: "tipoCara",
            attributes: ["nombre"],
          },
        ],
        attributes: [],
      },
    ],
    order: [["fechaConfeccion", "DESC"]],
  });
};

Peluca.findAllPelucasWithTipoPeloAndEstadoPelucaAndTiposCaras =
  async function () {
    const pelucas = await this.findAll({
      include: [
        {
          model: TipoPelo,
          as: "tipoDePelo",
          attributes: ["descripcion"],
        },
        {
          model: EstadoPeluca,
          as: "estado",
          attributes: ["nombre"],
        },
      ],
      order: [["fechaConfeccion", "DESC"]],
    });

    // Para cada peluca, obtener los tipos de cara
    const pelucasConTiposCara = await Promise.all(
      pelucas.map(async (peluca) => {
        const tiposCara = await TipoCaraPorPeluca.getTiposCaraPorCodigoPeluca(
          peluca.codigo
        );
        return {
          ...peluca.get(),
          tiposCara: tiposCara.map((tc) => tc.tipoCara.nombre),
        };
      })
    );

    return pelucasConTiposCara;
  };

/*
Peluca.findPelucaByCodigoWithTipoPeloAndEstadoPeluca = function (codigo) {
  return this.findOne({
    where: { codigo },
    include: [
      {
        model: TipoPelo,
        as: "tipoDePelo",
        attributes: ["descripcion"],
      },
      {
        model: EstadoPeluca,
        as: "estado",
        attributes: ["nombre"],
      },
    ],
  });
};
*/

Peluca.findPelucaByCodigoWithTipoPeloAndEstadoPeluca = async function (codigo) {
  const peluca = await this.findOne({
    where: { codigo },
    include: [
      {
        model: TipoPelo,
        as: "tipoDePelo",
        attributes: ["descripcion"],
      },
      {
        model: EstadoPeluca,
        as: "estado",
        attributes: ["nombre"],
      },
    ],
  });

  if (!peluca) {
    return null;
  }

  const tiposCara = await TipoCaraPorPeluca.getTiposCaraPorCodigoPeluca(
    peluca.codigo
  );

  return {
    ...peluca.get(),
    tiposCara: tiposCara.map((tc) => tc.tipoCara.nombre),
  };
};

Peluca.updateEstadoPelucaToUsada = async function (codigoPeluca, transaction) {
  return this.update(
    { estadoPeluca: 2 }, // Cambiar el estado a "Usada" (valor 2)
    {
      where: {
        codigo: codigoPeluca,
        estadoPeluca: { [Op.ne]: 3 }, // Solo actualizar si el estado no es "Rota" (valor 3)
      },
      transaction, // Asegura que la actualización esté dentro de la misma transacción
    }
  );
};

Peluca.obtenerResumenPeluca = async function () {
  try {
    const resumen = await this.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("codigo")), "totalPelucas"],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal("CASE WHEN estadoPeluca = 1 THEN 1 ELSE 0 END")
          ),
          "nuevas",
        ],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal("CASE WHEN estadoPeluca = 2 THEN 1 ELSE 0 END")
          ),
          "usadas",
        ],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal("CASE WHEN estadoPeluca = 3 THEN 1 ELSE 0 END")
          ),
          "rotas",
        ],
      ],
      raw: true,
    });
    return resumen[0]; // El resultado es un array con un único objeto
  } catch (error) {
    console.error("Error al obtener el resumen de pelucas:", error);
    throw error;
  }
};

module.exports = Peluca;

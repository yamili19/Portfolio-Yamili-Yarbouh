const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mariaDb"); // Ajusta la ruta según tu proyecto
const Cliente = require("./cliente"); // Asegúrate de ajustar la ruta según la ubicación del modelo Cliente

// Definición del modelo ListaDeEspera
const ListaDeEspera = sequelize.define(
  "listaDeEspera",
  {
    nroOrden: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fechaSolicitud: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    clienteId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "cliente", 
        key: "dni",       
      },
    },
    menor: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
    },
  },
  {
    tableName: "lista_espera",
    timestamps: false,
  }
);


ListaDeEspera.belongsTo(Cliente, {
  foreignKey: "clienteId", 
  as: "clienteData", 
});


ListaDeEspera.findAllWithCliente = function () {
  return this.findAll({
    include: {
      model: Cliente, 
      as: "clienteData", 
      attributes: ["nombre", "apellido", "dni"], 
    },
    order: [["nroOrden", "ASC"]], 
  });
};

module.exports = ListaDeEspera;

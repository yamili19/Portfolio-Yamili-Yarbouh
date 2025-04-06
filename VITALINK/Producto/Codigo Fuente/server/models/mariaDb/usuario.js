/**
 * Archivo que se utiliza para definir el modelo que representa la tabla usuario
 */

const { DataTypes, where, Op } = require("sequelize");
const { sequelize } = require("../../config/mariaDb");
const Rol = require("./rol");

const Usuario = sequelize.define(
  "usuario",
  {
    nombreUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: 4, //Por defecto cuando se registra un usuario lo hace con el rol de "Usuario"
      references: {
        model: "rol",
        key: "id",
      },
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

//Se define la asociación con la tabla rol
Usuario.belongsTo(Rol, {
  foreignKey: "rol",
  as: "Rol",
});

//Método para traer todos los usuarios con el nombre del rol incluido
Usuario.findAllUsersWithRol = function () {
  return this.findAll({
    attributes: { exclude: ["password"] },
    include: {
      model: Rol,
      as: "Rol",
      attributes: ["nombre"],
    },
  });
};

//Método para traer los usuarios mediante paginación
Usuario.findAllUsersWithRolPagination = function (options = {}) {
  return this.findAndCountAll({
    attributes: { exclude: ["password"] },
    include: {
      model: Rol,
      as: "Rol",
      attributes: ["nombre"],
    },
    limit: options.limit,
    offset: options.offset,
  });
};

Usuario.findOneUserWithRol = function (nombreUsuario) {
  return this.findOne({
    where: { nombreUsuario },
    attributes: { exclude: ["password"] },
    include: {
      model: Rol,
      as: "Rol",
      attributes: ["nombre"],
    },
  });
};

//Método para buscar usuario por nombre de usuario, email o rol
Usuario.searchUsers = function (searchParams = {}) {
  const { nombreUsuario, email, rol } = searchParams;

  //Condiciones de búsqueda
  const whereConditions = {};

  if (nombreUsuario) {
    whereConditions.nombreUsuario = { [Op.like]: `%${nombreUsuario}%` };
  }

  if (email) {
    whereConditions.email = { [Op.like]: `%${email}%` };
  }

  if (rol) {
    whereConditions.rol = { [Op.eq]: rol };
  }

  return this.findAll({
    where: whereConditions,
    attributes: { exclude: ["password"] },
    include: {
      model: Rol,
      as: "Rol",
      attributes: ["nombre"],
    },
  });
};

module.exports = Usuario;

/**
 * Archivo que se utiliza para configurar multer para almacenar las imagenes de las pelucas
 * que se reciben desde el front
 */

const multer = require("multer");
const path = require("path");

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./fotos/pelucas"); // Carpeta donde se guardarán las fotos
  },
  filename: (req, file, cb) => {
    const fileName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, `fotos-${fileName}`);
    //cb(null, file.fieldname + '-' + fileName + path.extname(file.originalname));
  },
});

// Filtro de archivo para asegurar que solo se carguen imágenes
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/; //Tipos de extensiones permitidas
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Solo se permiten imágenes!");
  }
};

const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB
  fileFilter: fileFilter,
});

module.exports = uploadMiddleware;

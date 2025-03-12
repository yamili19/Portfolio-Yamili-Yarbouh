/**
 * Archivo controlador que se utiliza para realizar la predicción del modelo de IA
 */

const tf = require("@tensorflow/tfjs");
const fetch = require("node-fetch");
const handleHttpError = require("../utils/handleError");
const sharp = require("sharp");

global.fetch = fetch; // Asignar fetch globalmente para que tfjs pueda usarlo

// Ruta del modelo servido estáticamente
const modelPath = "http://localhost:8000/models/model.json";
console.log("Ruta del model: ", modelPath);
let model;

// Cargar el modelo al inicio para no cargarlo en cada petición
(async () => {
  try {
    model = await tf.loadLayersModel(modelPath);
    console.log("Modelo cargado correctamente");
  } catch (error) {
    console.error("Error al cargar el modelo:", error);
  }
})();

const faceTypes = ["Corazón", "Oblonga", "Ovalada", "Circular", "Cuadrada"];

/**
 * Obtiene el nombre del tipo de cara predecido
 * @param {*} result - Pasar el valor del índice del resultado predecido
 * @returns - Retorna el nombre del tipo de cara predecido
 */
const faceTypePrediction = (result) => {
  if (result >= 0 && result < faceTypes.length) {
    return faceTypes[result];
  } else {
    return "Tipo de cara desconocido";
  }
};

const predicticTypeFace = async (req, res) => {
  try {
    const { image } = req.body; // Obtener la imagen desde el cuerpo de la solicitud
    const buffer = Buffer.from(image, "base64"); // Decodificar la imagen base64

    // Usar sharp para convertir la imagen en un buffer RGB de tamaño 224x224
    const processedImage = await sharp(buffer)
      .resize(224, 224)
      .toFormat("png")
      .removeAlpha() // Asegura que no haya canal alfa
      .raw()
      .toBuffer();

    // Crear un tensor a partir de los datos de la imagen
    const tensor = tf
      .tensor3d(new Uint8Array(processedImage), [224, 224, 3])
      .expandDims() // Expandir dimensiones para crear el batch (1, 224, 224, 3)
      .toFloat()
      .div(tf.scalar(255.0)); // Normalizar la imagen

    // Realizar la predicción con el modelo cargado
    const prediction = model.predict(tensor);
    const faceType = prediction.argMax(-1).dataSync()[0]; // Obtener la predicción
    const faceTypeName = faceTypePrediction(faceType);

    // Responder con el resultado de la predicción
    res.status(200).json({
      message: "Tipo de cara predecido",
      result: faceType,
      faceType: faceTypeName,
    });
  } catch (error) {
    console.log("Error, no se pudo predecir el tipo de cara: ", error);
    handleHttpError(res, "ERROR_PREDICT_MODEL", 500);
  }
};

module.exports = { predicticTypeFace };

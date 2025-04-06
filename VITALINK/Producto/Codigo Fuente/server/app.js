const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnectionMariaDb } = require("./config/mariaDb");

const app = express();
const apiRouter = require("./routes");
app.use(cors());

//Para porder hacer peticiones post
// Aumentar el límite del cuerpo de la solicitud para permitir imágenes grandes
app.use(express.json({ limit: "50mb" }));

// Servir archivos estáticos desde la carpeta 'fotos'
app.use("/fotos", express.static("fotos"));

// Servir la carpeta 'modelsIA' para el modelo de IA
app.use("/models", express.static("modelsIA"));

const port = process.env.PORT || 1234;

app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a Proyecto Final");
  //console.log("exito");
});

//TODO: localhost/api/[cadaRuta]
//app.use("/api", require("./routes"));
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en localhost:${port}`);
});

dbConnectionMariaDb();

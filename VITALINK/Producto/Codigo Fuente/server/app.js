const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnectionMariaDb } = require("./config/mariaDb");

const app = express();
const apiRouter = require("./routes");
const sanitizeMiddleware = require('./middleware/sanitizeMiddleware');
app.use(cors());

app.use(sanitizeMiddleware);

app.use((req, res, next) => {
  // Configurar headers de seguridad
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'none'; object-src 'none'"
  );
  
  next();
});

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

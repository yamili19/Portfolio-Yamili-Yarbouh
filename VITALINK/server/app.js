const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnectionMariaDb } = require("./config/mariaDb");

const app = express();
const apiRouter = require("./routes");
app.use(cors());

//Para porder hacer peticiones post
app.use(express.json());

const port = process.env.PORT || 1234;

app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la API de CRUD Peluquerias");
  //console.log("exito");
});

//TODO: localhost/api/[cadaRuta]
//app.use("/api", require("./routes"));
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en localhost:${port}`);
});

dbConnectionMariaDb();

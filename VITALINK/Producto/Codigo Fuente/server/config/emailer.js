/**
 * Archivo de configuración para implemetnar nodemailer para el envio de correos
 */

const nodemailer = require("nodemailer");
const htmlEmailDonante = require("../template/htmlEmailDonante");
const htmlEmailCliente = require("../template/htmlEmailCliente")
require("dotenv").config();
const {datosBancariosModel} = require("../models")

const userEmail = process.env.EMAIL;
const userEmailPass = process.env.EMAIL_PASS;
/*
const createTransport = () => {
  //RECORDATORIO: Cambiar el auth por el correo oficial de quien se encargue de enviar los correos
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "69800ee23a128b",
      pass: "********bcad",
    },
  });

  return transport;
};
*/
const createTransport = () => {
  //RECORDATORIO: Cambiar el auth por el correo oficial de quien se encargue de enviar los correos
  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: userEmailPass,
    },
  });

  return transport;
};

/**
 * Función para el envío del correo al donante
 * @param {*} donante 
 * @returns - Retorna el ID  de mensaje de correo
 */
const sendEmailDonante = async (donante) => {
  const transport = createTransport();
  const message = {
    from: userEmail,
    to: donante.mail,
    subject: `Gracias ${donante.apellido}, ${donante.nombre} por su donación`,
    html: htmlEmailDonante(donante),
  };
  try {
    const info = await transport.sendMail(message);
    console.log("Message sent: %s", info.messageId);
    // Retornar true si el envío fue exitoso
    return true;
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
    // Retornar false si ocurrió un error
    return false;
  }
};

/**
 * Función para el envío del correo al donante
 * @param {*} cliente 
 * @returns - Retorna el ID  de mensaje de correo
 */

async function getBankDetails() {
  return datosBancariosModel
    .findOne({
      order: [["id", "DESC"]],
    })
    .then((bankDetails) => {
      if (!bankDetails) {
        throw new Error("No se encontraron datos bancarios.");
      }
      return bankDetails;
    })
    .catch((error) => {
      console.error("Error obteniendo datos bancarios:", error);
      throw error;
    });
}

const sendEmailCliente = async (cliente) => {
  const transport = createTransport();
  const bankDetails = await getBankDetails();
  const message = {
    from: userEmail,
    to: cliente.usuario,
    subject: `Gracias por confiar en nosotros: ¿Nos ayudas a seguir ayudando?`,
    html: htmlEmailCliente(cliente, bankDetails),
  };
  try {
    const info = await transport.sendMail(message);
    console.log("Message sent: %s", info.messageId);
    // Retornar true si el envío fue exitoso
    return true;
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
    // Retornar false si ocurrió un error
    return false;
  }
};

module.exports = { sendEmailDonante, sendEmailCliente };
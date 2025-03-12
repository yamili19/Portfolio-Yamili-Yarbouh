/**
 * Template HTML para el envío de mail al cliente 
 * @param {*} cliente - Objeto con información del cliente 
 * @returns - Estructura HTML del agradecimiento
 */

const htmlEmailCliente = (cliente, bankDetails) => {
  
  const logoUrl = 'https://eoosixf.stripocdn.email/content/guids/videoImgGuid/images/imglogoremovebg.png';
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Agradecimiento</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          background-color:  #dce7fe; /* Fondo principal */
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color:  #dce7fe; /* Fondo del contenido */
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h2, h3, h4 {
          color: #ff69b4;
          text-align: center; /* Centrado de títulos */
        }
        p {
          text-align: center; /* Centrado de párrafos */
          margin: 15px 0;
        }
        .donar-btn {
          display: inline-block;
          background-color: #0000FF;
          color: #000000;
          padding: 10px 15px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          margin: 10px auto;
          text-align: center;
        }
        .qr-img {
          width: 200px;
          height: 200px;
          border-radius: 10px;
          display: block;
          margin: 10px auto;
        }
        .logo {
          display: block;
          margin: 0 auto 20px auto;
          width: 150px;
        }
        .footer-logo {
          display: block;
          margin: 20px auto 0 auto;
          width: 150px;
        }
        .highlight {
          background-color: #f9ecec;
          padding: 10px;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Logo en la parte superior -->
        <img src="${logoUrl}" alt="Vitalink Logo" class="logo" />

        <p>Estimado/a <strong>${cliente.nombre} ${cliente.apellido}</strong>,</p>
        <p>
          Primero que nada, queremos agradecerte por confiar en nuestra fundación y permitirnos ser parte de tu camino.
          Sabemos que enfrentar el cáncer es un desafío enorme, y nos llena de orgullo poder apoyarte a través del préstamo
          de una peluca oncológica, diseñada para ayudarte a sentirte más cómodo/a y seguro/a durante este proceso.
        </p>
        <p>
          Nuestro compromiso es seguir ofreciendo este servicio de manera gratuita a todas las personas que lo necesiten.
          Además, trabajamos incansablemente en campañas de prevención y concientización para combatir el cáncer desde su raíz.
        </p>
        <p>
          Para lograrlo, dependemos de la solidaridad de personas como tú. Si está en tus posibilidades, te invitamos a
          realizar una donación que nos permita continuar brindando apoyo a más personas que enfrentan esta enfermedad.
        </p>
        <h3>Formas de donar:</h3>
        <div class="highlight">
          <h4>1. Transferencia bancaria</h4>
          <p><strong>Alias:</strong> ${bankDetails.alias}</p>
          <p><strong>Titular:</strong> ${bankDetails.titular}</p>
          <p><strong>Banco:</strong> ${bankDetails.banco}</p>
          <p><strong>CBU:</strong> ${bankDetails.cbu}</p>
          <p>También puedes escanear este QR para realizar tu donación:</p>
          <img src="${bankDetails.qr}" alt="Código QR para donaciones" class="qr-img" />
        </div>
          <h4>2. Donar a través de Mercado Pago</h4>
          <p>
            Haz clic en el siguiente enlace para realizar tu donación de manera rápida y sencilla: <br />
            <a href="${bankDetails.mp}" target="_blank" rel="noopener noreferrer" class="donar-btn">
              Donar con Mercado Pago
            </a>
          </p>
        </div>
        <p>
          Cada aporte, por más pequeño que sea, nos ayuda a cambiar vidas. Gracias por formar parte de nuestra misión de
          brindar esperanza y apoyo a quienes más lo necesitan.
        </p>
        <p>Con gratitud,</p>
        <p>
          <strong>El equipo de Fundación Vanesa Duran</strong><br />
        </p>

        <!-- Logo en la parte inferior -->
        <img src="${logoUrl}" alt="Vitalink Logo" class="footer-logo" />
      </div>
    </body>
    </html>
  `;
};

module.exports = htmlEmailCliente;


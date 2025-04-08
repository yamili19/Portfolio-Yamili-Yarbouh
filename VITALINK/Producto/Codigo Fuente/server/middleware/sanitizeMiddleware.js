const he = require('he');
const xss = require('xss');

const sanitizeMiddleware = (req, res, next) => {
  // Sanitizar body
  if (req.body) {
    sanitizeObject(req.body);
  }

  // Sanitizar query params
  if (req.query) {
    sanitizeObject(req.query);
  }

  // Sanitizar params
  if (req.params) {
    sanitizeObject(req.params);
  }

  next();
};

function sanitizeObject(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'string') {
        // Primero decodificar para evitar doble encoding
        const decoded = he.decode(obj[key]);
        // Luego sanitizar contra XSS
        obj[key] = xss(he.encode(decoded));
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  }
}

module.exports = sanitizeMiddleware;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter as faXTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
//import logoFundacion from "../assets/images/img-logo-fundacion-vd-removebg.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-danger text-center text-white">
      {/* Grid container */}
      <div className="container p-4">
        {/* Section: Social media and Contact Information */}
        <section className="mb-4 d-flex flex-column align-items-center">
          {/* Social Media Links */}
          <div className="mb-3">
            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="https://www.facebook.com/fundacionvanesaduran/?locale=es_LA"
              role="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>

            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#55acee" }}
              href="https://x.com/i/flow/login?redirect_after_login=%2Ffundacionvd"
              role="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>

            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="https://www.instagram.com/fundacionvd/?hl=es"
              role="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>

            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="https://ar.linkedin.com/in/daiana-n-ethel-ojeda-04179b124?original_referer=https%3A%2F%2Fwww.google.com%2F"
              role="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>

          {/* Contact Information */}
          <div className="d-flex justify-content-center align-items-center">
            <span>
              Teléfono de Contacto - Fundación Vanesa Duran: 0351 302-5142
            </span>
          </div>
        </section>
        {/* End of Social media and Contact Information */}
      </div>
      {/* Grid container */}

      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © {currentYear} Copyright:
        <Link className="text-white" to="/inicio">
          VitaLink.com
        </Link>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;

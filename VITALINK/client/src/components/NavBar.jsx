//import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Registrar Peluqueria</Link>
          </li>
          <li>
            <Link to="/peluquerias">Peluquerias Afiliadas</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;

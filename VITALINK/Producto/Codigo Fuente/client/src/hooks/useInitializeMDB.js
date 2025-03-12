//import { useEffect } from "react";

/*
const useInitializeMDB = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.2/mdb.min.js";
    script.async = true;
    script.onload = () => {
      console.log("MDB script loaded");

      // Inicializa componentes MDB manualmente si es necesario
      if (window.mdb) {
        const inputs = document.querySelectorAll(".form-outline");
        inputs.forEach((input) => {
          if (input && typeof window.mdb.Input.init === "function") {
            window.mdb.Input.init(input);
          } else {
            console.warn("MDB Input.init function is not available.");
          }
        });
      } else {
        console.warn("MDB script is not available.");
      }
    };
    script.onerror = () => console.log("Failed to load MDB script");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};
export default useInitializeMDB;
*/

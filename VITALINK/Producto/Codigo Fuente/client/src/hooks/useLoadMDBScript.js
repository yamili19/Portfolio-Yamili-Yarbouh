import { useEffect } from "react";

const useLoadMDBScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.2/mdb.min.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => console.log("MDB script loaded");
    script.onerror = () => console.log("Failed to load MDB script");

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useLoadMDBScript;

import { useState } from "react";
import uploadService from "./uploadService"; // Asegúrate de que la ruta sea correcta
import "./DragAndDrop.css";
import Modal from "../Modal/Modal"; // Importa tu componente modal

const DragAndDrop = () => {
  const [file, setFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [modalMessage, setModalMessage] = useState(null); // Estado para el mensaje del modal

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setModalMessage({
        text: "Debe seleccionar un archivo",
        type: "error", // Establecer el tipo de mensaje (error)
      });
      setModalVisible(true); // Mostrar modal de error
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file); // Aquí agregamos el archivo

      await uploadService.uploadFile(file); // Usamos el método adecuado en tu servicio para enviar el archivo completo
      setModalMessage({
        text: "Archivo enviado correctamente",
        type: "success", // Establecer el tipo de mensaje (éxito)
      });
      setModalVisible(true); // Mostrar modal de éxito
    } catch (error) {
      console.error("Error al enviar el archivo:", error);
      setModalMessage({
        text: "Error al enviar el archivo",
        type: "error", // Establecer el tipo de mensaje (error)
      });
      setModalVisible(true); // Mostrar modal de error
    }
  };

  const closeModal = () => setModalVisible(false); // Función para cerrar el modal

  return (
    <div>
      <div className="drop-zone" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        {file ? <p>{file.name}</p> : <p>Arrastra un archivo .xlsx aquí</p>}
      </div>
      <button className="upload-button" onClick={handleUpload}>Subir Archivo</button>

      {/* Mostrar el modal si está visible */}
      {modalVisible && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default DragAndDrop;

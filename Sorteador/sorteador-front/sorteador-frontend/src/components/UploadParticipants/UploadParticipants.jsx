import DragAndDrop from "./DragAndDrop.jsx";
import NextButton from "./NextButton";
import "./UploadParticipants.css"

const UploadParticipants = ({ onNext }) => {
  return (
    <div className="upload-container">
      <h2 className="upload-title">Cargar Participantes</h2>
      <DragAndDrop />
      <NextButton onClick={onNext} text="Siguiente" />
    </div>
  );
};

export default UploadParticipants;

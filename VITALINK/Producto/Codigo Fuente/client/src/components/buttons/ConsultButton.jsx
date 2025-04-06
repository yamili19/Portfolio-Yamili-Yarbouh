import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ConsultButton = ({ onClick }) => {
  return (
    <>
      <button
        className="btn btn-info btn-sm btn-consultar"
        title="Consultar"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
      </button>
    </>
  );
};

export default ConsultButton;

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditButton = ({ onClick }) => {
  return (
    <>
      <button
        className="btn btn-warning btn-sm btn-modificar"
        title="Modificar"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
    </>
  );
};

export default EditButton;

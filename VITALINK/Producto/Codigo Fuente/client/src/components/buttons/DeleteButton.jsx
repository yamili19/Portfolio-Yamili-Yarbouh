import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteButton = ({ onClick }) => {
  return (
    <>
      <button
        className="btn btn-danger btn-sm btn-eliminar"
        title="Eliminar"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </>
  );
};

export default DeleteButton;

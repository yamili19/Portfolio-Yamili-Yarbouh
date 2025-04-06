const CancelButton = ({ onClick }) => {
  return (
    <>
      <button
        className="btn btn-danger btn-block mb-4"
        title="Cancelar"
        onClick={onClick}
      >
        Cancelar
      </button>
    </>
  );
};

export default CancelButton;

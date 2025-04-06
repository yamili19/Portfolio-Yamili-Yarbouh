const RegisterButton = ({ accion }) => {
  return (
    <>
      <button type="submit" className="btn btn-primary btn-block mb-4">
        {accion}
      </button>
    </>
  );
};

export default RegisterButton;

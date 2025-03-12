import underConstructionImage from "../assets/images/img-func-in-dev-removebg.png";

const Home = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 100px)",
    padding: "20px",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const imageStyle = {
    maxWidth: "80%",
    height: "auto",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Working on it</h1>
      <img
        src={underConstructionImage}
        alt="Funcionalidad en Desarrollo"
        style={imageStyle}
      />
    </div>
  );
};

export default Home;

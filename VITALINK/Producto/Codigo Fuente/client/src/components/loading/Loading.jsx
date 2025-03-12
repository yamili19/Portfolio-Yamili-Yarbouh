import { OrbitProgress } from "react-loading-indicators";
import "../../css/loading.css";

const Loading = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-loading">
        <OrbitProgress
          variant="split-disc"
          dense
          color="#3aa8db"
          size="large"
          text="Cargando"
          textColor="#3aa8db"
        />
      </div>
    </div>
  );
};

export default Loading;

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import * as faceapi from "face-api.js";
import { prediccionModel } from "../../services/prediccionService";
import { fetchPelucasWithDisponibilidadAndTypeFace } from "../../services/pelucaService";
import PelucaRecomendada from "./PelucaRecomendada";
import "../../css/recomendarPeluca.css";
import iconoPeluca from "../../assets/images/img-icon-peluca.png";
import imgCircular from "../../assets/images/img-tipCara-circular.png";
import imgCorazon from "../../assets/images/img-tipoCara-corazon.png";
import imgCuadrada from "../../assets/images/img-tipoCara-cuadrada.png";
import imgOblonga from "../../assets/images/img-tipoCara-oblonga.png";
import imgOvalada from "../../assets/images/img-tipoCara-ovalada.png";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
} from "../../utils/sweetAlertGeneralize";
import { useLocation } from "react-router-dom";

const RecomendarPelucaEstructura = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [pelucasRecomendadas, setPelucasRecomendadas] = useState([]);
  const [cameraActive, setCameraActive] = useState(false);

  const location = useLocation();

  // Cargar los modelos al iniciar el componente
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  // Iniciar la cámara
  const startCamera = useCallback(() => {
    setCameraActive(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accediendo a la cámara:", err));
  }, []);

  // Detener la cámara
  const stopCamera = useCallback(() => {
    setCameraActive(false);
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }, []);

  // Detectar la cara en tiempo real
  useEffect(() => {
    if (cameraActive && modelsLoaded) {
      const detectFace = async () => {
        const video = videoRef.current;
        if (video) {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();

          if (detections.length > 0) {
            setFaceDetected(true);
            drawDetections(detections);
          } else {
            setFaceDetected(false);
          }
        }
      };

      const drawDetections = (detections) => {
        const canvas = canvasRef.current;
        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        };

        faceapi.matchDimensions(canvas, displaySize);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      };

      const interval = setInterval(detectFace, 200);
      return () => clearInterval(interval);
    }
  }, [cameraActive, modelsLoaded]);

  // Capturar la imagen cuando se detecta una cara
  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = 224;
    canvas.height = 224;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
  }, []);

  // Función para predecir el tipo de cara
  const handlePredict = useCallback(async () => {
    if (capturedImage) {
      setIsPredicting(true);
      try {
        const imageBase64 = capturedImage.split(",")[1];
        const response = await prediccionModel({ image: imageBase64 });
        setPrediction(response.faceType);
        handleRecomendarPelucas(response.faceType);
      } catch (error) {
        console.error("Error al predecir el tipo de cara:", error);
      } finally {
        setIsPredicting(false);
        stopCamera(); // Detener la cámara después de la predicción
      }
    }
  }, [capturedImage, stopCamera]);

  // Desactiva la camara si cambia la ruta y la camara estaba activa
  // Detener la cámara si se cambia de ruta
  useEffect(() => {
    return () => {
      if (cameraActive) {
        stopCamera(); // Asegurarse de que la cámara se detenga
      }
    };
  }, [cameraActive, stopCamera, location]);

  // Recomendar pelucas basadas en el tipo de cara
  const handleRecomendarPelucas = useCallback(async (tipoCara) => {
    try {
      showLoadingAlert("Obteniendo Pelucas Recomendadas...");
      const pelucas = await fetchPelucasWithDisponibilidadAndTypeFace();
      const pelucasFiltradas = pelucas.filter((peluca) =>
        peluca.tiposCara.some(
          (tipo) => tipo.toUpperCase() === tipoCara.toUpperCase()
        )
      );
      MySwal.close();
      setPelucasRecomendadas(pelucasFiltradas);
    } catch (error) {
      MySwal.close();
      console.error("Error al obtener pelucas recomendadas:", error);
      showErrorAlert("Error al intentar obtener las Pelucas Recomendadas");
    }
  }, []);

  const colorPrediccion = (prediccion) => {
    switch (prediccion) {
      case "Circular":
        return "#FFCCCB";
      case "Corazón":
        return "#ADD8E6";
      case "Cuadrada":
        return "#FFE4B5";
      case "Oblonga":
        return "#E6E6FA";
      case "Ovalada":
        return "#FFFACD";

      default:
        return "white";
    }
  };

  const tituloYParrafo = useMemo(
    () => (
      <div className="text-center-rp my-4">
        <div className="titulo-con-imagen d-flex align-items-center justify-content-center">
          <h1 className="display-4" style={{ color: "fuchsia" }}>
            Recomendador de Pelucas
          </h1>
          <img
            src={iconoPeluca}
            alt="Icono-Peluca"
            className="img-animacion ml-3"
          />
        </div>
        <p className="lead">
          Este sistema te permite recibir recomendaciones de pelucas
          personalizadas en base a la forma de tu cara. Usamos un modelo que, al
          capturar una imagen de tu rostro, identifica el tipo de cara y te
          muestra las pelucas más adecuadas para tu forma facial. Actualmente
          nuestro Modelo es capaz de predecir los tipos de cara: Circular,
          Corazón, Cuadrada, Oblonga y Ovalada. Lo no quiere decir que un futuro
          NO sea capaz de predecir nuevos tipos de rostros.
        </p>
        {/* Breve explicación de cada tipo de cara */}
        <div className="tipo-cara-container d-flex flex-wrap justify-content-center">
          {[
            {
              img: imgCircular,
              title: "Circular",
              description:
                "Una cara circular es más ancha que larga, con mejillas llenas. Esta forma es ideal para estilos que añaden altura y longitud, como cortes de pelo con volumen en la parte superior.",
              bgColor: "#FFCCCB",
            },
            {
              img: imgCorazon,
              title: "Corazón",
              description:
                "La forma de corazón es más ancha en la frente y se estrecha hacia el mentón. Este tipo de cara se beneficia de estilos que equilibran la parte superior más ancha, como cortes de pelo con flequillo.",
              bgColor: "#ADD8E6",
            },
            {
              img: imgCuadrada,
              title: "Cuadrada",
              description:
                "La cara cuadrada tiene una mandíbula fuerte y una frente amplia. Para suavizar los ángulos, se recomiendan estilos de cabello ondulados o con capas.",
              bgColor: "#FFE4B5",
            },
            {
              img: imgOblonga,
              title: "Oblonga",
              description:
                "La cara oblonga es más larga que ancha, con mejillas menos pronunciadas. Los estilos que añaden ancho, como los cortes bob, son ideales para esta forma.",
              bgColor: "#E6E6FA",
            },
            {
              img: imgOvalada,
              title: "Ovalada",
              description:
                "La cara ovalada es equilibrada en proporciones, con una frente ligeramente más ancha que el mentón. Prácticamente cualquier estilo de cabello es adecuado, pero los cortes que enmarcan el rostro son especialmente favorecedores.",
              bgColor: "#FFFACD",
            },
          ].map((tipo, index) => (
            <div
              key={tipo.title}
              className="tipo-cara m-2 p-3 tipo-cara-animation"
              style={{
                backgroundColor: tipo.bgColor,
                width: "200px",
                borderRadius: "10px", // Añade un border radius aquí
                border: "2px solid fuchsia", // Añade un borde de color fucsia
                opacity: 0, // Para controlar la visibilidad en la animación
                animation: `fadeIn 0.5s ease-in-out forwards ${index * 0.2}s`, // Añade una animación de aparición
              }}
            >
              <h5 className="tipo-cara-titulo d-flex align-items-center">
                <img
                  src={tipo.img}
                  alt={tipo.title}
                  className="mr-2"
                  style={{ width: "40px", height: "40px", borderRadius: "5px" }}
                />
                <strong>{tipo.title}</strong>
              </h5>

              <p>{tipo.description}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    []
  );

  return (
    <div className="container">
      {tituloYParrafo}

      {!cameraActive && !capturedImage && (
        <div className="text-center-rp">
          <button onClick={startCamera} className="btn btn-primary mt-3">
            Consultar la mejor peluca para ti
          </button>
        </div>
      )}

      {cameraActive && (
        <div className="text-center-rp">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "inline-block",
                borderRadius: "15px",
                overflow: "hidden",
                border: "2px solid lightblue",
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                style={{
                  width: "100%", // Aumentado el ancho
                  height: "100%", // Aumentado la altura
                  borderRadius: "15px",
                  objectFit: "cover",
                }}
              ></video>
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%", // Aumentado el ancho
                  height: "100%", // Aumentado la altura
                  borderRadius: "15px",
                }}
              ></canvas>
            </div>

            <button
              onClick={handleCapture}
              className="btn btn-primary mt-3"
              disabled={!faceDetected}
            >
              Capturar Imagen
            </button>
          </div>
        </div>
      )}

      {capturedImage && (
        <div className="mt-4 text-center-rp">
          <h4>Imagen Capturada:</h4>
          <img
            src={capturedImage}
            alt="Captura de rostro"
            style={{
              width: "500px", // Aumentado el ancho
              borderRadius: "15px", // Cambiar el borde a fucsia
              border: "2px solid fuchsia", // Cambiar el borde a fucsia
            }}
          />
          <button
            onClick={handlePredict}
            className="btn btn-success mt-3"
            disabled={isPredicting}
          >
            {isPredicting ? "Prediciendo..." : "Predecir Tipo de Cara"}
          </button>
        </div>
      )}

      {prediction && (
        <div
          className="mt-4 text-center-rp"
          style={{
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: colorPrediccion(prediction),
            border: "2px dashed fuchsia",
          }}
        >
          <h4>Resultado de la Predicción:</h4>
          <p>
            Tipo de Cara: <strong>{prediction}</strong>
          </p>
        </div>
      )}

      {capturedImage && !cameraActive && (
        <div className="text-center-rp mt-3">
          <button
            onClick={() => {
              setCapturedImage(null);
              setPrediction(null);
              setPelucasRecomendadas([]);
              startCamera();
            }}
            className="btn btn-danger"
          >
            Consultar Nuevamente
          </button>
        </div>
      )}

      {pelucasRecomendadas.length > 0 && (
        <div className="mt-4">
          <PelucaRecomendada pelucasRecomendas={pelucasRecomendadas} />
        </div>
      )}
    </div>
  );
};

export default RecomendarPelucaEstructura;

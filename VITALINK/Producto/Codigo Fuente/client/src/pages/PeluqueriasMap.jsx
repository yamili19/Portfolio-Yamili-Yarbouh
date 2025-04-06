import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useLocation } from "react-router-dom";

const PeluqueriasMap = () => {
  const location = useLocation();
  const peluquerias = location.state?.peluquerias || [];
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Icono personalizado para los marcadores
  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png", // Cambia este URL por el ícono que prefieras
    iconSize: [50, 70], // Aumenta el tamaño del ícono (ancho x alto)
    iconAnchor: [20, 40], // Ajusta el anclaje para centrar el ícono correctamente
    popupAnchor: [0, -40], // Popup relativo al marcador
  });

  useEffect(() => {
    // Obtener la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLoading(false); // Dejar de mostrar la pantalla de carga
        },
        (error) => {
          console.error("Error al obtener la ubicación", error);
          setLoading(false); // Asegurar que el estado de carga se detenga incluso si falla
        }
      );
    } else {
      console.error("La geolocalización no está disponible.");
      setLoading(false); // Detener la carga si no hay soporte para geolocalización
    }
  }, []);

  const RecenterMap = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, 14); // Centra el mapa en la ubicación del usuario
      }
    }, [center, map]);
    return null;
  };

  return (
    <div>
      {/* Mostrar mensaje de carga mientras el mapa se inicializa */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "20px",
          }}
        >
          Cargando mapa...
        </div>
      )}

      {/* Renderizar el mapa solo si la ubicación del usuario está disponible */}
      {!loading && userLocation && (
        <MapContainer
          center={userLocation}
          zoom={14} // Ajusta el nivel de zoom según tus necesidades
          style={{ height: "500px", width: "100%" }}
        >
          {/* Capa base del mapa */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Recentrar mapa al usuario */}
          <RecenterMap center={userLocation} />
          {/* Marcador de la ubicación del usuario */}
          <Marker position={userLocation}>
            <Popup>Tu ubicación</Popup>
          </Marker>
          {/* Marcadores de peluquerías */}
          {peluquerias.map((peluqueria) => (
            <Marker
              key={peluqueria.nombre}
              position={[peluqueria.latitud, peluqueria.longitud]}
              icon={customIcon}
            >
              <Popup>
                <b>{peluqueria.nombre}</b>
                <br />
                {peluqueria.calle}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default PeluqueriasMap;

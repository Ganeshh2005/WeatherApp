import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const AutoZoom = ({ userLocation }) => {
  const map = useMap();

  React.useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 15); // Set the desired zoom level (15 is close, adjust as needed)
    }
  }, [userLocation, map]);

  return null;
};
function Maps({ data }) {
  const [position, setPosition] = useState([51.505, -0.09]);

  useEffect(() => {
    if (data) {
      setPosition([data?.location?.lat, data?.location?.lon]);
    }
  }, [data]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {data?.location?.name}, {data?.location?.region} <br />{" "}
          {data?.current?.condition?.text}
        </Popup>
      </Marker>
      <AutoZoom userLocation={position} />
    </MapContainer>
  );
}

export default Maps;
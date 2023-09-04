import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeoLocation } from "../components/useGeoLocation";
import Button from "./Button";
import { UseUrlPosition } from "./useUrlPosition";
import User from "./User";

export default function Map() {
  const { cities }: any = useCities();

  const { lat: mapLat, lng: mapLng } = UseUrlPosition();

  const [mapPosition, setMapPosition] = useState<any>([40, 0]);

  const {
    isLoading: loadingGeoPos,
    position: geoLocationPos,
    getPosition,
  } = useGeoLocation();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocationPos)
        setMapPosition([geoLocationPos.lat, geoLocationPos.lng]);
    },
    [geoLocationPos]
  );

  return (
    // onClick={() => navigate("form")}
    <div className={styles.mapContainer}>
      {!geoLocationPos && (
        <Button type={"position"} onClick={() => getPosition()}>
          {loadingGeoPos ? "loading..." : "Set Your Position"}
        </Button>
      )}
      <User />
      <MapContainer
        className={styles.map}
        center={mapPosition} //default position
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city: any) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {" "}
              <span>{city.emoji}</span> <span>{city.cityName}</span>{" "}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <HandleMapEvents />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: any) {
  const map = useMap();
  map.setView(position); //sets the map view dynamically
  return null;
}

function HandleMapEvents() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e: any) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

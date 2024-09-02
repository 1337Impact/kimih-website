"use client";
import React, { useEffect, useState } from "react";
import { Icon, LatLngExpression } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import "./styles.css";

export const dynamic = "force-dynamic";

type MapProps = {
  latitude: number;
  longitude: number;
  showMarker?: boolean;
  handleChange?: (latitude: number, longitude: number) => void;
  markers?: {
    id: string;
    position: number[];
    popup: React.ReactNode;
  }[];
};

type ChangeViewProps = {
  center: L.LatLngExpression;
};

const ChangeView: React.FC<ChangeViewProps> = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

// const ClickListener = ({
//   onClick,
// }: {
//   onClick: (e: L.LeafletMouseEvent) => void;
// }) => {
//   useMapEvents({
//     click: onClick,
//   });

//   return null;
// };

const Map: React.FC<MapProps> = ({
  latitude,
  longitude,
  handleChange,
  showMarker,
  markers,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<L.LatLngExpression>([
    latitude,
    longitude,
  ]);
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 10,
  });

  const positionIcon = new Icon({
    iconUrl: "/assets/icons/red-marker.png",
    iconSize: [30, 30],
  });
  const businessIcon = new Icon({
    iconUrl: "/assets/icons/black-marker.svg",
    iconSize: [32, 32],
  });

  useEffect(() => {
    setIsMounted(true);
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: latitude,
      longitude: longitude,
    }));
    setMarkerPosition([latitude, longitude]);
  }, [latitude, longitude]);

  if (!isMounted) {
    return null;
  }

  const layer2 =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    isMounted && (
      <MapContainer
        className="h-full w-full rounded-xl"
        center={markerPosition}
        zoom={viewport.zoom}
        scrollWheelZoom={true}
      >
        <ChangeView center={markerPosition} />
        <TileLayer
          attribution='&copy; <a href=""></a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          showMarker && (
            <Marker icon={positionIcon} position={markerPosition}>
              <Popup>Current Location</Popup>
            </Marker>
          )
        }
        {markers && markers.map((marker) => (
          <Marker
            key={marker.id}
            icon={businessIcon}
            position={marker.position as LatLngExpression}
          >
            <Popup>{marker.popup}</Popup>
          </Marker>
        ))}
      </MapContainer>
    )
  );
};

export default Map;

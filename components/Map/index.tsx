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
import { useDispatch } from "react-redux";
import { setSelectedMarker } from "@/store/selectedMarkerSlice";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

type MapProps = {
  latitude: number;
  longitude: number;
  showMarker?: boolean;
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

const positionIcon = new Icon({
  iconUrl: "/assets/icons/red-marker.png",
  iconSize: [30, 30],
});
const businessIcon = new Icon({
  iconUrl: "/assets/icons/black-marker.svg",
  iconSize: [32, 32],
});

const Map: React.FC<MapProps> = ({
  latitude,
  longitude,
  showMarker,
  markers,
}) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const searchLat = parseFloat(searchParams.get("lat") || "");
  const searchLng = parseFloat(searchParams.get("lng") || "");

  const [isMounted, setIsMounted] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<L.LatLngExpression>([
    searchLat || latitude,
    searchLng || longitude,
  ]);

  useEffect(() => {
    if (searchLat && searchLng) {
      setMarkerPosition([searchLng, searchLat]);
    }
  }, [searchLat, searchLng]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleClick = (business_id: string) => {
    dispatch(setSelectedMarker({ id: business_id }));
  };

  return (
    isMounted && (
      <MapContainer
        className="h-full w-full rounded-xl"
        center={markerPosition}
        zoom={10}
        scrollWheelZoom={true}
      >
        <ChangeView center={markerPosition} />
        <TileLayer
          attribution='&copy; <a href=""></a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {showMarker && (
          <Marker icon={positionIcon} position={markerPosition}>
            <Popup>Current Location</Popup>
          </Marker>
        )}
        {markers &&
          markers.map((marker) => (
            <Marker
              eventHandlers={{
                click: () => {
                  handleClick(marker.id);
                },
              }}
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

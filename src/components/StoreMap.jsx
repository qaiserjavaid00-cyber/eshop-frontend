import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icon issue in bundlers
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function StoreMap({ lat = 24.8607, lng = 67.0011, zoom = 15 }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        const map = L.map(mapRef.current).setView([lat, lng], zoom);
        mapInstance.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup("TechStore Electronics <br/> Karachi, Pakistan");

        return () => {
            map.remove();
            mapInstance.current = null;
        };
    }, [lat, lng, zoom]);

    return (
        <div
            ref={mapRef}
            style={{
                width: "100%",
                height: "420px",
                borderRadius: "12px",
            }}
        />
    );
}
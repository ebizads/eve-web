"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapBoxMap() {
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [121.0437, 14.676],
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    new mapboxgl.Marker()
      .setLngLat([121.0437, 14.676])
      .setPopup(new mapboxgl.Popup().setText("Manila City"))
      .addTo(map.current);
  }, []);

  return <div ref={mapContainerRef} className="h-[100vh] shadow-md" />;
}

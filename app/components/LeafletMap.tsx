'use client';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {

        const coordinates: L.LatLngExpression = [37.86994421452708, 32.474147158457434]; // Coordinates for Konya I&G Danışmanlık
    
        if (!mapInstanceRef.current && mapContainerRef.current) {
          const map = L.map(mapContainerRef.current).setView(coordinates, 13); // Center map on Konya I&G Danışmanlık
    
          // Use Stadia Maps tiles for a more modern look
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);  
    
          // Custom marker icon resembling Google Maps pin
          const customIcon = L.icon({
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/1200px-Map_marker.svg.png', // Apple Maps-like pin,
            iconSize: [25, 40], // Size of the icon
            iconAnchor: [13, 40], // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -40] // Point from which the popup should open relative to the iconAnchor
          });
    
          // Add a custom marker at Konya I&G Danışmanlık location
          L.marker(coordinates, { icon: customIcon }).addTo(map)
            .bindPopup('İ&G Danışmanlık') // Customize the popup text
            .openPopup(); // Popup will be open by default
    
          mapInstanceRef.current = map; // Store the map instance in the ref
        }
    
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return <div ref={mapContainerRef} style={{ height: '400px', width: '100%' }} />;
};

export default LeafletMap;

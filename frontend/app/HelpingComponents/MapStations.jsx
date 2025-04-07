import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const MapStations = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [location, setLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Simulated police stations that will be placed relative to user's location
  const generateStations = (userLat, userLng) => [
    {
      id: 1,
      name: "Central Police Station",
      location: "Downtown Area",
      distance: "1.2 km",
      officers: 24,
      lat: userLat + 0.008,
      lng: userLng + 0.008
    },
    {
      id: 2,
      name: "North District HQ",
      location: "North Side",
      distance: "2.5 km",
      officers: 18,
      lat: userLat + 0.015,
      lng: userLng + 0.01
    },
    {
      id: 3,
      name: "East Precinct",
      location: "East District",
      distance: "3.1 km",
      officers: 15,
      lat: userLat - 0.01,
      lng: userLng + 0.018
    },
    {
      id: 4,
      name: "West Division",
      location: "West Area",
      distance: "1.8 km",
      officers: 20,
      lat: userLat + 0.005,
      lng: userLng + 0.015
    }
  ];

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setLocation(newLocation);
        
        // Initialize map once we have the location
        if (!map && window.L) {
          const m = window.L.map('map').setView([newLocation.lat, newLocation.lng], 14);
          window.L.tileLayer('https://{s}.tile.Openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            className: 'map-tiles' // This will help us style the map darker
          }).addTo(m);
          setMap(m);

          // Style the map darker
          const mapContainer = document.querySelector('.map-tiles');
          if (mapContainer) {
            mapContainer.style.filter = 'brightness(0.7) invert(1) contrast(1.2) hue-rotate(200deg)';
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (map && location) {
      // Clear existing markers
      markers.forEach(marker => marker.remove());
      
      // Add user location marker
      const userMarker = window.L.marker([location.lat, location.lng], {
        icon: window.L.divIcon({
          html: `<div class="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                 <div class="w-4 h-4 bg-blue-500 rounded-full absolute top-0"></div>`,
          className: 'user-location-marker',
          iconSize: [16, 16]
        })
      }).addTo(map);

      // Generate and add station markers
      const stations = generateStations(location.lat, location.lng);
      const stationMarkers = stations.map(station => {
        const marker = window.L.marker([station.lat, station.lng], {
          icon: window.L.divIcon({
            html: `<div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <div class="w-4 h-4 bg-red-600 rounded-full"></div>
                   </div>`,
            className: 'station-marker',
            iconSize: [24, 24]
          })
        })
        .addTo(map)
        .bindPopup(`
          <div class="text-gray-900 p-2">
            <strong>${station.name}</strong><br>
            ${station.location}<br>
            ${station.officers} officers
          </div>
        `);

        marker.on('click', () => setSelectedStation(station));
        return marker;
      });

      setMarkers([userMarker, ...stationMarkers]);
    }
  }, [map, location]);

  const stations = location ? generateStations(location.lat, location.lng) : [];

  return (
    <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 text-white border border-blue-400/20">
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-white/10 p-3 rounded-lg">
            <MapPin className="h-6 w-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold">Police Stations Near You</h2>
        </div>

        {/* Map Container */}
        <div className="aspect-video bg-slate-800/50 rounded-lg overflow-hidden relative mb-4 border border-blue-500/20">
          <div id="map" className="h-full w-full z-0"></div>
        </div>

        {/* Stations List */}
        <div className="space-y-2">
          {stations.map((station) => (
            <div
              key={station.id}
              className={`bg-white/5 hover:bg-white/10 p-3 rounded-lg transition-colors cursor-pointer ${
                selectedStation?.id === station.id ? 'bg-white/10 border border-blue-500/20' : ''
              }`}
              onClick={() => setSelectedStation(station)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{station.name}</p>
                  <span className="text-blue-300 text-sm">{station.location}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-200">
                    {station.distance}
                  </span>
                  <p className="text-sm text-blue-200 mt-1">
                    {station.officers} officers
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapStations;
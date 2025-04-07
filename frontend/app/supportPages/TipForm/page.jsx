'use client'
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import "leaflet/dist/leaflet.css";
import Footer from "@/app/HelpingComponents/Footer";
import UploadEvidence from "@/app/HelpingComponents/UploadEvidence";
import CameraCapture from "@/app/HelpingComponents/cameraCapture";

const MapSection = ({ location }) => {
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");

  return (
    <>
      <p className="text-center mt-4 text-lg text-blue-300">
        Location: {location.latitude}, {location.longitude}
      </p>
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={17}
        style={{ height: "400px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.latitude, location.longitude]}>
          <Popup>Your location</Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

const DynamicMap = dynamic(() => Promise.resolve(MapSection), { ssr: false });

const TipForm = () => {
  const [location, setLocation] = useState(null);
  const [tip, setTip] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting tip:", { tip, location });

    try {
      const response = await fetch("http://localhost:5001/api/anonymous/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tip, location: { lat: location.latitude, lng: location.longitude } })
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (response.ok) {
        alert("Anonymous tip submitted successfully!");
        setTip("");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit tip. Check console for details.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
        <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-xl bg-gray-800 border-b border-blue-600 mb-10">
          <h2 className="text-3xl font-semibold text-center mb-6 text-blue-400">Submit an Anonymous Tip</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              placeholder="Describe the incident..."
              className="w-full h-36 p-4 mb-6 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg transition duration-300"
            >
              Submit Tip
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-6">
            <UploadEvidence />
            <CameraCapture />
          </div>

          {location && <DynamicMap location={location} />}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TipForm;

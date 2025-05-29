import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, useMapEvents, Marker } from 'react-leaflet';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';

const PFZ = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [popupContent, setPopupContent] = useState(null);

  const handleMapClick = async (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    setCoordinates({ lat, lng });
    setPopupContent(null);

    if (!selectedDate) {
      toast.warn("🗓️ Please select a date first.");
      return;
    }

    try {
      const response = await axios.get(`http://your-backend-url.com/api/fishing-potential`, {
        params: { lat, lng, date: selectedDate },
      });

      const potential = response.data.potential || 'Unknown';
      setPopupContent(`🎣 Fishing Potential: ${potential}`);
    } catch (error) {
      toast.error("❌ Couldn't fetch data from backend.");
      console.error(error);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({ click: handleMapClick });
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-50 to-blue-100 px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 drop-shadow-sm">
          🎯 Potential Fishing Zones
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <label className="text-base font-medium text-gray-700">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-blue-300 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
          />
        </div>

        <div className="border border-blue-300 rounded-xl overflow-hidden shadow-md">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: '350px', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />

            {coordinates && popupContent && (
              <Marker position={[coordinates.lat, coordinates.lng]}>
                <Popup>
                  <div
                    style={{
                      borderRadius: '18px',
                      backgroundColor: '#f0f9ff',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                      fontFamily: 'Segoe UI, sans-serif',
                      fontSize: '15px',
                      padding: '12px 16px',
                      color: '#1e3a8a',
                      maxWidth: '200px',
                    }}
                  >
                    {popupContent}
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default PFZ;

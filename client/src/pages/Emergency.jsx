import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Function to calculate the distance between two geographical coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const Emergency = () => {
  const [nearestHospitals, setNearestHospitals] = useState([]);
  const [isHospitalBooked, setIsHospitalBooked] = useState(false);
  const [bookedHospital, setBookedHospital] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      setIsLocationLoading(true);
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0
            });
          });
          
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        } else {
          toast.error("Geolocation is not supported by your browser");
        }
      } catch (error) {
        console.error('Error getting location:', error);
        toast.error("Unable to get your location. Please check your location settings.");
      } finally {
        setIsLocationLoading(false);
      }
    };

    getLocation();
  }, []);

  const fetchNearbyHospitals = async (lat, lng) => {
    setIsLoading(true);
    try {
      // Using Overpass API to fetch hospitals within 5km radius
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:5000,${lat},${lng});
          way["amenity"="hospital"](around:5000,${lat},${lng});
          relation["amenity"="hospital"](around:5000,${lat},${lng});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
      });

      const data = await response.json();
      
      // Process the results
      const hospitals = data.elements
        .filter(element => {
          // Only include elements with a name and valid coordinates
          if (!element.tags || !element.tags.name) return false;
          
          // For nodes, check lat/lon
          if (element.type === 'node') {
            return element.lat && element.lon;
          }
          
          // For ways and relations, we need to get the center point
          if (element.type === 'way' || element.type === 'relation') {
            return element.center && element.center.lat && element.center.lon;
          }
          
          return false;
        })
        .map(element => {
          // Get coordinates based on element type
          let latitude, longitude;
          if (element.type === 'node') {
            latitude = element.lat;
            longitude = element.lon;
          } else {
            latitude = element.center.lat;
            longitude = element.center.lon;
          }

          return {
            id: element.id,
            name: element.tags.name,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            type: element.tags.amenity,
            phone: element.tags.phone || 'N/A',
            website: element.tags.website || 'N/A',
            emergency: element.tags.emergency || 'N/A',
            opening_hours: element.tags.opening_hours || 'N/A',
          };
        });

      if (hospitals.length === 0) {
        toast.error('No hospitals found in your area. Try increasing the search radius.');
        return;
      }

      setNearestHospitals(hospitals);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      toast.error('Failed to fetch nearby hospitals');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookAmbulance = async () => {
    if (userLocation.lat && userLocation.lng) {
      await fetchNearbyHospitals(userLocation.lat, userLocation.lng);
      setShowMap(true);
    } else {
      toast.error('Please allow location access to find nearby hospitals');
    }
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setIsHospitalBooked(false);
    setBookedHospital(null);
  };

  const handleBookHospital = (hospital) => {
    setBookedHospital(hospital);
    setIsHospitalBooked(true);
    toast.success("Ambulance Booked successfully");
    setShowMap(false);

    setTimeout(() => {
      setIsHospitalBooked(false);
      setBookedHospital(null);
    }, 3000);
  };

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  };

  const center = userLocation.lat && userLocation.lng
    ? [userLocation.lat, userLocation.lng]
    : [22.572, 88.363]; // Default center (you can adjust this)

  // Sort hospitals by distance
  const sortedHospitals = [...nearestHospitals].sort((a, b) => {
    const distA = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      a.latitude,
      a.longitude
    );
    const distB = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      b.latitude,
      b.longitude
    );
    return distA - distB;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Emergency Page</h1>
      <div className="flex space-x-4 mb-6">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg text-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleBookAmbulance}
          disabled={isLoading || isLocationLoading}
        >
          {isLoading || isLocationLoading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{isLocationLoading ? 'Getting Location...' : 'Finding Hospitals...'}</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Book Ambulance</span>
            </>
          )}
        </button>
      </div>

      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50">
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 right-0 z-[1000] bg-white p-4 shadow-md">
              <div className="container mx-auto flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">Select Nearest Hospital</h2>
                  <p className="text-sm text-gray-600">Found {nearestHospitals.length} hospitals within 5km</p>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCloseMap}
                >
                  Close
                </button>
              </div>
            </div>
            <div className="absolute top-[72px] bottom-0 left-0 right-0">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <svg className="animate-spin h-12 w-12 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-white mt-4">Finding nearby hospitals...</p>
                  </div>
                </div>
              ) : (
                <MapContainer
                  center={center}
                  zoom={13}
                  style={mapContainerStyle}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* User location marker */}
                  {userLocation.lat && userLocation.lng && (
                    <Marker position={[userLocation.lat, userLocation.lng]}>
                      <Popup>
                        <div className="font-semibold">Your Location</div>
                      </Popup>
                    </Marker>
                  )}

                  {/* Hospital markers */}
                  {sortedHospitals.map((hospital, index) => (
                    <Marker
                      key={hospital.id}
                      position={[hospital.latitude, hospital.longitude]}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold mb-2">{hospital.name}</h3>
                          <p className="text-sm mb-2">
                            Distance:{" "}
                            {calculateDistance(
                              userLocation.lat,
                              userLocation.lng,
                              hospital.latitude,
                              hospital.longitude
                            ).toFixed(2)}{" "}
                            km
                          </p>
                          <p className="text-xs text-gray-500 mb-2">
                            Rank: #{index + 1} nearest hospital
                          </p>
                          {hospital.phone !== 'N/A' && (
                            <p className="text-sm mb-2">Phone: {hospital.phone}</p>
                          )}
                          {hospital.website !== 'N/A' && (
                            <p className="text-sm mb-2">
                              <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Visit Website
                              </a>
                            </p>
                          )}
                          {hospital.emergency !== 'N/A' && (
                            <p className="text-sm mb-2">Emergency: {hospital.emergency}</p>
                          )}
                          {hospital.opening_hours !== 'N/A' && (
                            <p className="text-sm mb-2">Hours: {hospital.opening_hours}</p>
                          )}
                          <button
                            className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded"
                            onClick={() => handleBookHospital(hospital)}
                          >
                            Book Ambulance
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      )}

      {isHospitalBooked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-500">
              Ambulance Booked Successfully!
            </h2>
            <p className="text-lg">
              An ambulance from {bookedHospital.name} is on its way. Please stay calm and wait for the ambulance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;

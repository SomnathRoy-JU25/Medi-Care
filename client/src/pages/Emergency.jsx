// // I want build a Emergency feature using React.js and Tailwind  css styling . The feature is we have to build emergency page where a of emergency present and when ever a person click it a a pop up open and all the nearest hospital shown in a map and it also connected with least distance Hospital Autometically .
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import MapGL, { Marker } from 'react-map-gl';

// const Emergency = () => {
//     const [popupVisible, setPopupVisible] = useState(false);
//     const [nearestHospitals, setNearestHospitals] = useState([]);
//     const [viewport, setViewport] = useState({
//         width: '100%',
//         height: '500px',
//         latitude: 22.572645,
//         longitude: 88.363892,
//         zoom: 10,
//     });

//     // Function to fetch nearest hospitals and update nearestHospitals state
//     const fetchNearestHospitals = async () => {
//         try {
//             // Replace this URL with the actual endpoint that provides nearest hospitals data
//             const response = await fetch('https://api.example.com/nearesthospitals');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch nearest hospitals');
//             }
//             const data = await response.json();

//             // Assuming the API response returns data in the following format:
//             // [{ id: 1, name: 'Hospital A', latitude: 123.456, longitude: 789.012 }, ...]

//             // Update the nearestHospitals state with the fetched data
//             setNearestHospitals(data);
//         } catch (error) {
//             console.error('Error fetching nearest hospitals:', error.message);
//             // Optionally, handle errors such as displaying an error message to the user
//         }
//     };


//     // Function to handle emergency button click
//     const handleEmergencyClick = () => {
//         setPopupVisible(true);
//         fetchNearestHospitals();
//     };

//     // Function to handle closing the popup
//     const handleClosePopup = () => {
//         setPopupVisible(false);
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-semibold mb-4">Emergency Page</h1>
//             <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleEmergencyClick}>
//                 Call Emergency
//             </button>

//             {popupVisible && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white p-8 rounded-lg max-w-lg">
//                         <h2 className="text-2xl font-semibold mb-4">Nearest Hospitals</h2>
//                         <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-600" onClick={handleClosePopup}>
//                             Close
//                         </button>
//                         <MapGL
//                             {...viewport}
//                             mapStyle="mapbox://styles/mapbox/light-v10"
//                             // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
//                             mapboxApiAccessToken={'pk.eyJ1IjoiZmFicmljOCIsImEiOiJjaWc5aTV1ZzUwMDJwdzJrb2w0dXRmc2d0In0.p6GGlfyV-WksaDV_KdN27A'}
//                             onViewportChange={(viewport) => setViewport(viewport)}
//                         >
//                             {nearestHospitals.map((hospital) => (
//                                 <Marker key={hospital.id} latitude={hospital.latitude} longitude={hospital.longitude} offsetLeft={-20} offsetTop={-10}>
//                                     <div className="text-red-500">
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                             <circle cx="12" cy="12" r="10" />
//                                         </svg>
//                                     </div>
//                                 </Marker>
//                             ))}
//                         </MapGL>
//                         <div className="mt-4">
//                             <ul>
//                                 {nearestHospitals.map((hospital) => (
//                                     <li key={hospital.id}>{hospital.name}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Emergency;

import React, { useState, useEffect } from 'react';

const Emergency = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [nearestHospitals, setNearestHospitals] = useState([]);
  
  useEffect(() => {
    fetchNearestHospitals();
  }, []);

  const fetchNearestHospitals = async () => {
    try {
      // Simulate fetching nearest hospitals (generate mock data)
      const mockData = generateRandomHospitals(10);
      setNearestHospitals(mockData);
    } catch (error) {
      console.error('Error fetching nearest hospitals:', error.message);
    }
  };

  const generateRandomHospitals = (count) => {
    const hospitals = [];
    for (let i = 0; i < count; i++) {
      hospitals.push({
        id: i + 1,
        name: `Hospital ${i + 1}`,
        latitude: getRandomCoordinate(-90, 90),
        longitude: getRandomCoordinate(-180, 180)
      });
    }
    return hospitals;
  };

  const getRandomCoordinate = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(6);
  };

  const handleEmergencyClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Emergency Page</h1>
      <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleEmergencyClick}>
        Call Emergency
      </button>

      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Nearest Hospitals</h2>
            <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-600" onClick={handleClosePopup}>
              Close
            </button>
            <div style={{ height: '400px' }}>
              <GoogleMap hospitals={nearestHospitals} />
            </div>
            <div className="mt-4">
              <ul>
                {nearestHospitals.map((hospital) => (
                  <li key={hospital.id}>{hospital.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GoogleMap = ({ hospitals }) => {
  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  const loadGoogleMapsScript = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);
  };

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 22.572645, lng: 88.363892 },
      zoom: 10,
    });

    hospitals.forEach((hospital) => {
      new window.google.maps.Marker({
        position: { lat: parseFloat(hospital.latitude), lng: parseFloat(hospital.longitude) },
        map,
        title: hospital.name,
      });
    });
  };

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default Emergency;

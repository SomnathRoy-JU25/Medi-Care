import React, { useState, useEffect } from "react";
import data from "./Data/nearest-hospitals.json";
import { toast } from "react-hot-toast";

const Emergency = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [nearestHospitals, setNearestHospitals] = useState([]);
  const [isHospitalBooked, setIsHospitalBooked] = useState(false);
  const [bookedHospital, setBookedHospital] = useState(null);

  useEffect(() => {
    setNearestHospitals(data);
  }, []);

  const handleEmergencyClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setIsHospitalBooked(false); // Reset the booked state when closing the popup
    setBookedHospital(null); // Reset booked hospital
  };

  const handleBookHospital = (hospital) => {
    setBookedHospital(hospital);
    setIsHospitalBooked(true);
    toast.success("Hospital Booked successfully");

    // Automatically close the popup after 3 seconds
    setTimeout(() => {
      handleClosePopup();
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Emergency Page</h1>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleEmergencyClick}
      >
        Call Emergency
      </button>

      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-lg max-w-screen">
            <h2 className="text-2xl font-semibold mb-4">Nearest Hospitals</h2>
            <button
              className="rounded-full text-xl bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 absolute top-2 right-2 p-2 text-gray-700"
              onClick={handleClosePopup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="max-h-auto w-96">
              <ul>
                {nearestHospitals.map((hospital) => (
                  <li
                    key={hospital.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>{hospital.name}</span>
                    <button
                      className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleBookHospital(hospital)}
                    >
                      Book
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {isHospitalBooked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-lg max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              Hospital Booked
            </h2>
            <p className="text-lg">
              You have successfully booked {bookedHospital.name}. An ambulance
              is on its way. Please stay calm.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;

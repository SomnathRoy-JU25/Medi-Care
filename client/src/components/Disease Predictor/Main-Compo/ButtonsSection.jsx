// ButtonsSection.js
import React from "react";
import "../HomePage.css";

const ButtonsSection = ({
  currentPage,
  getNextPage,
  getPreviousPage,
  buttonIsDisabled,
  patient2NextButtonDisabled,
  userSymptomLength,
  buttonName,
}) => {
  return (
    <div className="col-span-12 ml-6">
      <div id="buttonsSection" className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 pt-2">
        <button
          disabled={currentPage === "Home"}
          onClick={getPreviousPage}
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          className={`py-2 px-4 rounded ${
            buttonIsDisabled || patient2NextButtonDisabled || userSymptomLength === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-900"
          }`}
          disabled={buttonIsDisabled || patient2NextButtonDisabled || userSymptomLength === 0}
          type="submit"
          onClick={getNextPage}
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default ButtonsSection;

import React from "react";
import Home from "../Home/Home"
import Symptom from "../Symptom/Symptom";
import Disease from "../Disease/Disease";
import "../HomePage.css";

const MainContent = ({
  currentPage,
  homeButtonChecked,
  homeButtonCheckEvent,
  userSymptoms,
  diseasePossibility,
  symptomInfoCallback,
}) => {
  switch (currentPage) {
    case "Home":
      return <Home isChecked={homeButtonChecked} checked={homeButtonCheckEvent} />;
    case "Symptom":
      return (
        <Symptom
          userSymptoms={userSymptoms}
          diseasePossibility={diseasePossibility}
          getPossibleDisease={symptomInfoCallback}
        />
      );
    case "Disease":
      return (
        <Disease
          disease_with_possibility={diseasePossibility}
        />
      );
    default:
      return null;
  }
};

export default MainContent;

// MainContent.js
import React from "react";
import Home from "../Home/Home"
import Patient from "../Patient/Patient1";
import Patient2 from "../Patient/Patient2";
import Symptom from "../Symptom/Symptom";
import Disease from "../Disease/Disease";
import "../HomePage.css";

const MainContent = ({
  currentPage,
  homeButtonChecked,
  homeButtonCheckEvent,
  male,
  female,
  gender,
  getGender,
  age,
  getAgeEvent,
  patient2Callback,
  userSymptoms,
  diseasePossibility,
  symptomInfoCallback,
  patientQuestion
}) => {
  switch (currentPage) {
    case "Home":
      return <Home isChecked={homeButtonChecked} checked={homeButtonCheckEvent} />;
    case "Patient":
      return <Patient male={male} female={female} gender={getGender} age={age} ageChange={getAgeEvent} />;
    case "Patient-2":
      return <Patient2 callback={patient2Callback} />;
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
          patientInfo={patientQuestion}
          disease_with_possibility={diseasePossibility}
          gender={gender}
          age={age}
        />
      );
    default:
      return null;
  }
};

export default MainContent;

import React, { useState, useRef } from "react";
import "./HomePage.css";
import NavigationBar from "./Main-Compo/NavigationBar";
import MainContent from "./Main-Compo/MainContent";
import ButtonsSection from "./Main-Compo/ButtonsSection";

const DiseasePredictorPage = () => {
  const [currentPage, setCurrentPage] = useState("Home");
  const [tabProgress, setTabProgress] = useState(25);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [homeButtonChecked, setHomeButtonChecked] = useState(false);
  const [buttonName, setButtonName] = useState("Next");
  const [patient2NextButtonDisabled, setPatient2NextButtonDisabled] = useState("");
  const [homeNavValue, setHomeNavValue] = useState(false);
  const [symptomNavValue, setSymptomNavValue] = useState(false);
  const [diseaseNavValue, setDiseaseNavValue] = useState(false);
  const [diseasePossibility, setDiseasePossibility] = useState([]);
  const [userSymptoms, setUserSymptoms] = useState([]);
  const [userSymptomLength, setUserSymptomLength] = useState("");

  const homeButtonCheckEvent = (e) => {
    if (e.target.checked) {
      setButtonIsDisabled(false);
      setHomeButtonChecked(true);
      setHomeNavValue(true);
      setPatientNavValue(true);
    } else {
      setButtonIsDisabled(true);
      setHomeButtonChecked(false);
      setHomeNavValue(false);
      setPatientNavValue(false);
    }
  };

  const getNextPage = () => {
    switch (currentPage) {
      case "Home":
        setCurrentPage("Symptom");
        setTabProgress(50);
        setButtonName("Finish");
        setPatientNavValue(true);
        setUserSymptomLength(0);
        break;
      case "Symptom":
        setCurrentPage("Disease");
        setButtonName("Retry");
        setTabProgress(100);
        setSymptomNavValue(true);
        setDiseaseNavValue(true);
        break;
      case "Disease":
        resetState();
        break;
    }
  };

  const getPreviousPage = () => {
    switch (currentPage) {
      case "Disease":
        setCurrentPage("Symptom");
        setButtonName("Finish");
        setTabProgress(100);
        setDiseaseNavValue(false);
        setUserSymptomLength(userSymptoms.length);
        break;
      case "Symptom":
        setCurrentPage("Home");
        setTabProgress(50);
        setButtonName("Next");
        setPatientNavValue(false);
        setPatient2NextButtonDisabled(true);
        setDiseasePossibility([]);
        setUserSymptoms([]);
        break;
    }
  };

  const symptomInfoCallback = (data, data2) => {
    setDiseasePossibility(data);
    setUserSymptoms(data2);
    setUserSymptomLength(data2.length);
  };


  const resetState = () => {
    setCurrentPage("Home");
    setTabProgress(25);
    setButtonIsDisabled(true);
    setHomeButtonChecked(false);
    setButtonName("Next");
    setPatient2NextButtonDisabled("");
    setHomeNavValue(false);
    setSymptomNavValue(false);
    setDiseaseNavValue(false);
    setDiseasePossibility([]);
    setUserSymptoms([]);
    setUserSymptomLength("");
  };

  return (
    <React.Fragment>
      <main id="main-content">
        <div className="grid-container padding-bottom-4 h-auto">
          <div className="grid-row padding-4 ">
            <NavigationBar tabProgress={tabProgress} currentPage={currentPage} />
            <div className="col-span-10 pb-12" id="ContentDiv">
              <div className="grid grid-cols-1 gap-4 pb-16">
                <MainContent
                  currentPage={currentPage}
                  homeButtonChecked={homeButtonChecked}
                  homeButtonCheckEvent={homeButtonCheckEvent}
                  userSymptoms={userSymptoms}
                  diseasePossibility={diseasePossibility}
                  symptomInfoCallback={symptomInfoCallback}
                />
              </div>
            </div>
            <ButtonsSection
              currentPage={currentPage}
              getNextPage={getNextPage}
              getPreviousPage={getPreviousPage}
              buttonIsDisabled={buttonIsDisabled}
              userSymptomLength={userSymptomLength}
              buttonName={buttonName}
            />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default DiseasePredictorPage;

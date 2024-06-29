// DiseasePredictorPage.js
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
  const [age, setAge] = useState("18");
  const [buttonName, setButtonName] = useState("Next");
  const [gender, setGender] = useState("Male");
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [patientQuestion, setPatientQuestion] = useState([]);
  const [patient2NextButtonDisabled, setPatient2NextButtonDisabled] = useState("");
  const [homeNavValue, setHomeNavValue] = useState(false);
  const [patientNavValue, setPatientNavValue] = useState(false);
  const [symptomNavValue, setSymptomNavValue] = useState(false);
  const [diseaseNavValue, setDiseaseNavValue] = useState(false);
  const [diseasePossibility, setDiseasePossibility] = useState([]);
  const [userSymptoms, setUserSymptoms] = useState([]);
  const [userSymptomLength, setUserSymptomLength] = useState("");
  const symptomPage = useRef(null);

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
        setCurrentPage("Patient");
        setTabProgress(50);
        setHomeNavValue(true);
        setButtonIsDisabled(false);
        setHomeButtonChecked(false);
        break;
      case "Patient":
        setCurrentPage("Patient-2");
        setButtonName("Next");
        setPatient2NextButtonDisabled(true);
        break;
      case "Patient-2":
        setCurrentPage("Symptom");
        setTabProgress(75);
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
        setTabProgress(75);
        setDiseaseNavValue(false);
        setUserSymptomLength(userSymptoms.length);
        break;
      case "Symptom":
        setCurrentPage("Patient-2");
        setTabProgress(50);
        setButtonName("Next");
        setPatientNavValue(false);
        setPatient2NextButtonDisabled(true);
        setDiseasePossibility([]);
        setUserSymptoms([]);
        break;
      case "Patient-2":
        setCurrentPage("Patient");
        setPatient2NextButtonDisabled(false);
        break;
      case "Patient":
        setCurrentPage("Home");
        setHomeNavValue(false);
        setButtonIsDisabled(true);
        setHomeButtonChecked(false);
        setTabProgress(25);
        setUserSymptomLength(1);
        break;
    }
  };

  const getGender = (e) => {
    if (e.target.value === "male") {
      setMale(true);
      setFemale(false);
      setGender("Male");
    } else if (e.target.value === "female") {
      setMale(false);
      setFemale(true);
      setGender("Female");
    }
  };

  const getAgeEvent = (e) => {
    setAge(e.target.value);
  };

  const symptomInfoCallback = (data, data2) => {
    setDiseasePossibility(data);
    setUserSymptoms(data2);
    setUserSymptomLength(data2.length);
  };

  const patient2Callback = (data) => {
    const d = data.filter((key) => key.answer !== "");
    const avl = data.length !== d.length;
    setPatientQuestion(data);
    setPatient2NextButtonDisabled(avl);
    setSymptomNavValue(true);
  };

  const resetState = () => {
    setCurrentPage("Home");
    setTabProgress(25);
    setButtonIsDisabled(true);
    setHomeButtonChecked(false);
    setAge("18");
    setButtonName("Next");
    setGender("Male");
    setMale(true);
    setFemale(false);
    setPatientQuestion([]);
    setPatient2NextButtonDisabled("");
    setHomeNavValue(false);
    setPatientNavValue(false);
    setSymptomNavValue(false);
    setDiseaseNavValue(false);
    setDiseasePossibility([]);
    setUserSymptoms([]);
    setUserSymptomLength("");
  };

  return (
    <React.Fragment>
      <main id="main-content">
        <div className="grid-container padding-bottom-4">
          <div className="grid-row padding-4">
            <NavigationBar tabProgress={tabProgress} currentPage={currentPage} />
            <div className="col-span-10 pb-12" id="ContentDiv">
              <div className="grid grid-cols-1 gap-4 pb-16">
                <MainContent
                  currentPage={currentPage}
                  homeButtonChecked={homeButtonChecked}
                  homeButtonCheckEvent={homeButtonCheckEvent}
                  male={male}
                  female={female}
                  gender={getGender}
                  age={age}
                  getAgeEvent={getAgeEvent}
                  patient2Callback={patient2Callback}
                  userSymptoms={userSymptoms}
                  diseasePossibility={diseasePossibility}
                  symptomInfoCallback={symptomInfoCallback}
                  patientQuestion={patientQuestion}
                />
              </div>
            </div>
            <ButtonsSection
              currentPage={currentPage}
              getNextPage={getNextPage}
              getPreviousPage={getPreviousPage}
              buttonIsDisabled={buttonIsDisabled}
              patient2NextButtonDisabled={patient2NextButtonDisabled}
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
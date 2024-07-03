import React, { useState, useEffect } from "react";
import "./Disease.css";
import {useSelector} from "react-redux"

const Disease = ({ disease_with_possibility}) => {
  const {user} = useSelector((state) => state.profile);
  const [filteredDiseaseList, setFilteredDiseaseList] = useState([]);

  useEffect(() => {
    const filteredList = disease_with_possibility.filter(
      (e) => e.possibility > 0
    );
    filteredList.sort(
      (a, b) =>
        -a.possibility.localeCompare(b.possibility, undefined, {
          numeric: true,
        }) || a.name.localeCompare(b.name)
    );
    setFilteredDiseaseList(filteredList);
  }, [disease_with_possibility]);

  const getCurrentHtml = () => {
    return filteredDiseaseList.length !== 0 ? (
      <div className="grid-row width-full DiseaseComponent">
        <div className="col-12 tablet:grid-col-12 patientInfo">
          <h3>Patient Name: {user.firstName}</h3>
        </div>
        <div className="col-12 tablet:grid-col-12 DiagnosisReport">
          <h2>Diagnosis Report</h2>
          {filteredDiseaseList.map((disease, id) => (
            <div className="reportDiv" key={id}>
              <div className="display-flex flex-row flex-justify flex-wrap">
                <div className="titleReport flex flex-row items-center">
                  <h4>{disease.name}</h4>
                  <a
                    href={`https://en.wikipedia.org/wiki/${disease.name}`}
                    title={"wikipedia"}
                    rel="noopener noreferrer"
                    target="blank"
                    className="h-7 rounded-full"
                  >
                    i
                  </a>
                </div>
                <div className="display-flex flex-align-center Possibility">
                  <p>
                    Possibility <span>{disease.possibility}%</span>
                  </p>
                  <div className="possibilityProgressBar">
                    <div style={{ width: `${disease.possibility}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="diseaseSymptoms">
                <h4>Disease Symptoms</h4>
                <ul>
                  {disease.disease_symptom.sort().map((symptom, index) => {
                    return disease.symptom_user_has.includes(symptom) ? (
                      <li key={index} className="active">
                        {symptom}
                      </li>
                    ) : (
                      <li key={index}>{symptom}</li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div>
          Always visit a doctor if you have any symptoms of a disease or call
          your local hospital
        </div>
      </div>
    ) : (
      <React.Fragment>
        <div className="grid-row width-full DiseaseComponent">
          <p>
            {" "}
            Cannot determine possible diseases due to lack of symptoms. Please
            retry the analysis with actual symptoms or call your local hospital
            if it is an emergency.
          </p>
        </div>
      </React.Fragment>
    );
  };

  return <React.Fragment>{getCurrentHtml()}</React.Fragment>;
};

export default Disease;

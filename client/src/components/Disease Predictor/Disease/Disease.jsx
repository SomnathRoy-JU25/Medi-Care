import React, { useState, useEffect } from "react";
import "./Disease.css";

const Disease = ({ patientInfo, disease_with_possibility, gender, age }) => {
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
          <h3>Patient gender: {gender}</h3>
          <h3>Patient age: {age}</h3>
        </div>
        <div className="col-12 tablet:grid-col-12 patientQuestions">
          {patientInfo.map((item, id) => (
            <div className="singleQuestion" key={id}>
              <p>{item.question}</p>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
        <div className="col-12 tablet:grid-col-12 DiagnosisReport">
          <h2>Diagnosis Report</h2>
          {filteredDiseaseList.map((disease, id) => (
            <div className="reportDiv" key={id}>
              <div className="display-flex flex-row flex-justify flex-wrap">
                <div className="display-flex flex-align-center titleReport">
                  <h4>{disease.name}</h4>
                  <a
                    href={`https://en.wikipedia.org/wiki/${disease.name}`}
                    title={"wikipedia"}
                    rel="noopener noreferrer"
                    target="blank"
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
          <div className="col-12 tablet:grid-col-12 patientInfo">
            <h3>Patient gender: {gender}</h3>
            <h3>Patient age: {age}</h3>
          </div>
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

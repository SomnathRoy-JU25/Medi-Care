import React from "react";
import { Symptoms } from "../data/Symptoms";

const SymptomList = ({
  user_symptoms,
  addSymptom,
  deleteSymptom,
  getInputSymptoms,
  keyDownEvent,
  onClickReset,
  searched,
}) => {
  const filteredSymptoms = Symptoms.filter((each) =>
    each.toLowerCase().includes(searched.toLowerCase())
  );

  return (
    <div id="#Symptoms" className="grid-row width-full gap-4 p-4 h-auto">
      <div className="col-12 tablet:grid-col-5">
        <input
          className="usa-input searchSymptomsInput form-input w-full p-2 border border-gray-300 rounded bg-slate-800"
          onKeyDown={keyDownEvent}
          onChange={getInputSymptoms}
          placeholder="Search Symptoms"
          id="input-type-text"
          name="input-type-text"
          type="text"
        />
        <ul className="symtomsListBox padding-top-2">
          {filteredSymptoms
            .filter((item) => !user_symptoms.includes(item))
            .map((key, id) => (
              <li key={id}>
                <button onClick={() => addSymptom(key)} value={key}>
                  {key}
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="col-12 tablet:grid-col-7 padding-top-2 UserSymptoms">
        <ul>
          {user_symptoms.map((key, id) => (
            <li key={id}>
              {key}{" "}
              <button onClick={() => deleteSymptom(key)} value={key}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-12 width-full display-flex flex-row flex-justify-start resetButton padding-left-2 col-span-5 flex justify-start mt-4">
        <button
          onClick={onClickReset}
          className="usa-button usa-button--secondary bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SymptomList;

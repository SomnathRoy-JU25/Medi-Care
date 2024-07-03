import React, { useState } from "react";
import SymptomList from "./SymptomList";
//data
import { Symptoms } from "../data/Symptoms";
import { Diseases } from "../data/Diseases";
//CSS
import "./Symptom.css";

const Symptom = (props) => {
  const [userSymptoms, setUserSymptoms] = useState(props.userSymptoms);
  const [diseaseWithPossibility, setDiseaseWithPossibility] = useState(
    props.diseasePossibility
  );
  const [searched, setSearched] = useState("");

  // Adds Symptoms to the UserSymptom state array
  const addSymptomButtonEvent = (symptom) => {
    if (!userSymptoms.includes(symptom)) {
      setUserSymptoms((prevSymptoms) => {
        const newSymptoms = [...prevSymptoms, symptom];
        get_possible_disease(newSymptoms);
        return newSymptoms;
      });
    }
  };

  // Deletes Symptoms from the UserSymptom state array
  const deleteSymptomButtonEvent = (symptom) => {
    if (userSymptoms.includes(symptom)) {
      setUserSymptoms((prevSymptoms) => {
        const newSymptoms = prevSymptoms.filter((s) => s !== symptom);
        get_possible_disease(newSymptoms);
        return newSymptoms;
      });
    }
  };

  // Get the possible disease with possibility and its name
  const get_possible_disease = (symptoms) => {
    const possible_disease_function = (arr1, arr2) => {
      return arr1.filter((symptom) => arr2.includes(symptom));
    };

    const all_objects = Object.keys(Diseases).map((key) => {
      const array1 = Diseases[key];
      const commonSymptoms = possible_disease_function(array1, symptoms);
      const possibility = ((commonSymptoms.length / array1.length) * 100).toFixed(2);

      return {
        name: key,
        possibility,
        disease_symptom: Diseases[key],
        symptom_user_has: commonSymptoms,
      };
    });

    setDiseaseWithPossibility(all_objects);
    props.getPossibleDisease(all_objects, symptoms);
  };

  // Set the state "searched" according to the input
  const getInputSymptoms = (e) => {
    setSearched(e.target.value);
  };

  // Reset button event
  const onClickResetButton = () => {
    setUserSymptoms([]);
    setDiseaseWithPossibility([]);
    get_possible_disease([]);
  };

  // Handle key down event
  const keyDownEvent = (e) => {
    const re = new RegExp(
      e.target.value.split("").join("\\w*").replace(/\W/, ""),
      "i"
    );
    const symps = Symptoms.filter((each) => each.match(re));

    if (e.key === "Enter") {
      symps.forEach((key) => {
        if (
          !userSymptoms.includes(key) &&
          e.target.value.toLowerCase() === key.toLowerCase()
        ) {
          setUserSymptoms((prevSymptoms) => {
            const newSymptoms = [...prevSymptoms, key];
            get_possible_disease(newSymptoms);
            return newSymptoms;
          });
        } else if (!userSymptoms.includes(e.target.value)) {
          for (let i = 0; i < symps.length; i++) {
            if (!userSymptoms.includes(symps[i])) {
              setUserSymptoms((prevSymptoms) => {
                const newSymptoms = [...prevSymptoms, symps[i]];
                get_possible_disease(newSymptoms);
                return newSymptoms;
              });
              break;
            }
          }
        }
      });
    }
  };

  return (
    <SymptomList
      user_symptoms={userSymptoms}
      addSymptom={addSymptomButtonEvent}
      deleteSymptom={deleteSymptomButtonEvent}
      getInputSymptoms={getInputSymptoms}
      keyDownEvent={keyDownEvent}
      onClickReset={onClickResetButton}
      searched={searched}
    />
  );
};

export default Symptom;

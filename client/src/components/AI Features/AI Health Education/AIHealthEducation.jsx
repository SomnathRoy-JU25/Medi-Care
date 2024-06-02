import React, { useState } from "react";
import Layout from "../../Common/Layout";
import { Select, Button } from "antd";
import axios from "axios";
import { AIEndpoints } from "../../../services/apis";
import useSelection from "antd/es/table/hooks/useSelection";
import { toast } from "react-hot-toast";
const { PREDICT_DISEASE } = AIEndpoints;
const AIHealthEducation = () => {
  //let selections=[]
  //let predictedDisease
  const { token } = useSelection((state) => state.auth);
  const [selections, setSelections] = useState([]);
  const [predictedDisease, setPredictedDisease] = useState("");
  const symptoms = [
        'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity',
        'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue',
        'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy',
        'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating',
        'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite',
        'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine',
        'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes',
        'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure',
        'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements',
        'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising',
        'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
        'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech',
        'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness',
        'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell',
        'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching',
        'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body',
        'belly_pain', 'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite',
        'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances',
        'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen',
        'history_of_alcohol_consumption', 'fluid_overload.0', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations',
        'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting',
        'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze'
  ];
  const getResult = async () => {
    try {
      const res = await axios.post(
        PREDICT_DISEASE,
        { selections },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setPredictedDisease(res.data.result.predictedDisease);
        console.log(`predicted disease: ${res.data.result.predictedDisease}`);
      } else {
        setPredictedDisease("error in prediction");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const options = symptoms.map((symptom) => ({
    label: symptom,
    value: symptom,
  }));

  const onChange = (value) => {
    setSelections(value);
  };

  const onCancel = () => {
    setPredictedDisease("");
    setSelections([]);
  };
  return (
    <Layout>
      <h1 className="ai-heading text-3xl text-start pl-3 font-bold">AI Disease Predictor</h1>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "40%", margin: "10px" }}
        placeholder="Please select symptoms"
        onChange={onChange}
        options={options}
      />
      <div className="ai-buttons flex flex-row  gap-4 pl-3">
        <Button type="primary" onClick={getResult}>
          Submit
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
      <p className="result text-3xl font-semibold mt-4 justify-between text-center rounded-lg  p-4 text-white ">
       {predictedDisease !== null && ( // Render the Disease paragraph only when predictedDisease is not null
        <p className="result text-3xl font-semibold mt-4 justify-between text-center rounded-lg bg-blue p-4 text-white ">
          Disease : {predictedDisease}
        </p>
      )}
      </p>
    </Layout>
  );
};

export default AIHealthEducation;

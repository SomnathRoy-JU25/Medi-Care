// import React, { useState } from "react";
// import "./Patient.css";

// const Patient2 = ({ callback }) => {
//   const [answers, setAnswers] = useState({
//     question_1: "",
//     question_2: "",
//     question_3: "",
//     question_4: "",
//     question_5: "",
//     question_6: "",
//   });

//   const nextButtonAvailable = () => {
//     const { question_1, question_2, question_3, question_4, question_5, question_6 } = answers;
//     return question_1 && question_2 && question_3 && question_4 && question_5 && question_6
//       ? "Available"
//       : "Not available";
//   };

//   const setObject = () => [
//     { question: "Patient is overweight or obese", answer: answers.question_1 },
//     { question: "Patient smokes cigarettes", answer: answers.question_2 },
//     { question: "Patient has been recently injured", answer: answers.question_3 },
//     { question: "Patient has high cholesterol", answer: answers.question_4 },
//     { question: "Patient has hypertension", answer: answers.question_5 },
//     { question: "Patient has diabetes", answer: answers.question_6 },
//   ];

//   const handleOnChange = (e) => {
//     const { value, className } = e.target;
//     const key = className.split(" ")[1].replace(/_/g, "_");

//     setAnswers((prevAnswers) => {
//       const updatedAnswers = { ...prevAnswers, [key]: value };
//       callback(setObject(updatedAnswers), nextButtonAvailable(updatedAnswers));
//       return updatedAnswers;
//     });
//   };

//   return (
//     <>
//       <div className="statement-container width-full flex-column flex-align-center font-serif">
//         <h2 className="mb-4">Please check all the statements below that apply to you</h2>
//         <p className="text-gray-800">Select one answer in each row</p>
//       </div>
//       <div id="Patient2" className="patient-container grid grid-cols-2 justify-center items-center">
//         {/* First row */}
//         <div className="radioButtonDiv mb-8">
//           <h3 className="mb-2">I am overweight</h3>
//           <form className="usa-form FormElement">
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_1"
//                 onChange={handleOnChange}
//                 id="overweight_Yes"
//                 type="radio"
//                 checked={answers.question_1 === "Yes"}
//                 value={"Yes"}
//                 name="overweight"
//               />
//               <label className="usa-radio__label" htmlFor="overweight_Yes">Yes</label>
//             </div>
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_1"
//                 onChange={handleOnChange}
//                 id="overweight_No"
//                 type="radio"
//                 checked={answers.question_1 === "No"}
//                 value={"No"}
//                 name="overweight"
//               />
//               <label className="usa-radio__label" htmlFor="overweight_No">No</label>
//             </div>
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_1"
//                 onChange={handleOnChange}
//                 id="overweight_doesno"
//                 type="radio"
//                 checked={answers.question_1 === "Patient doesn't know"}
//                 value={"Patient doesn't know"}
//                 name="overweight"
//               />
//               <label className="usa-radio__label" htmlFor="overweight_doesno">I don't know</label>
//             </div>
//           </form>
//         </div>
//         {/* Second row */}
//         <div className="radioButtonDiv mb-8">
//           <h3 className="mb-2">I smoke cigarettes</h3>
//           <form className="usa-form FormElement">
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_2"
//                 onChange={handleOnChange}
//                 id="cigarettes_yes"
//                 type="radio"
//                 checked={answers.question_2 === "Yes"}
//                 value={"Yes"}
//                 name="cigarettes"
//               />
//               <label className="usa-radio__label" htmlFor="cigarettes_yes">Yes</label>
//             </div>
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_2"
//                 onChange={handleOnChange}
//                 id="cigarettes_no"
//                 type="radio"
//                 checked={answers.question_2 === "No"}
//                 value={"No"}
//                 name="cigarettes"
//               />
//               <label className="usa-radio__label" htmlFor="cigarettes_no">No</label>
//             </div>
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_2"
//                 onChange={handleOnChange}
//                 id="cigarettes_doesno"
//                 type="radio"
//                 checked={answers.question_2 === "Patient doesn't know"}
//                 value={"Patient doesn't know"}
//                 name="cigarettes"
//               />
//               <label className="usa-radio__label" htmlFor="cigarettes_doesno">I don't know</label>
//             </div>
//           </form>
//         </div>
//         {/* Third row */}
//         <div className="radioButtonDiv mb-8">
//           <h3 className="mb-2">I have been recently injured</h3>
//           <form className="usa-form FormElement">
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_3"
//                 onChange={handleOnChange}
//                 id="injured_yes"
//                 type="radio"
//                 checked={answers.question_3 === "Yes"}
//                 value={"Yes"}
//                 name="injured"
//               />
//               <label className="usa-radio__label" htmlFor="injured_yes">Yes</label>
//             </div>
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_3"
//                 onChange={handleOnChange}
//                 id="injured_no"
//                 type="radio"
//                 checked={answers.question_3 === "No"}
//                 value={"No"}
//                 name="injured"
//               />
//               <label className="usa-radio__label" htmlFor="injured_no">No</label>
//             </div>
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_3"
//                 onChange={handleOnChange}
//                 id="injured_doesno"
//                 type="radio"
//                 checked={answers.question_3 === "Patient doesn't know"}
//                 value={"Patient doesn't know"}
//                 name="injured"
//               />
//               <label className="usa-radio__label" htmlFor="injured_doesno">I don't know</label>
//             </div>
//           </form>
//         </div>
//         {/* Fourth row */}
//         <div className="radioButtonDiv mb-8">
//           <h3 className="mb-2">I have high cholesterol</h3>
//           <form className="usa-form FormElement">
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_4"
//                 onChange={handleOnChange}
//                 id="cholesterol_yes"
//                 type="radio"
//                 checked={answers.question_4 === "Yes"}
//                 value={"Yes"}
//                 name="cholesterol"
//               />
//               <label className="usa-radio__label" htmlFor="cholesterol_yes">Yes</label>
//             </div>
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_4"
//                 onChange={handleOnChange}
//                 id="cholesterol_no"
//                 type="radio"
//                 checked={answers.question_4 === "No"}
//                 value={"No"}
//                 name="cholesterol"
//               />
//               <label className="usa-radio__label" htmlFor="cholesterol_no">No</label>
//             </div>
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_4"
//                 onChange={handleOnChange}
//                 id="cholesterol_doesno"
//                 type="radio"
//                 checked={answers.question_4 === "Patient doesn't know"}
//                 value={"Patient doesn't know"}
//                 name="cholesterol"
//               />
//               <label className="usa-radio__label" htmlFor="cholesterol_doesno">I don't know</label>
//             </div>
//           </form>
//         </div>
//         {/* Fifth row */}
//         <div className="radioButtonDiv mb-8">
//           <h3 className="mb-2">I have hypertension</h3>
//           <form className="usa-form FormElement">
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_5"
//                 onChange={handleOnChange}
//                 id="hypertension_yes"
//                 type="radio"
//                 checked={answers.question_5 === "Yes"}
//                 value={"Yes"}
//                 name="hypertension"
//               />
//               <label className="usa-radio__label" htmlFor="hypertension_yes">Yes</label>
//             </div>
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_5"
//                 onChange={handleOnChange}
//                 id="hypertension_no"
//                 type="radio"
//                 checked={answers.question_5 === "No"}
//                 value={"No"}
//                 name="hypertension"
//               />
//               <label className="usa-radio__label" htmlFor="hypertension_no">No</label>
//             </div>
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_5"
//                 onChange={handleOnChange}
//                 id="hypertension_doesno"
//                 type="radio"
//                 checked={answers.question_5 === "Patient doesn't know"}
//                 value={"Patient doesn't know"}
//                 name="hypertension"
//               />
//               <label className="usa-radio__label" htmlFor="hypertension_doesno">I don't know</label>
//             </div>
//           </form>
//         </div>
//         {/* Sixth row*/}
//         <div className="radioButtonDiv mb-8">
//           <h3 className="mb-2">I have diabetes</h3>
//           <form className="usa-form FormElement">
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_6"
//                 onChange={handleOnChange}
//                 id="diabetes_yes"
//                 type="radio"
//                 checked={answers.question_6 === "Yes"}
//                 value={"Yes"}
//                 name="diabetes"
//               />
//               <label className="usa-radio__label" htmlFor="diabetes_yes">Yes</label>
//             </div>
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_6"
//                 onChange={handleOnChange}
//                 id="diabetes_no"
//                 type="radio"
//                 checked={answers.question_6 === "No"}
//                 value={"No"}
//                 name="diabetes"
//               />
//               <label className="usa-radio__label" htmlFor="diabetes_no">No</label>
//             </div>
//             <div className="usa-radio margin-x-1">
//               <input
//                 className="usa-radio__input question_6"
//                 onChange={handleOnChange}
//                 id="diabetes_doesno"
//                 type="radio"
//                 checked={answers.question_6 === "Patient doesn't know"}
//                 value={"Patient doesn't know"}
//                 name="diabetes"
//               />
//               <label className="usa-radio__label" htmlFor="diabetes_doesno">I don't know</label>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Patient2;

import React, { Component } from "react";
import "./Patient.css";
class Patient2 extends Component {
  state = {
    question_1: "",
    question_2: "",
    question_3: "",
    question_4: "",
    question_5: "",
    question_6: "",
    next_button_available: "",
    all_answer: [],
  };

  handleOnChange = (e) => {
    let state = this.state;
    let nextButton = () => {
      return state.question_1 !== "" &&
        state.question_2 !== "" &&
        state.question_2 !== "" &&
        state.question_3 !== "" &&
        state.question_4 !== "" &&
        state.question_5 !== "" &&
        state.question_6 !== ""
        ? "Available"
        : "Not available";
    };

    let setObject = () => {
      return [
        {
          question: "Patient is overweight or obese",
          answer: this.state.question_1,
        },
        {
          question: "Patient smokes cigarettes",
          answer: this.state.question_2,
        },
        {
          question: "Patient has been recently injured",
          answer: this.state.question_3,
        },
        {
          question: "Patient has high cholesterol",
          answer: this.state.question_4,
        },
        { question: "Patient has hypertension", answer: this.state.question_5 },
        { question: "Patient has diabetes", answer: this.state.question_6 },
      ];
    };

    switch (e.target.className) {
      case "usa-radio__input I_am_overweight_or_obese":
        this.setState({ question_1: e.target.value }, () => {
          this.props.callback(setObject());
        });
        return this.setState({ all_answer: setObject() });
      case "usa-radio__input I smoke cigarettes":
        this.setState({ question_2: e.target.value }, () => {
          this.props.callback(setObject(), nextButton());
        });
        return this.setState({ all_answer: setObject() });
      case "usa-radio__input I have been recently injured":
        this.setState({ question_3: e.target.value }, () => {
          this.props.callback(setObject(), nextButton());
        });
        return this.setState({ all_answer: setObject() });
      case "usa-radio__input I have high cholesterol":
        this.setState({ question_4: e.target.value }, () => {
          this.props.callback(setObject(), nextButton());
        });
        return this.setState({ all_answer: setObject() });
      case "usa-radio__input I have hypertension":
        console.log(e.target.value);
        this.setState({ question_5: e.target.value }, () => {
          this.props.callback(setObject(), nextButton());
        });
        return this.setState({ all_answer: setObject() });
      case "usa-radio__input I have diabetes":
        this.setState({ question_6: e.target.value }, () => {
          this.props.callback(setObject(), nextButton());
        });
        return this.setState({ all_answer: setObject() });
    }
  };

  render() {
    return (
      <>
        <div className="statement-container width-full flex-column flex-align-center font-serif">
          <h2 className="mb-4">
            Please check all the statements below that apply to you
          </h2>
          <p className="text-gray-800">Select one answer in each row</p>
        </div>
        <div
          id="Patient2"
          className="patient-container grid grid-cols-2 justify-center items-center"
        >
          {/* First row */}
          <div className="radioButtonDiv mb-8">
            <h3 className="mb-2">I am overweight</h3>
            <form className="usa-form FormElement">
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I_am_overweight_or_obese"
                  onChange={this.handleOnChange}
                  id="overweight_Yes"
                  type="radio"
                  checked={this.state.question_1 === "Yes"}
                  value={"Yes"}
                  name="overweight"
                />
                <label className="usa-radio__label" htmlFor="overweight_Yes">
                  Yes
                </label>
              </div>
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I_am_overweight_or_obese"
                  onChange={this.handleOnChange}
                  id="overweight_No"
                  type="radio"
                  checked={this.state.question_1 === "No"}
                  value={"No"}
                  name="overweight"
                />
                <label className="usa-radio__label" htmlFor="overweight_No">
                  No
                </label>
              </div>
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I_am_overweight_or_obese"
                  onChange={this.handleOnChange}
                  id="overweight_doesno"
                  type="radio"
                  checked={this.state.question_1 === "Patient doesn't know"}
                  value={"Patient doesn't know"}
                  name="overweight"
                />
                <label className="usa-radio__label" htmlFor="overweight_doesno">
                  I don't know
                </label>
              </div>
            </form>
          </div>
          {/* Second row */}
          <div className="radioButtonDiv mb-8">
            <h3 className="mb-2">I smoke cigarettes</h3>
            <form className="usa-form FormElement">
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I smoke cigarettes"
                  onChange={this.handleOnChange}
                  id="cigarettes_yes"
                  type="radio"
                  checked={this.state.question_2 === "Yes"}
                  value={"Yes"}
                  name="cigarettes"
                />
                <label className="usa-radio__label" htmlFor="cigarettes_yes">
                  Yes
                </label>
              </div>
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I smoke cigarettes"
                  onChange={this.handleOnChange}
                  id="cigarettes_no"
                  type="radio"
                  checked={this.state.question_2 === "No"}
                  value={"No"}
                  name="cigarettes"
                />
                <label className="usa-radio__label" htmlFor="cigarettes_no">
                  No
                </label>
              </div>
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I smoke cigarettes"
                  onChange={this.handleOnChange}
                  id="cigarettes_doesno"
                  type="radio"
                  checked={this.state.question_2 === "Patient doesn't know"}
                  value={"Patient doesn't know"}
                  name="cigarettes"
                />
                <label className="usa-radio__label" htmlFor="cigarettes_doesno">
                  I don't know
                </label>
              </div>
            </form>
          </div>
          {/* Third row */}
          <div className="radioButtonDiv mb-8">
            <h3 className="mb-2">I have been recently injured</h3>
            <form className="usa-form FormElement">
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I have been recently injured"
                  onChange={this.handleOnChange}
                  id="injured_yes"
                  type="radio"
                  checked={this.state.question_3 === "Yes"}
                  value={"Yes"}
                  name="injured"
                />
                <label className="usa-radio__label" htmlFor="injured_yes">
                  Yes
                </label>
              </div>
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I have been recently injured"
                  onChange={this.handleOnChange}
                  id="injured_no"
                  type="radio"
                  checked={this.state.question_3 === "No"}
                  value={"No"}
                  name="injured"
                />
                <label className="usa-radio__label" htmlFor="injured_no">
                  No
                </label>
              </div>
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I have been recently injured"
                  onChange={this.handleOnChange}
                  id="injured_doesno"
                  type="radio"
                  checked={this.state.question_3 === "Patient doesn't know"}
                  value={"Patient doesn't know"}
                  name="injured"
                />
                <label className="usa-radio__label" htmlFor="injured_doesno">
                  I don't know
                </label>
              </div>
            </form>
          </div>
          {/* Fourth row */}
          <div className="radioButtonDiv mb-8">
            <h3 className="mb-2">I have high cholesterol</h3>
            <form className="usa-form FormElement">
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I have high cholesterol"
                  onChange={this.handleOnChange}
                  id="cholesterol_yes"
                  type="radio"
                  checked={this.state.question_4 === "Yes"}
                  value={"Yes"}
                  name="cholesterol"
                />
                <label className="usa-radio__label" htmlFor="cholesterol_yes">
                  Yes
                </label>
              </div>
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I have high cholesterol"
                  onChange={this.handleOnChange}
                  id="cholesterol_no"
                  type="radio"
                  checked={this.state.question_4 === "No"}
                  value={"No"}
                  name="cholesterol"
                />
                <label className="usa-radio__label" htmlFor="cholesterol_no">
                  No
                </label>
              </div>
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I have high cholesterol"
                  onChange={this.handleOnChange}
                  id="cholesterol_doesno"
                  type="radio"
                  checked={this.state.question_4 === "Patient doesn't know"}
                  value={"Patient doesn't know"}
                  name="cholesterol"
                />
                <label
                  className="usa-radio__label"
                  htmlFor="cholesterol_doesno"
                >
                  I don't know
                </label>
              </div>
            </form>
          </div>
          {/* Fifth row */}
          <div className="radioButtonDiv mb-8">
            <h3 className="mb-2">I have hypertension</h3>
            <form className="usa-form FormElement">
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I have hypertension"
                  onChange={this.handleOnChange}
                  id="hypertension_yes"
                  type="radio"
                  checked={this.state.question_5 === "Yes"}
                  value={"Yes"}
                  name="hypertension"
                />
                <label className="usa-radio__label" htmlFor="hypertension_yes">
                  Yes
                </label>
              </div>
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I have hypertension"
                  onChange={this.handleOnChange}
                  id="hypertension_no"
                  type="radio"
                  checked={this.state.question_5 === "No"}
                  value={"No"}
                  name="hypertension"
                />
                <label className="usa-radio__label" htmlFor="hypertension_no">
                  No
                </label>
              </div>
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I have hypertension"
                  onChange={this.handleOnChange}
                  id="hypertension_doesno"
                  type="radio"
                  checked={this.state.question_5 === "Patient doesn't know"}
                  value={"Patient doesn't know"}
                  name="hypertension"
                />
                <label
                  className="usa-radio__label"
                  htmlFor="hypertension_doesno"
                >
                  I don't know
                </label>
              </div>
            </form>
          </div>
          {/* Sixth row*/}
          <div className="radioButtonDiv mb-8">
            <h3 className="mb-2">I have diabetes</h3>
            <form className="usa-form FormElement">
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I have diabetes"
                  onChange={this.handleOnChange}
                  id="diabetes_yes"
                  type="radio"
                  checked={this.state.question_6 === "Yes"}
                  value={"Yes"}
                  name="diabetes"
                />
                <label className="usa-radio__label" htmlFor="diabetes_yes">
                  Yes
                </label>
              </div>
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I have diabetes"
                  onChange={this.handleOnChange}
                  id="diabetes_no"
                  type="radio"
                  checked={this.state.question_6 === "No"}
                  value={"No"}
                  name="diabetes"
                />
                <label className="usa-radio__label" htmlFor="diabetes_no">
                  No
                </label>
              </div>
              <div className="usa-radio margin-x-1">
                <input
                  className="usa-radio__input I have diabetes"
                  onChange={this.handleOnChange}
                  id="diabetes_doesno"
                  type="radio"
                  checked={this.state.question_6 === "Patient doesn't know"}
                  value={"Patient doesn't know"}
                  name="diabetes"
                />
                <label className="usa-radio__label" htmlFor="diabetes_doesno">
                  I don't know
                </label>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Patient2;
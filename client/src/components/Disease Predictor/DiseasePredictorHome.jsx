import React, { useState, useRef } from "react";
import "./HomePage.css";
import Home from "./Home/Home";
import Patient from "./Patient/Patient1";
import Patient2 from "./Patient/Patient2";
import Symptom from "./Symptom/Symptom";
import Disease from "./Disease/Disease";

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

  const showPage = () => {
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
            ref={symptomPage}
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
    }
  };

  return (
    <React.Fragment>
      <main id="main-content">
        <div className="grid-container padding-bottom-4">
          <div className="grid-row padding-4">
            <div className="desktop:grid-col-2">
              <ul className="side-menu-list padding-left-2">
                <li id="progressbar">
                  <div
                    className={`${
                      tabProgress === 25 && "progressbardiv25"
                    } ${tabProgress === 50 && "progressbardiv50"} ${
                      tabProgress === 75 && "progressbardiv75"
                    } ${tabProgress === 100 && "progressbardiv100"}`}
                  ></div>
                </li>
                <li className={`${currentPage === "Home" ? "active" : "done"}`}>Welcome</li>
                <li
                  className={`${tabProgress === 50 && "active"} ${
                    tabProgress < 50 && "list"
                  } ${tabProgress > 50 && "done"}`}
                >
                  Patient
                </li>
                <li
                  className={`${tabProgress === 75 && "active"} ${
                    tabProgress < 75 && "list"
                  } ${tabProgress > 75 && "done"}`}
                >
                  Symptom
                </li>
                <li
                  className={`${tabProgress === 100 && "active"} ${
                    tabProgress < 100 && "list"
                  } ${tabProgress > 100 && "done"}`}
                >
                  Disease
                </li>
              </ul>
            </div>
            <div className="col-span-10 pb-12" id="ContentDiv">
              <div className="grid grid-cols-1 gap-4 pb-16">{showPage()}</div>
            </div>
            <div className="col-span-12 ml-6">
              <div id="buttonsSection" className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 pt-2">
                <button
                  disabled={currentPage === "Home"}
                  onClick={getPreviousPage}
                  className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                <button
                  className={`py-2 px-4 rounded ${
                    buttonIsDisabled || patient2NextButtonDisabled || userSymptomLength === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-900"
                  }`}
                  disabled={buttonIsDisabled || patient2NextButtonDisabled || userSymptomLength === 0}
                  type="submit"
                  onClick={getNextPage}
                >
                  {buttonName}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default DiseasePredictorPage;


// import React, { Component } from "react";
// import "./HomePage.css";
// import Home from "./Home/Home";
// import Patient from "./Patient/Patient1";
// import Patient2 from "./Patient/Patient2";
// import Symptom from "./Symptom/Symptom";
// import Disease from "./Disease/Disease";

// class DiseasePredictorPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       current_page: "Home", // Name of the current component
//       tab_name: "Welcome",
//       tab_progress: 25,
//       button_is_disabled: true, // Next button disabled if not agreed to terms
//       home_button_checked: false, //Check if terms are agreed
//       age: "18", //Patient Default Age
//       button_name: "Next", //Button name retry or next
//       gender: "Male", //Default gender
//       male: true, // patient checkbox
//       female: false, // patient checkbox
//       home_nav_icon: <p>1</p>,
//       patient_nav_icon: <p>2</p>,
//       symptom_nav_icon: <p>3</p>,
//       disease_nav_icon: <p>4</p>,
//       patient_question: [],
//       patient_2_next_button_disabled: "",
//       home_nav_value: false,
//       patient_nav_value: false,
//       symptom_nav_value: false,
//       disease_nav_value: false,
//       disease_possibility: [],
//       user_symptoms: [],
//       user_symptom_length: "",
//     };
//     this.symptomPage = React.createRef();
//   }

//   home_button_check_event = (e) => {
//     // console.log("Event Called");
//     if (e.target.checked === true) {
//       return this.setState({
//         button_is_disabled: false,
//         home_button_checked: true,
//         home_nav_value: true,
//         patient_nav_value: true,
//       });
//     } else if (e.target.checked === false) {
//       return this.setState({
//         button_is_disabled: true,
//         home_button_checked: false,
//         home_nav_value: false,
//         patient_nav_value: false,
//       });
//     }
//   };

//   get_next_page = (e) => {
//     // eslint-disable-next-line default-case
//     switch (this.state.current_page) {
//       case "Home":
//         return this.setState({
//           current_page: "Patient",
//           tab_progress: 50,
//           // home_nav_icon: <CheckIcon className={"check-icon"} style={{ color: "white!important" }} />,
//           home_nav_value: true,
//           button_is_disabled: false,
//           home_button_checked: false,
//         });
//       case "Patient":
//         return this.setState({
//           current_page: "Patient-2",

//           button_name: "Next",
//           patient_2_next_button_disabled: true,
//         });
//       case "Patient-2":
//         return this.setState({
//           current_page: "Symptom",
//           tab_progress: 75,
//           button_name: "Finish",

//           // patient_nav_icon: <CheckIcon className={"check-icon"} style={{ color: "white!important" }} />,
//           patient_nav_value: true,
//           user_symptom_length: 0,
//         });
//       case "Symptom":
//         return this.setState({
//           current_page: "Disease",
//           button_name: "Retry",
//           tab_progress: 100,
//           // symptom_nav_icon: <CheckIcon className={"check-icon"} style={{ color: "white!important" }} />,
//           // disease_nav_icon: <CheckIcon className={"check-icon"} style={{ color: "white!important" }} />,
//           symptom_nav_value: true,
//           disease_nav_value: true,
//         });
//       case "Disease":
//         return this.setState({
//           tab_progress: 25,
//           current_page: "Home", // Name of the current component
//           button_is_disabled: true, // Next button disabled if not agreed to terms
//           home_button_checked: false, //Check if terms are agreed
//           age: "18", //Patient Default Age
//           button_name: "Next", //Button name retry or next
//           gender: "Male", //Default gender
//           male: true, // patient checkbox
//           female: false, // patient checkbox
//           home_nav_icon: <p>1</p>,
//           patient_nav_icon: <p>2</p>,
//           symptom_nav_icon: <p>3</p>,
//           disease_nav_icon: <p>4</p>,
//           patient_question: [],
//           patient_2_next_button_disabled: "",
//           home_nav_value: false,
//           patient_nav_value: false,
//           symptom_nav_value: false,
//           disease_nav_value: false,
//           disease_possibility: [],
//           user_symptoms: [],
//           user_symptom_length: "",
//         });
//     }
//   };
//   get_gender = (e) => {
//     // console.log("slf", e.target.value);
//     if (e.target.value === "male") {
//       this.setState({
//         male: true,
//         female: false,
//         gender: "Male",
//       });
//     } else if (e.target.value === "female") {
//       this.setState({
//         male: false,
//         female: true,
//         gender: "Female",
//       });
//     }
//   };
//   get_age_event = (e) => {
//     this.setState({ age: e.target.value });
//   };
//   symptomInfoCallback = (data, data2) => {
//     this.setState({
//       disease_possibility: data,
//       user_symptoms: data2,
//       user_symptom_length: data2.length,
//     });
//   };

//   patient_2_callback = (data) => {
//     let d = data.filter((key) => {
//       return key.answer !== "";
//     });
//     let avl = data.length !== d.length;
//     this.setState({
//       patient_question: data,
//       patient_2_next_button_disabled: avl,
//       symptom_nav_value: true,
//     });
//   };
//   home_button_check_event = (e) => {
//     if (e.target.checked === true) {
//       return this.setState({
//         button_is_disabled: false,
//         home_button_checked: true,
//         home_nav_value: true,
//         patient_nav_value: true,
//       });
//     } else if (e.target.checked === false) {
//       return this.setState({
//         button_is_disabled: true,
//         home_button_checked: false,
//         home_nav_value: false,
//         patient_nav_value: false,
//       });
//     }
//   };
//   handleResetClick = () => {};
//   get_previous_page = (e) => {
//     // eslint-disable-next-line default-case
//     switch (this.state.current_page) {
//       case "Disease":
//         return this.setState({
//           current_page: "Symptom",
//           button_name: "Finish",
//           tab_progress: 75,
//           disease_nav_value: false,
//           user_symptom_length: this.state.user_symptoms.length,
//         });
//       case "Symptom":
//         return this.setState({
//           current_page: "Patient-2",
//           symptom_page_button: "",
//           tab_progress: 50,
//           button_name: "Next",
//           patient_nav_value: false,
//           patient_2_next_button_disabled: true,
//           disease_possibility: [],
//           user_symptoms: [],
//         });
//       case "Patient-2":
//         return this.setState({
//           current_page: "Patient",
//           patient_2_next_button_disabled: false,
//         });
//       case "Patient":
//         return this.setState({
//           current_page: "Home",
//           home_nav_icon: <p>1</p>,
//           home_nav_value: false,
//           button_is_disabled: true,
//           home_button_checked: false,
//           tab_progress: 25,
//           user_symptom_length: 1,
//         });
//     }
//   };
//   showPage = (e) => {
//     const { current_page, home_button_checked, age, male, female } = this.state;
//     // eslint-disable-next-line default-case
//     switch (current_page) {
//       case "Home":
//         return (
//           <Home
//             isChecked={home_button_checked}
//             checked={this.home_button_check_event}
//           />
//         );
//       case "Patient":
//         return (
//           <Patient
//             male={male}
//             female={female}
//             gender={this.get_gender}
//             age={age}
//             ageChange={this.get_age_event}
//           />
//         );
//       case "Patient-2":
//         return <Patient2 callback={this.patient_2_callback} />;
//       case "Symptom":
//         return (
//           <Symptom
//             ref={this.symptomPage}
//             userSymptoms={this.state.user_symptoms}
//             diseasePossibility={this.state.disease_possibility}
//             getPossibleDisease={this.symptomInfoCallback}
//             pageCallback={this.symptom_page_button_callback}
//           />
//         );
//       case "Disease":
//         return (
//           <Disease
//             patientInfo={this.state.patient_question}
//             disease_with_possibility={this.state.disease_possibility}
//             gender={this.state.gender}
//             age={this.state.age}
//           />
//         );
//     }
//   };
//   // renderResetButton = () => {
//   //   return (
//   //     <button
//   //       className="usa-button usa-button--secondary"
//   //       onClick={this.symptomPage.current}
//   //     >
//   //       Reset
//   //     </button>
//   //   );
//   // };
//   render() {
//     const {
//       tab_progress,
//       button_is_disabled,
//       patient_2_next_button_disabled,
//       user_symptom_length,
//       current_page,
//     } = this.state;
//     return (
//       <React.Fragment>
//         <main id="main-content">
//           <div className="grid-container padding-bottom-4">
//             <div className="grid-row padding-4">
//               <div className="desktop:grid-col-2">
//                 <ul className="side-menu-list padding-left-2">
//                   <li id="progressbar">
//                     <div
//                       className={`${
//                         tab_progress === 25 && "progressbardiv25"
//                       } ${tab_progress === 50 && "progressbardiv50"} ${
//                         tab_progress === 75 && "progressbardiv75"
//                       } ${tab_progress === 100 && "progressbardiv100"}`}
//                     ></div>
//                   </li>
//                   <li
//                     className={`${current_page === "Home" ? "active" : "done"}`}
//                   >
//                     Welcome
//                   </li>
//                   <li
//                     className={`${tab_progress === 50 && "active"} ${
//                       tab_progress < 50 && "list"
//                     } ${tab_progress > 50 && "done"}`}
//                   >
//                     Patient
//                   </li>
//                   <li
//                     className={`${tab_progress === 75 && "active"} ${
//                       tab_progress < 75 && "list"
//                     } ${tab_progress > 75 && "done"}`}
//                   >
//                     Symptom
//                   </li>
//                   <li
//                     className={`${tab_progress === 100 && "active"} ${
//                       tab_progress < 100 && "list"
//                     } ${tab_progress > 100 && "done"}`}
//                   >
//                     Disease
//                   </li>
//                 </ul>
//               </div>
//               <div className="col-span-10 pb-12" id="ContentDiv">
//                 <div className="grid grid-cols-1 gap-4 pb-16">
//                   {this.showPage()}
//                 </div>
//               </div>
//               <div className="col-span-12 ml-6">
//                 <div
//                   id="buttonsSection"
//                   className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 pt-2"
//                 >
//                   <button
//                     disabled={this.state.current_page === "Home"}
//                     onClick={this.get_previous_page}
//                     className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Back
//                   </button>
//                   {/* {current_page === "Symptom" && this.renderResetButton()} */}
//                   {current_page === "Symptom" }

//                   <button
//                     className={`py-2 px-4 rounded ${
//                       button_is_disabled ||
//                       patient_2_next_button_disabled ||
//                       user_symptom_length === 0
//                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                         : "bg-purple-600 text-white hover:bg-purple-900"
//                     }`}
//                     disabled={
//                       button_is_disabled ||
//                       patient_2_next_button_disabled ||
//                       user_symptom_length === 0
//                     }
//                     type="submit"
//                     onClick={this.get_next_page}
//                   >
//                     {this.state.button_name}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </React.Fragment>
//     );
//   }
// }

// export default DiseasePredictorPage;

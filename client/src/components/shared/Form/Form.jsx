import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
              website
            );
        }}
      >
        <h1 className="text-center text-3xl font-bold mb-4">{formTitle}</h1>
        <hr className="mb-4" />
        <div className="flex flex-row mb-4">
          <div className="flex items-center mr-4">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-indigo-600"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="ml-2 text-gray-700">
              Donar
            </label>
          </div>
          <div className="flex items-center mr-4">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-indigo-600"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="ml-2 text-gray-700">
              Admin
            </label>
          </div>
          <div className="flex items-center mr-4">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-indigo-600"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="ml-2 text-gray-700">
              Hospital
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-indigo-600"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="ml-2 text-gray-700">
              Organisation
            </label>
          </div>
        </div>
        {/* switch statement */}
        {(() => {
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType
                      labelText={"Name"}
                      labelFor={"forName"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelText={"Organisation Name"}
                      labelFor={"forOrganisationName"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name"}
                      labelFor={"forHospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}

                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputType
                    labelText={"Website"}
                    labelFor={"forWebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}

        <div className="flex justify-between items-center">
          {formType === "login" ? (
            <p>
              Not registered yet? Register
              <Link
                to="/register"
                className="text-purple-500 hover:text-purple-700 hover:font-bold ml-1"
              >
                Here!
              </Link>
            </p>
          ) : (
            <p>
              Already a user? Please
              <Link
                to="/login"
                className="text-purple-500 hover:text-purple-700 hover:font-bold ml-1"
              >
                Login!
              </Link>
            </p>
          )}
          <button
            className="bg-purple-500 hover:bg-purple-800 font-md hover:font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

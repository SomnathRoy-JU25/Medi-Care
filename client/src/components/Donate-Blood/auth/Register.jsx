import React from "react";
import Form from "../../shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
          <div className="md:w-1/2 p-4">
            {loading ? (
              <Spinner />
            ) : (
              <img src="./assets/images/banner2.jpg" alt="registerImage" className="w-full rounded-lg shadow-md" />
            )}
          </div>
          <div className="md:w-1/2 p-4 pt-5">
            <Form
              formTitle={"Register"}
              submitBtn={"Register"}
              formType={"register"}
            />
            {error && <span className="text-red-500">{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

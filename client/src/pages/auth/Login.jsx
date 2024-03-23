import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import BloodNavbar from "./BloodNavbar";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  
  return (
    <div className="min-h-screen flex flex-col">
      <BloodNavbar />
      <div className="flex-grow flex items-center justify-center">
        {error && <span className="text-red-500">{alert(error)}</span>}
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
            <div className="md:w-1/2 p-4">
              <img src="./assets/images/banner1.jpg" alt="loginImage" className="w-full rounded-lg shadow-md" />
            </div>
            <div className="md:w-1/2 p-4">
              <Form
                formTitle={"Login Page"}
                submitBtn={"Login"}
                formType={"login"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

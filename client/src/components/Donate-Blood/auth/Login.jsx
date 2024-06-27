import React from "react";
import Form from "../shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../shared/Spinner";
import { userLogin } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react";
import { BsLightningChargeFill } from "react-icons/bs"
import { TbCornerDownRightDouble } from "react-icons/tb"

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [showDemo, setShowDemo] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`${
          showDemo ? "" : "hidden"
        } absolute right-[10%] top-52 z-20 -rotate-[20deg] items-center justify-center bg-slate-500
        p-6 md:right-[45%] md:top-36 `}
      >
        <div className="relative flex flex-col gap-2">
          <div
            onClick={() => {
              setShowDemo(false);
            }}
            className="absolute right-[-20px] top-[-30px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full text-5xl text-richblack-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="20"
              height="20"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="#888888"
                stroke="#000000"
                stroke-width="2"
              />
              <circle cx="50" cy="50" r="20" fill="#ffffff" />
            </svg>
          </div>
          <div className=" flex flex-col gap-y-2">
            <p className="flex items-center text-2xl font-extrabold text-gray-100">
              Take a Demo &nbsp;{" "}
              <BsLightningChargeFill size={25} color="yellow" />
            </p>
            <div>
              <button
                onClick={() => {
                  dispatch(userLogin("donar","albiyaroy123@gmail.com", "123456", navigate));
                }}
                className="mb-1 mt-4 flex rounded-md bg-yellow-100 px-4 py-2 font-bold text-gray-900 hover:scale-95 transition-all duration-300"
              >
                <TbCornerDownRightDouble className="hidden text-2xl text-richblack-900 md:block" />
                Click here for Donor Demo
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch(userLogin("admin","mrbossroy2003@gmail.com", "1234", navigate));
                }}
                className="flex rounded-md bg-yellow-100 px-4 py-2 font-bold text-gray-900 hover:scale-95 transition-all duration-300"
              >
                <TbCornerDownRightDouble className="hidden text-2xl text-richblack-900 md:block" />
                Click here for Admin Demo
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch(userLogin("hospital","somnathroy0340@gmail.com", "1234", navigate));
                }}
                className="flex rounded-md bg-yellow-100 px-4 py-2 font-bold text-gray-900 hover:scale-95 transition-all duration-300"
              >
                <TbCornerDownRightDouble className="hidden text-2xl text-richblack-900 md:block" />
                Click here for Hospital Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          {error && <span className="text-red-500">{alert(error)}</span>}
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
              <div className="md:w-1/2 p-4">
                <img
                  src="./assets/images/banner1.jpg"
                  alt="loginImage"
                  className="w-full rounded-lg shadow-md"
                />
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
    </>
  );
};

export default Login;

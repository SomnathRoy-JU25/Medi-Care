import { useState } from "react"
import { BsLightningChargeFill } from "react-icons/bs"
import { TbCornerDownRightDouble } from "react-icons/tb"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import loginImg from "../assets/images/login.jpg"
import Template from "../components/Auth/Template"
// import { login } from "../services/operations/authAPI"

function Login() {
  const [showDemo, setShowDemo] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>

      {/* test login ID */}
      {/* <div
        className={`${
          showDemo ? "" : "hidden"
        } absolute right-[10%] top-52 z-20 -rotate-[20deg] items-center justify-center bg-richblack-400 p-6 md:right-[50%] md:top-32 `}
      >
        <div className="relative flex flex-col gap-2">
          <div
            onClick={() => {
              setShowDemo(false)
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
            <p className="flex items-center text-2xl font-extrabold text-richblack-5">
              Take a Demo &nbsp; <BsLightningChargeFill size={20} />
            </p>
            <div>
              <button
                onClick={() => {
                  dispatch(login("somnathroy9564@gmail.com", "1234", navigate))
                }}
                className="mb-1 mt-4 flex rounded-md bg-yellow-100 px-4 py-2 font-semibold text-richblack-900"
              >
                <TbCornerDownRightDouble className="hidden text-2xl text-richblack-900 md:block" />
                Click here for Instructor Demo
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch(login("somnathroy0340@gmail.com", "1234", navigate))
                }}
                className="flex rounded-md bg-yellow-100 px-4 py-2 font-semibold text-richblack-900"
              >
                <TbCornerDownRightDouble className="hidden text-2xl text-richblack-900 md:block" />
                Click here for Student Demo
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <Template
        title="Welcome Back"
        description1="Welcome back to MediCare. Log in to access your personalized healthcare experience."
        // description2="Your Health is in your hand."
        image={loginImg}
        formType="login"
      />
    </>
  )
}

export default Login

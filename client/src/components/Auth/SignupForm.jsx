import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signUp } from "../../services/operations/authAPI";
import { ACCOUNT_TYPE } from "../../utils/constants";
import Tab from "../../components/Common/Tab";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../contexts/AuthProvider";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.USER);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const { signUpWithGmail} = useContext(AuthContext); 

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        navigate
      )
    );

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setAccountType(ACCOUNT_TYPE.USER);
  };

  const tabData = [
    {
      id: 1,
      tabName: "User",
      type: ACCOUNT_TYPE.USER,
    },
    {
      id: 2,
      tabName: "Doctor",
      type: ACCOUNT_TYPE.DOCTOR,
    },
  ];

  const handleRegister = () => {
    signUpWithGmail().then((result) =>{
      const user = result.user;
      console.log(user);
      toast.success("Login Successful");
      navigate("/login2")
    }).catch((error) =>{
      console.log(error);
    })
  };

  return (
    <div className="container mx-auto p-8">
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={handleOnSubmit} className="max-w-md mx-auto mt-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="firstName" className="text-gray-700 font-semibold">First Name <sup className="text-red-600">*</sup></label>
          <input
            required
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleOnChange}
            placeholder="Enter your first name"
            className="input-style"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="lastName" className="text-gray-700 font-semibold">Last Name <sup className="text-red-600">*</sup></label>
          <input
            required
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleOnChange}
            placeholder="Enter your last name"
            className="input-style"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-gray-700 font-semibold">Email Address <sup className="text-red-600">*</sup></label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter your email address"
            className="input-style"
          />
        </div>
        <div className="flex flex-col space-y-2 relative">
          <label htmlFor="password" className="text-gray-700 font-semibold">Create Password <sup className="text-red-600">*</sup></label>
          <input
            required
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter your password"
            className="input-style pr-10"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[50%] transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="text-gray-500" fontSize={24} />
            ) : (
              <AiOutlineEye className="text-gray-500" fontSize={24} />
            )}
          </span>
        </div>
        <div className="flex flex-col space-y-2 relative">
          <label htmlFor="confirmPassword" className="text-gray-700 font-semibold">Confirm Password <sup className="text-red-600">*</sup></label>
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm your password"
            className="input-style pr-10"
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[50%] transform -translate-y-1/2 cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible className="text-gray-500" fontSize={24} />
            ) : (
              <AiOutlineEye className="text-gray-500" fontSize={24} />
            )}
          </span>
        </div>
        <button
          type="submit"
          className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-blue hover:text-white focus:bg-gray-100 focus:text-black focus:outline-none"
        >
          Create Account
        </button>
      </form>
      <button
          type="submit"
          onClick={handleRegister}
          className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
        ><span className="mr-2 inline-block text-blue"><FcGoogle /></span>
           Sign up with Google
        </button>
    </div>
  );
}

export default SignupForm;

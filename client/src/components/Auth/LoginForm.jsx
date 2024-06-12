import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../services/operations/authAPI";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const { signUpWithGmail } = useContext(AuthContext);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Login Successful");
        dispatch(setToken(user.accessToken));
        const userImage = user?.photoURL
          ? user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${
              user?.displayName.split("")[0]
            } ${user?.displayName.split(" ")[1]}`;
        dispatch(
          setUser({
            displayName: user.displayName,
            image: user?.photoURL,
            email: user.email,
            accountType: user.accountType || "User", // Set accountType to "USER" by default if not available
            isDoctor: false,
            isAdmin: false,
            notification: [0],
            seennotification: [],
            // uid : user.uid
          })
        );
        console.log(user.accessToken); // Accessing accessToken from stsTokenManager
        localStorage.setItem("token", JSON.stringify(user.accessToken)); // Saving accessToken from stsTokenManager
        localStorage.setItem(
          "user",
          JSON.stringify({
            displayName: user.displayName,
            image: user.photoURL,
            email: user.email,
            accountType: user.accountType || "User",
          }) // Adjusted saving displayName and image
        );
        navigate("/dashboard/my-profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="gap-y-4">
        <form onSubmit={handleOnSubmit} className="flex w-full flex-col">
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-purple-500">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="input-style w-full h-10 rounded-lg p-2 
              border-b border-slate-700 hover:border-purple-500 focus:border-purple-500"
            />
          </label>

          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-purple-500">
              Password <sup className="text-pink-200">*</sup>
            </p>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="input-style w-full h-10 rounded-lg p-2 
                border-b border-slate-700 hover:border-purple-500 focus:border-purple-500"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            <Link
              to="/forgot-password"
              className="mt-1 ml-auto max-w-max text-xs text-blue-500"
            >
              Forgot Password
            </Link>
          </label>

          <button
            type="submit"
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 
             hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none
             hover:scale-95 transition-all duration-300"
          >
            Sign In
          </button>
        </form>
        <div className="gap-y-4">
          <button
            type="submit"
            onClick={handleRegister}
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700  hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black 
            focus:outline-none hover:scale-95 transition-all duration-300"
          >
            <span className="mr-2 inline-block text-blue">
              <FcGoogle />
            </span>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

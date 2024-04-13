import { toast } from "react-hot-toast";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { setLoading, setToken } from "../../redux/features/auth/authSlice"
// import { setUser } from "../../redux/features/auth/profileSlice"

import { setLoading, setToken} from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import API from "../API"

const {
  // SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  SIGNUP_API_DONATE_BLOOD,
  LOGIN_API_DONATE_BLOOD,
  GET_USER_API,
} = endpoints;

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login2");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token)); // slice set token
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      dispatch(setUser({ ...response.data.user, image: userImage }));
      console.log(response.data.token);
      localStorage.setItem("token", JSON.stringify(response.data.token)); // Refresh hole sob ure na jayega
      localStorage.setItem("user", JSON.stringify({ ...response.data.user, image: userImage }));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESETPASSTOKEN RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error);
      toast.error("Failed To Send Reset Email");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      console.log("RESETPASSWORD RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Reset Successfully");
      navigate("/login");
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error);
      toast.error("Failed To Reset Password");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out", { duration: 2000 });
    navigate("/");
  };
}

export function userLogin(role, email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const {data} = await apiConnector("POST", LOGIN_API_DONATE_BLOOD, {
        role,
        email,
        password,
      });
      // const { data } = await API.post("/auth/login", { role, email, password });
      if (!data.success) {
        return toast.error(data.message);
      }
      toast.success("Login Successful", { duration: 1000 });  
      // Assuming the user data is in data.usermodel
      dispatch(setUser({...data.usermodel}));
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ ...data}));
      navigate("/home");
      setTimeout(() => {
        window.location.reload();
      }, 400);
      return data;
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    } finally {
      // Dismiss the loading toast regardless of success or failure
      toast.dismiss(toastId);
    }
    dispatch(setLoading(false));
  };
}

// export const userLogin = createAsyncThunk(
//   "auth/login",
//   async ({ role, email, password}) => {
//     // const dispatch = useDispatch();
//     try {
//       const { data } = await API.post("/auth/login", { role, email, password });
//       if (!data.success) {
//         return toast.error(data.message);
//       }
//       toast.success("Login Successful", { duration: 1000 });
//       // dispatch(setUser({data}));
//       dispatch(setUser(data));
//       localStorage.setItem("token", data.token);
//       // Simulate a delay before redirecting
//       setTimeout(() => {
//         window.location.replace("/home");
//       }, 400); // Redirect after some time 
//       return data;
//     } catch (error) {
//       return toast.error(error.message);
//     }
//   }
// );


export function userRegister(
  name,
  role,
  email,
  password,
  phone,
  organisationName,
  address,
  hospitalName,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API_DONATE_BLOOD, {
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/login");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export const getCurrentUser = async () => {
  try {
    const res = await API.get("/auth/current-user");
    toast.success("User data fetched");
    return res.data;
  } catch (error) {
    toast.error(error.message);
    throw error; // Rethrow the error so that the caller can handle it appropriately
  }
};

// export const getCurrentUser = createAsyncThunk(
//   "auth/getCurrentUser",
//   async () => {
//     try {
//       const res = await API.get("/auth/current-user");
//       toast.success("User data fetched");
//       return res.data;
//     } catch (error) {
//       return toast.error(error.message);
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-hot-toast";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      if (!data.success) {
        return toast.error(data.message);
      }
      toast.success("Login Successful", { duration: 2000 });
      localStorage.setItem("token", data.token);
      // Simulate a delay before redirecting
      setTimeout(() => {
        window.location.replace("/home");
      }, 400); // Redirect after some time 
      return data;
    } catch (error) {
      return toast.error(error.message);
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      phone,
      organisationName,
      address,
      hospitalName,
      // website,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        // website,
      });
      if (data.success) {
        toast.success("User Registered Successfully",{duration:2000});
        // window.location.replace("/login");
        setTimeout(() => {
          window.location.replace("/login");
        }, 600); // Redirect after some time 
      }
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_,) => {
    try {
      const res = await API.get("/auth/current-user");
      toast.success("User data fetched");
      return res.data;
    } catch (error) {
      return toast.error(error.message);
    }
  }
);

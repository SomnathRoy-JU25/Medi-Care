import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.profile);
  if (
    (user !== null && (user.accountType === "User" || user.accountType === "Doctor")))
   {
    return children;
  }
  else if(
    user !== null &&
    (user?.user.role === "admin" ||
      user?.user.role === "donar" ||
      user?.user.role === "hospital")
  ) {
    return <Navigate to="/home" />;
  }
  else {
    return children;
  }
};

export default PublicRoute;

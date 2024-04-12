import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.profile);
  if (
    (user === null ) && ( localStorage.getItem("token"))
  ) {
    return <Navigate to="/home" />;
  } else {
    return children;
  }
};

export default PublicRoute;

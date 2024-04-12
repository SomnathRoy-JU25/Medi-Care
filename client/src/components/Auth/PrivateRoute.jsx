// This will prevent non-authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
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
    return <Navigate to="/login2" />;
  }
  else if(token !== null) {
    return children
  } else {
    return <Navigate to="/login2" />
  }
}

export default PrivateRoute

const BASE_URL = "http://localhost:8080/api/v1"
// const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: "http://localhost:8080/api/v1/user/signup",
  LOGIN_API: BASE_URL + "/user/login",
  RESETPASSTOKEN_API: BASE_URL + "/user/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/user/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
  }
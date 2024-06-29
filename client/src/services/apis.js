const BASE_URL = import.meta.env.MEDICARE_APP_BASE_URL;

// AUTH ENDPOINTS 
export const endpoints = {
  SIGNUP_API: BASE_URL + "/user/signup",
  LOGIN_API: BASE_URL + "/user/login",
  SIGNUP_API_DONATE_BLOOD: BASE_URL + "/auth/register",
  LOGIN_API_DONATE_BLOOD: BASE_URL + "/auth/login",
};

// SETTINGS ENDPOINTS - Dashboard Settings
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};


// User Endpoints - Book Appointment Page
export const userEndpoints = {
  APPLY_DOCTOR: BASE_URL + "/user/apply-doctor",
  GET_USER_APPOINTMENTS: BASE_URL + "/user/user-appointments",
  BOOKING_AVAILABILITY : BASE_URL + "/user/booking-availability",
  BOOK_APPOINTMENT : BASE_URL + "/user/book-appointment",
  GET_ALL_NOTIFICATIONS : BASE_URL + "/user/get-all-notification",
  DELETE_ALL_NOTIFICATIONS : BASE_URL + "/user/delete-all-notification",
  GET_ALL_DOCTORS : BASE_URL + "/user/getAllDoctors",
};

// Doctor Endpoints - Book Appointment Page
export const doctorEndpoints = {
  GET_DOCTOR_BY_ID : BASE_URL + "/doctor/getDoctorById",
  GET_ALL_DOCTOR_APPOINTMENTS : BASE_URL + "/doctor/doctor-appointments",
  UPDATE_DOCTOR_STATUS : BASE_URL + "/doctor/update-status",
  UPDATE_DOCTOR_PROFILE : BASE_URL + "/doctor/updateProfile",
  GET_DOCTOR_INFO : BASE_URL + "/doctor/getDoctorInfo",
};

// Admin Endpoints - Book Appointments
export const adminEndpoints = {
  GET_ALL_USERS: BASE_URL + "/admin/getAllUsers",
  GET_ALL_DOCTORS: BASE_URL + "/admin/getAllDoctors",
  CHANGE_ACC_STATUS: BASE_URL + "/admin/changeAccountStatus",
};

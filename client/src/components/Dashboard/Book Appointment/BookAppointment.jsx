import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import Layout from "../../Common/Layout";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
// import { showLoading, hideLoading } from '../redux/features/alertSlice'
import { setLoading } from "../../../slices/authSlice";
import { apiConnector } from "../../../services/apiConnector";
import {toast} from "react-hot-toast"


import { doctorEndpoints, userEndpoints } from "../../../services/apis";
const { GET_DOCTOR_BY_ID } = doctorEndpoints;
const { BOOKING_AVAILABILITY, BOOK_APPOINTMENT } = userEndpoints;

const BookAppointment = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [doctor, setDoctor] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const params = useParams();

  const dispatch = useDispatch();

  // login user data
  const getUserData = async () => {
    try {
      const res = await apiConnector(
        "POST",
        GET_DOCTOR_BY_ID,
        {
          doctorId: params.doctorId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      //   const res = await axios.post(
      //     "http://localhost:8080/api/v1/doctor/getDoctorById",
      //     { doctorId: params.doctorId },
      //     {
      //       headers: {
      //         Authorization: "Bearer " + localStorage.getItem("token"),
      //       },
      //     }
      //   );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // booking funcntion
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(setLoading(true));

      //const doctorName=doctor.firstName+" "+doctor.lastName
      const res = await apiConnector(
        "POST",
        BOOK_APPOINTMENT,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: {
            name: doctor.firstName + " " + doctor.lastName,
            phone: doctor.phone,
          },
          userInfo: user,
          date: date,
          time: time,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // const res = await axios.post(
      //   "http://localhost:8080/api/v1/user/book-appointment",
      //   {
      //     doctorId: params.doctorId,
      //     userId: user._id,
      //     doctorInfo: {
      //       name: doctor.firstName + " " + doctor.lastName,
      //       phone: doctor.phone,
      //     },
      //     userInfo: user,
      //     date: date,
      //     time: time,
      //   },
      //   {
      //     Authorization: `Bearer ${token}`,
      //   }
      // );
      dispatch(setLoading(false));
      if (res.data.success) {
        toast.success("Appointment booked successfully");
        window.location.reload();
        navigate("/dashboard/home-page");
      }
    } catch (err) {
      dispatch(setLoading(false));
      toast.error(err);
      console.log(err);
    }
  };

  const handleAvailability = async () => {
    try {
      //dispatch(showLoading())
      const res = await apiConnector(
        "POST",
        BOOKING_AVAILABILITY,
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        { Authorization: `Bearer ${token}` }
      );
      //dispatch(hideLoading())
      console.log(res);
    
      if (res.data.success) {
        setIsAvailable(true);
        toast.success("Appointments available");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      //dispatch(hideLoading())
      toast.error(error);
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h2>BookingPage</h2>
      <div className="container m-2">
        {doctor && (
          <div>
            <h5>
              Dr. {doctor.firstName} {doctor.lastName}
            </h5>
            <h6>Fees: {doctor.fees}</h6>
            <h6>
              Timings: {doctor.timings[0]} to {doctor.timings[1]}
            </h6>
            <h6>Experience: {doctor.experience}</h6>
            <h6>Specialization: {doctor.specialization}</h6>
            <div className="d-flex flex-column w-50" flex-column>
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                aria-required={"true"}
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                aria-required={"true"}
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookAppointment;

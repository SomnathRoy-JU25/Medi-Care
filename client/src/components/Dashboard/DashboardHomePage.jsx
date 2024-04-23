import React, { useEffect, useState } from "react";
// import axios from "axios";
import Layout from "../Common/Layout";
import { Row, Col } from "antd";
import DoctorList from "./Book Appointment/DoctorList";
// import { useSelector } from "react-redux";
import { userEndpoints } from "../../services/apis";
const { GET_ALL_DOCTORS } = userEndpoints;
import { useSelector } from "react-redux";
import { apiConnector } from "../../services/apiConnector";

const DashboardHomePage = () => {
  const { token } = useSelector((state) => state.auth);
  const [doctors, setDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await apiConnector("GET", GET_ALL_DOCTORS, {
        Authorization: `Bearer ${token}`,
      });

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="m-2">HomePage</h1>
      <Row className="justify-between">
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default DashboardHomePage;

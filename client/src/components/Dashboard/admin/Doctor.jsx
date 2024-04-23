import React, { useState, useEffect } from "react";
// import Layout from '../../components/layout'
import Layout from "../../Common/Layout";
// import axios from "axios";
import { message, Table } from "antd";
import { adminEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import { useSelector } from "react-redux";
const { GET_ALL_DOCTORS, CHANGE_ACC_STATUS } = adminEndpoints;

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const {token} = useSelector((state) => state.auth);
  const getDoctors = async () => {
    try {
      const res = await apiConnector("GET", GET_ALL_DOCTORS, {
        Authorization: `Bearer ${token}`
      });
      
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }; 

  const handleAccStatus = async (record, status) => {
    try {
      const res = await apiConnector(
        "POST",
        CHANGE_ACC_STATUS,
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
     
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}{" "}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getDoctors();
  }, []);
  return (
    <Layout>
      <h2 className="m-2">Doctors</h2>
      <Table columns={columns} dataSource={doctors}></Table>
    </Layout>
  );
};

export default Doctors;

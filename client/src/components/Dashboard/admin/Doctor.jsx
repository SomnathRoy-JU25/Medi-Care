import React, { useState, useEffect } from "react";
// import Layout from '../../components/layout'
import Layout from "../../Common/Layout";
// import axios from "axios";
import { Table } from "antd";
import { adminEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
const { GET_ALL_DOCTORS, CHANGE_ACC_STATUS } = adminEndpoints;

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const getDoctors = async () => {
    try {
      const res = await apiConnector("GET", GET_ALL_DOCTORS, {
        Authorization: `Bearer ${token}`,
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
          status, // Pass the status directly
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (res.data.success) {
        // Update the doctor's status in the local state
        const updatedDoctors = doctors.map((doctor) => {
          if (doctor._id === record._id) {
            return {
              ...doctor,
              status: status, // Update the status
            };
          }
          return doctor;
        });
        setDoctors(updatedDoctors);

        // Show success toast
        toast.success(res.data.message);
      }
    } catch (error) {
      // Show error toast
      toast.error(error.response.data.message);
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
          {record.status === "pending" && (
            <>
              <button
                className="btn btn-success"
                onClick={() => handleAccStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger ml-2"
                onClick={() => handleAccStatus(record, "rejected")}
              >
                Reject
              </button>
            </>
          )}
          {record.status === "rejected" && (
            <button
              className="btn btn-success"
              onClick={() => handleAccStatus(record, "approved")}
            >
              Approve
            </button>
          )}
          {record.status === "approved" && (
            <button
                className="btn btn-danger ml-2"
                onClick={() => handleAccStatus(record, "rejected")}
              >
                Reject
              </button>
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

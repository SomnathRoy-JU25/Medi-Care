import React, { useEffect, useState } from "react";
import Layout from "../../Common/Layout";
import moment from "moment";
import { apiConnector } from "../../../services/apiConnector";
import { useSelector } from "react-redux";
import { doctorEndpoints } from "../../../services/apis";
import { Table, message } from "antd";
import { toast } from "react-hot-toast";

const { GET_ALL_DOCTOR_APPOINTMENTS, UPDATE_DOCTOR_STATUS } = doctorEndpoints;

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  // Fetch All Appointments
  const getAppointments = async () => {
    try {
      const res = await apiConnector(
        "GET",
        GET_ALL_DOCTOR_APPOINTMENTS,
        {id : user._id},
        {
          Authorization: `Bearer ${token}`,
        }
      );
      
      console.log(res);
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await apiConnector(
        "POST",
        UPDATE_DOCTOR_STATUS,
        {
          appointmentId: record._id,
          status,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.error(error);
      toast.error("You are Not a Doctor", { 
        position: 'top-right', 
        style: { padding: '5px' } 
    });
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => `XXXX${id.slice(-4)}`,
    },
    {
      title: "Name",
      dataIndex: "doctorInfo",
      key: "doctorInfo",
      render: (doctorInfo) => doctorInfo.name,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      render: (date, record) => (
        <span>
          {moment(record.createdAt).format("DD-MM-YYYY hh:mm A")}
          {/* {moment(date).format("DD-MM-YYYY")} &nbsp; */}
          {/* {moment(record.time).format("HH:mm")}  */}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="space-x-2 flex flex-row">
          {record.status === "pending" && (
            <>
              <button
                className="bg-green-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 hover:bg-red-900 text-white py-2 px-4 rounded"
                onClick={() => handleStatus(record, "rejected")}
              >
                Reject
              </button>
            </>
          )}
          {record.status === "approved" && (
            <>
              <button
                className="bg-red-500 hover:bg-red-900 text-white py-2 px-4 rounded"
                onClick={() => handleStatus(record, "pending")}
              >
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Appointments list (Doctor)</h1>
      <Table
        columns={columns}
        dataSource={appointments}
        pagination={{ pageSize: 10 }} // Change pageSize according to your requirement
      />
    </Layout>
  );
};

export default DoctorAppointments;

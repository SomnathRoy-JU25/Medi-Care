import React, { useEffect, useState } from "react";
import Layout from "../../Common/Layout";
// import axios from "axios";
import moment from "moment";
import { Table, Tag } from "antd";
import { userEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import { useSelector } from "react-redux";
const {GET_USER_APPOINTMENTS} = userEndpoints;
const Appointments = () => {
  const [appoinments, setAppointments] = useState([]);
  const {token} = useSelector((state) => state.auth);
  const getAppointments = async () => {
    try {
      const res = apiConnector("GET",GET_USER_APPOINTMENTS,{
        Authorization: `Bearer ${token}`,
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("token"),
        // },
      })
      // const res = await axios.get("http://localhost:8080/api/v1/user/user-appointments", {
      //   headers: {
      //     Authorization: "Bearer " + localStorage.getItem("token"),
      //   },
      // });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorInfo",
      align: "center",
      render: (text, record) => <span>{record.doctorInfo.name}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.doctorInfo.phone}</span>,
      align: "center",
    },
    {
      title: "Date & Time",
      dataIndex: "_id",
      align: "center",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (tag) => (
        <>
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        </>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="d-inline-block m-2 p-1 border border-primary rounded">
        Appointments list
      </h1>
      <Table columns={columns} dataSource={appoinments} bordered></Table>
    </Layout>
  );
};

export default Appointments;

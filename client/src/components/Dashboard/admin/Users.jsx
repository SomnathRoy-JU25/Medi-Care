import React, { useState, useEffect } from "react";
import Layout from "../../Common/Layout";
import { Table } from "antd";
import { adminEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import { useSelector } from "react-redux";
const { GET_ALL_USERS } = adminEndpoints;

const Users = () => {
  const [users, setUsers] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const getUsers = async () => {
    try {
      const res = await apiConnector("GET", GET_ALL_USERS, {
        Authorization: `Bearer ${token}`,
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }; //
  // antd table column
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
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Layout>
      <h2 className="m-2">Users</h2>
      <Table columns={columns} dataSource={users}></Table>
    </Layout>
  );
};

export default Users;

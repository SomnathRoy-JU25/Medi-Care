import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import moment from "moment";
import Modal from "../components/shared/modal/Modal"; // Import the Modal component

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();

  // Get blood records function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h4
            className="text-lg font-semibold mb-4 cursor-pointer"
            onClick={() => setShowModal(true)} // Toggle modal visibility on click
          >
            <i className="fas fa-plus text-green-500 mr-2"></i>
            Add Inventory
          </h4>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Blood Group
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Inventory Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Donor Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Time & Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.map((record) => (
                <tr key={record._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.bloodGroup}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.inventoryType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.quantity} (ML)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Render the modal component */}
          {showModal && <Modal setShowModal={setShowModal} user={user} />}
        </div>
      )}
    </Layout>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "./shared/Spinner";
import Container from "./shared/Layout/Container";
import API from "../../services/API";
import moment from "moment";
import Modal from "./shared/modal/Modal"; // Import the Modal component
import { IoMdAdd } from "react-icons/io";

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
    <Container>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h4>
            <i className="fas fa-plus text-green-500 mr-2"></i>
            <button
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-md
                    hover:from-green-600 hover:to-green-700 transition duration-300 shadow-md hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              onClick={() => setShowModal(true)} // Toggle modal visibility on click
            >
            <div className="flex flex-row justify-center items-center">
              <div>
              <IoMdAdd  size={25}/>
              </div>
              <div>
                Add Inventory
              </div>
            </div>
            </button>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.email}
                  </td>
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
    </Container>
  );
};

export default HomePage;

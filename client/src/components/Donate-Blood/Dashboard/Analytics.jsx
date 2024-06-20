import React, { useState, useEffect } from "react";
import Header from "../../shared/Layout/Header";
import API from "../../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "bg-red-600",
    "bg-yellow-600",
    "bg-blue",
    "bg-green-600",
    "bg-indigo-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-gray-600",
  ];

  // GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
  }, []);

  // GET BLOOD RECORDS
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  // Function to chunk the data into arrays with 4 items per row
  const chunkData = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  return (
    <>
      <Header />
      <div className="flex flex-wrap justify-center ">
        {chunkData(data, 4).map((chunk, chunkIndex) => (
          <div className="flex" key={chunkIndex}>
            {chunk.map((record, i) => (
              <div
                className={`m-4 p-4 max-w-xs rounded-lg shadow-md ${colors[(chunkIndex * 4 + i) % colors.length]}`}
                key={i}
              >
                <div className="text-center mb-3">
                  <h1 className="text-lg font-bold text-white">{record.bloodGroup}</h1>
                  <p className="text-sm text-white">Total In: <b>{record.totalIn}</b> (ML)</p>
                  <p className="text-sm text-white">Total Out: <b>{record.totalOut}</b> (ML)</p>
                </div>
                <div className="text-center text-white">
                  <p className="text-gray-50 font-medium">Total Available: <b>{record.availabeBlood}</b> (ML)</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="container mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4">Recent Blood Transactions</h1>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Blood Group</th>
              <th className="px-4 py-2">Inventory Type</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Donor Email</th>
              <th className="px-4 py-2">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{record.bloodGroup}</td>
                <td className="px-4 py-2">{record.inventoryType}</td>
                <td className="px-4 py-2">{record.quantity} (ML)</td>
                <td className="px-4 py-2">{record.email}</td>
                <td className="px-4 py-2">{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;

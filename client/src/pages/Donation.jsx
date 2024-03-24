import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { useSelector } from "react-redux";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  
  // Find donor records
  const getDonations = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonations();
  }, []);

  return (

    <Layout>
      <div className="container px-10">
        <h1 className="text-2xl font-bold mb-4">Donation Records</h1>
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Blood Group</th>
              <th className="px-4 py-2">Inventory Type</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{record.bloodGroup}</td>
                <td className="px-4 py-2">{record.inventoryType}</td>
                <td className="px-4 py-2">{record.quantity}</td>
                <td className="px-4 py-2">{record.email}</td>
                <td className="px-4 py-2">{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Donation;

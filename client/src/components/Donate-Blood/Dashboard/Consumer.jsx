import React, { useEffect, useState } from "react";
import Container from "../shared/Layout/Container";
import moment from "moment";
import API from "../../../services/API";
import { useSelector } from "react-redux";

const Consumer = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // Fetch consumer records
  const getConsumers = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
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
    getConsumers();
  }, []);

  return (
    <Container>
      <div className="container mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">Consumer Records</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((record) => (
              <tr key={record._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{record.bloodGroup}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.inventoryType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Consumer;

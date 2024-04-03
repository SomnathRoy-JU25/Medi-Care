import React, { useState } from "react";
import InputType from "../Form/InputType";
import API from "../../../services/API";
import { toast } from "react-hot-toast";

const Modal = ({ setShowModal, user }) => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");

  // handle modal data
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return toast.error("Please Provide All Fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        // organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        toast.success("New Record Created",1000);
        // alert("New Record Created");
        setShowModal(false); // Close the modal after submission
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      window.location.reload();
    }
  };

  return (
    <>
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="staticBackdropLabel"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Manage Blood Record
                  </h3>
                  <div className="mt-2">
                    <div className="flex items-center mb-3">
                      <span>Blood Type:</span>
                      <div className="ml-3">
                        <input
                          type="radio"
                          id="inRadio"
                          name="inRadio"
                          value="in"
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          checked={inventoryType === "in"}
                          onChange={(e) => setInventoryType(e.target.value)}
                        />
                        <label
                          htmlFor="inRadio"
                          className="ml-1 text-sm text-gray-700"
                        >
                          IN
                        </label>
                      </div>
                      <div className="ml-3">
                        <input
                          type="radio"
                          id="outRadio"
                          name="outRadio"
                          value="out"
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          checked={inventoryType === "out"}
                          onChange={(e) => setInventoryType(e.target.value)}
                        />
                        <label
                          htmlFor="outRadio"
                          className="ml-1 text-sm text-gray-700"
                        >
                          OUT
                        </label>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="bloodGroup"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Blood Group
                      </label>
                      <select
                        id="bloodGroup"
                        name="bloodGroup"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        onChange={(e) => setBloodGroup(e.target.value)}
                      >
                        <option defaultValue disabled>
                          Select Blood Group
                        </option>
                        <option value={"O+"}>O+</option>
                        <option value={"O-"}>O-</option>
                        <option value={"AB+"}>AB+</option>
                        <option value={"AB-"}>AB-</option>
                        <option value={"A+"}>A+</option>
                        <option value={"A-"}>A-</option>
                        <option value={"B+"}>B+</option>
                        <option value={"B-"}>B-</option>
                      </select>
                    </div>
                    <InputType
                      labelText={"Donar Email"}
                      labelFor={"donarEmail"}
                      inputType={"email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputType
                      labelText={"Quantity (ML)"}
                      labelFor={"quantity"}
                      inputType={"number"}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
import React from 'react'
import { useNavigate } from 'react-router-dom'
import moment from "moment";
const DoctorList = ({ doctor }) => {
    const navigate = useNavigate()
    return (
        <div className="bg-gray-300 rounded-lg shadow-md p-4 mb-4 cursor-pointer " 
             onClick={() => navigate(`/dashboard/doctor/book-appointment/${doctor._id}`)}>
            <div className="text-lg font-semibold text-gray-800">
                Dr. {doctor.firstName} {doctor.lastName}
            </div>
            <div className="mt-2">
                <p>
                    <span className="font-semibold">Specialization:</span> {doctor.specialization}
                </p>
                <p>
                    <span className="font-semibold">Experience:</span> {doctor.experience}
                </p>
                <p>
                    <span className="font-semibold">Fees:</span> {doctor.fees}
                </p>
                <p>
                    {/* <span className="font-semibold">Timings:</span> {doctor.timings[0]} to {doctor.timings[1]} */}
                    {/* <span className="font-semibold">Timings:</span> 24 × 7 */}
                    <span className="font-semibold">Timings:</span> {moment(doctor.createdAt).format("hh:mm A")} to {moment(doctor.updatedAt).format("23:59")}
                </p>
            </div>
        </div>
    )
}

export default DoctorList

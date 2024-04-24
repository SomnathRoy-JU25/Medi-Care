const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/User");

exports.getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Doctor info",
    });
  }
};

exports.UpdateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While updating info",
    });
  }
};

exports.getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });

    res.status(200).send({
      success: true,
      message: "Doctor info fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Doctor info",
    });
  }
};

exports.doctorAppointmentController = async (req, res) => {
  try {
    let appointments;
    // const {isDoctorTrue} = req.body;
    // if (isDoctorTrue) {
    //   appointments = await appointmentModel.find();
    // } else {
    //    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    //    appointments = await appointmentModel.find({ doctorId: doctor._id });
    // }
    appointments = await appointmentModel.find();
    console.log(appointments);
    res.status(200).send({
      success: true,
      message: "Doctor appointments fetched",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doctor appointments",
    });
  }
};

exports.updateStatusController = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );

    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment not found",
      });
    }

    const user = await userModel.findById(appointment.userId); // Use findById instead of findOne
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.notification.push({
      type: "Status-updated",
      message: `Your appointment has been ${status}`,
      onClickPath: "/dashboard/doctor-appointments",
    });

    await user.save();

    res.status(200).send({
      success: true,
      message: `Doctor appointment has been ${status}`,
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating status",
    });
  }
};

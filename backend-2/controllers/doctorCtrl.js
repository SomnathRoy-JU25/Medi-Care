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
    if (req.user.isDoctor) {
      const doctor = await doctorModel.findOne(req.body.id);
      appointments = await appointmentModel.find({ doctorId: doctor._id });
    } else {
      const user = await userModel.findById(req.body.id);
      appointments = await appointmentModel.find(user);
    }
    // console.log(appointments);
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

    const user = await userModel.findById({ _id: appointment.userId });

    if (user) {
      const notification = user.notification || [];
      notification.push({
        type: "Status-updated",
        message: `Your appointment has been ${status}`,
        onClickPath: "/dashboard/doctor-appointments",
      });

      user.isDoctor = status === "approved";
      user.notification = notification;
      await user.save();
    } else {
    }
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

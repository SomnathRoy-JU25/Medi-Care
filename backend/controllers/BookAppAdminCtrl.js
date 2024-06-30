const doctorModel = require("../models/doctorModel");
const userModel = require("../models/User");

// BookAppointment Admin Controller

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}); // all

    res.status(200).send({
      data: users,
      message: "users list",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `error while fetching users`,
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}); // all

    res.status(200).send({
      data: doctors,
      message: "doctors list",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `error while fetching doctors data`,
    });
  }
};

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    // Update the doctor's status in the database
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    // Find the corresponding user
    const user = await userModel.findOne({ _id: doctor.userId });

    // Update user's notification
    if (user) {
      const notification = user.notification || [];
      notification.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account request has been ${status}`,
        onClickPath: "/dashboard/notification",
      });

      // Update user's isDoctor status based on approval
      user.isDoctor = status === "approved";
      user.notification = notification;

      // Save updated user
      await user.save();
    } else {
      // If user is not found, handle the error
      // return res.status(404).send({
      //   success: false,
      //   message: "User not found",
      // });
    }

    // Send response
    res.status(201).send({
      data: doctor,
      message: "Account status updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in account status update: ${error.message}`,
    });
  }
};


module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
};

const userModel = require("../models/User");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");


exports.authcontroller = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    }

    res.status(200).send({
      data: user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: `Auth Controller ${error.message}` });
  }
};
// Apply DOctor CTRL
exports.applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    //console.log("applydoctorcontroller new doctor")
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;

    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    console.log("applydoctor controller after push");
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctor",
    });
  }
};

exports.GetAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();

    res.status(201).send({
      success: true,
      message: "all notifications marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in notifications",
    });
  }
};
exports.deleteNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;

    res.status(201).send({
      success: true,
      message: "Notifications deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting notifications",
    });
  }
};
exports.getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });

    res.status(201).send({
      success: true,
      message: "Doctor list fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching doctor list",
    });
  }
};

// Working
exports.bookAppointmentController = async (req, res) => {
  try {
    // Validate date and time formats
    if (!moment(req.body.date, "DD-MM-YYYY", true).isValid() || !moment(req.body.time, "HH:mm", true).isValid()) {
      return res.status(400).send({
        success: false,
        message: "Invalid date or time format",
      });
    }

    // Convert date and time to ISO format
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";

    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();

    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    user.notification.push({
      type: "New Appointment request",
      message: `A new appointment request from ${req.body.userInfo.firstName}`,
      onClickPath: "/dashboard/user/appointments",
    });

    await user.save();
    
    res.status(201).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while booking appointment",
    });
  }
};

// exports.bookAppointmentController = async (req, res) => {
//   try {
//     req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
//     req.body.time = moment(req.body.time, 'HH:mm').toISOString()
//     req.body.status = 'pending'
//     const newAppointment = new appointmentModel(req.body)
//     newAppointment
//     await newAppointment.save()

//     const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
//     user.notification.push({
//       type: 'New Appointment request',
//       message: `A new appointment request from ${req.body.userInfo.name}`,
//       onClickPath: '/user/appointments'
//     })
//     await user.save()
//     res.status(201).send({
//       success: true,
//       message: "Appointment booked successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error while booking appoinment",
//     });
//   }
// };

//  bookingAvailabilityController

exports.bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });

    if (appointments.length > 0) {
      return res.status(201).send({
        success: true,
        message: "Appointment not available at this time",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while booking appoinment",
    });
  }
};
exports.userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
     
    res.status(201).send({
      success: true,
      message: "Appointment list fetched",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting appoinments list",
    });
  }
};

// const PredictDiseaseController = async(req,res)=>{
//   try {
//     console.log(req.body)
//     const result=await axios.post(
//       'http://127.0.0.1:2024/api/predict',req.body)
//       console.log(result.data)
//     res.status(201).send({
//       success: true,
//       result: result.data,
//       message: "success",
//     });
//   } catch (error) {
//     console.log(error)
//     res.status(500).send({
//       success: false,
//       error,
//       message: "error",
//     });
//   }
// }

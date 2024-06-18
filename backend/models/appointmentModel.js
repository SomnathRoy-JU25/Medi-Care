const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    doctorInfo: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    userInfo: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    time: {
        type: String,
        required: true
    },
}, { timestamps: true })


module.exports = mongoose.model("appointments", appointmentSchema);
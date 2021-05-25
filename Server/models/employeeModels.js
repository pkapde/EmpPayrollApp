const mongoose = require('mongoose');

let employeeModels = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty"]
    },
    profilePic: {
        type: String,
        required: [true, "Profile Pic cannot be empty"]
    },
    gender: {
        type: String,
        required: [true, "Gender cannot be empty"]
    },
    salary: {
        type: String,
        required: [true, "Salary cannot be empty"]
    },
    department: {
        type: Array,
        required: [true, "Department cannot be empty"]
    },
    startDate: {
        type: String,
        required: [true, "Date cannot be empty"]
    },
    note: {
        type: String,

    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required : [true]       
    },

}, { timeStamps: true })

// collection
exports.employeeModel = mongoose.model("employeeModels", employeeModels);
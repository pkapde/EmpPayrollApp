const { request, response } = require("express");
const model = require("../models/employeeModels");

exports.employeeRegistration = (request, callback) => {
    console.log("Reqest Body :" + JSON.stringify(request.body))
    try {
        model.employeeModel.findOne({ "name": request.body._name }, (err, employee) => {
            console.log("Employee Data:" + employee);
            if (employee)
                callback("Name Already exist");
            else {
                let employeeDetails;
                employeeDetails = new model.employeeModel({
                    "name": request.body.name,
                    "profilePic": request.body.profilePic,
                    "gender": request.body.gender,
                    "department": request.body.department,
                    "salary": request.body.salary,
                    "startDate": request.body.startDate,
                    "note": request.body.note
                })
                employeeDetails.save()
                    .then(employee => {
                        callback(null, employee);
                    })
                    .catch(err => {
                        callback(err);
                    })
            }
        })
    } catch (e) {

    }
}

exports.getAllEmployee = (request, callback) => {
    console.log("From getAll Employee");
    try {
        model.employeeModel.find()
            .then(employees => {
                console.log(employees)
                    // response.json(employees);
                callback(null, employees);
            })
            .catch(err => {
                callback(err);
            })
    } catch (e) {

    }
}
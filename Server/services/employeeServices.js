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
    try {
        model.employeeModel.find()
            .then(employees => {    
                callback(null, employees);
            })
            .catch(err => {
                callback(err);
            })
    } catch (e) {

    }
}

exports.updateEmployee = (request, data, callback) => {
    let id = request.params.employees_id;
    const updatedData = model.employeeModel.findByIdAndUpdate(id, data)
        .then(updatedData => {
            callback(null, updatedData);
        })
        .catch(err => {
            callback(err);
        })

}

exports.removeEmployee = (request, response, callback) => {
    let id = request.params.employees_id;
    model.employeeModel.remove({
            _id: id
        })
        .then(deletedEmployee => {
            response.send({ message: 'Employee Deleted Sucessfully! ' });
            callback(null, deletedEmployee);
        })
        .catch(err => {
            callback(err);
        })
}
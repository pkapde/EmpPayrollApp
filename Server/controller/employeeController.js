const { request, response } = require('express');
const employeeService = require('../services/employeeServices');

exports.addEmployee = (request, response) => {
    console.log("Reqest Body :" + JSON.stringify(request.body))
    request.checkBody("name", "Name cannot be empty").isAlpha().len({ min: 3 });
    request.checkBody("profilePic", "Profile pic cannot be empty").notEmpty();
    request.checkBody("gender", "Gender cannot be empty").notEmpty();
    request.checkBody("department", "Department cannot be empty").notEmpty();
    request.checkBody("salary", "Salary cannot be empty").notEmpty();
    request.checkBody("startDate", "Date cannot be empty").notEmpty();
    request.checkBody("note", "Note cannot be empty").notEmpty();
    const error = request.validationErrors();
    if (error)
        response.status(422).send(error);
    else {
        employeeService.employeeRegistration(request, (err, data) => {
            if (err) {
                response.status(500).send(err);
            } else {
                // response.status(200).send("Successfully added", data);
                response.send(200, data);
            }
        })
    }
}

exports.getAllEmployee = (request, response) => {
    try {
        employeeService.getAllEmployee(request, (err, data) => {
            if (err) {
                response.status(500).send(err);
            } else {
                let dataResponse = { message: "Sucessfully Retrived Employees!!", data: data }
                response.status(200).send(dataResponse);
            }
        })
    } catch (e) {
        response.status(404).send("Not Found!!");
    }
}

exports.updateEmployee = (request, response) => {
    const error = request.validationErrors();
    if (error)
        response.status(422).send(error);
    else {
        let employeeData = {
            "name": request.body.name === null ? null : request.body.name,
            "profilePic": request.body.profilePic === null ? null : request.body.profilePic,
            "gender": request.body.gender === null ? null : request.body.gender,
            "department": request.body.department === null ? null : request.body.department,
            "salary": request.body.salary === null ? null : request.body.salary,
            "startDate": request.body.startDate === null ? null : request.body.startDate,
            "note": request.body.note === null ? null : request.body.note
        }
        employeeService.updateEmployee(request, employeeData, (err, data) => {
            if (err) {
                response.status(500).send(err);
            } else {
                let dataResponse = { message: "Successfully Updated!!", data: employeeData }
                response.status(200).send(dataResponse);

            }
        })
    }

    
exports.removeEmployee = (request, response) => {
    const error = request.validationErrors();
    if (error)
        response.status(422).send(error);
    else {
        employeeService.removeEmployee(request, response, (err, data) => {
            if (err) {
                response.status(500).send(err);
            } else {
                let dataResponse = { message: "Successfully Updated!!" }
                response.status(200).send(dataResponse);
            }
        })
    }

}

}
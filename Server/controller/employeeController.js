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

    //getting error while validation
    const error = request.validationErrors();
    //if validation gets error send response 
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

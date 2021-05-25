const controller = require('../controller/employeeController');
let express = require('express');
let router = express.Router();

router.post("/add", controller.addEmployee);

router.get("/get", controller.getAllEmployee);

module.exports = router
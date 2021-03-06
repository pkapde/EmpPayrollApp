const controller = require('../controller/employeeController');
let express = require('express');
let router = express.Router();

router.post("/add", controller.addEmployee);

router.get("/get", controller.getAllEmployee);

router.put("/employees/:employee_id", controller.updateEmployee);

router.delete("/remove/:employee_id", controller.removeEmployee);
module.exports = router
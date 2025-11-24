const express = require("express");
const router = express.Router();
const studentController = require("./../../controllers/auth/studentAuth.controller");

router.post("/student", studentController.createStudent);
router.get("/student/by-id/:id", studentController.findById);
router.get("/student/by-pin/:pin", studentController.getStudentByPin);
router.put("/student/update", studentController.updateStudentAnswers);

module.exports = router;

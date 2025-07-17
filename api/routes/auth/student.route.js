const express = require("express");
const router = express.Router();
const studentController = require("./../../controllers/auth/studentAuth.controller");

router.post("/student", studentController.createStudent);
router.get("/student/:pin", studentController.getStudentByPin);
router.post("/student/answer/:id", studentController.updateStudentAnswers);
// router.get("/student/:id", studentController.findById);

module.exports = router;

const express = require("express");
const router = express.Router();
const studentController = require("./../../controllers/auth/studentAuth.controller");

const validate = require("../../middleware/validate");
const {
  registerStudentSchema,
  updateStudentAnswersSchema,
  studentIdParamSchema,
  studentPinParamSchema,
} = require("../../validation/studentValidation");

// BODY
router.post(
  "/student",
  validate(registerStudentSchema, "body"),
  studentController.createStudent,
);

// PARAMS
router.get(
  "/student/by-id/:id",
  validate(studentIdParamSchema, "params"),
  studentController.findById,
);

// PARAMS
router.get(
  "/student/by-pin/:pin",
  validate(studentPinParamSchema, "params"),
  studentController.getStudentByPin,
);

// BODY
router.put(
  "/student/update",
  validate(updateStudentAnswersSchema, "body"),
  studentController.updateStudentAnswers,
);

module.exports = router;

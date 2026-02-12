const express = require("express");
const router = express.Router();
const teacherAuthController = require("./../../controllers/auth/teacherAuth.controller");

const validate = require("../../middleware/validate");
const {
  registerTeacherSchema,
  loginTeacherSchema,
} = require("../../validation/teacherValidation");

// BODY
router.post(
  "/createTeacher",
  validate(registerTeacherSchema, "body"),
  teacherAuthController.register,
);

// BODY
router.post(
  "/loginTeacher",
  validate(loginTeacherSchema, "body"),
  teacherAuthController.login,
);

module.exports = router;

const Student = require("./../../models/userSchema/student.model");
const Experiment = require("./../../models/experiment/experiment.model");
const mongoose = require("mongoose");

exports.createStudent = async (req, res) => {
  try {
    const { name, pin } = req.body;

    const experiment = await Experiment.findOne({ pin });
    if (!experiment) {
      throw new Error("Invalid PIN.");
    }

    const student = new Student({
      name,
      pin,
      answerOne: null,
      answerTwo: null,
    });
    await student.save();

    res.status(201).send({
      message: "Student created successfully.",
      student: {
        _id: student._id,
        name: student.name,
        pin: student.pin,
        title: experiment.title,
        answerOne: student.answerOne,
        answerTwo: student.answerTwo,
      },
    });
  } catch (err) {
    console.error(err);
    if (err.message === "Invalid PIN .") {
      res.status(400).send({ message: "Invalid PIN." });
    } else {
      res.status(500).send({ message: "Error creating student." });
    }
  }
};

exports.getStudentByPin = async (req, res) => {
  try {
    const pin = req.params.pin;
    if (!pin) {
      return res.status(400).send({ message: "O campo 'pin' é obrigatório." });
    }

    const students = await Student.find({ pin: pin });
    if (!students) {
      throw new Error("Estudante não encontrado.");
    }

    res.send(students);
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "Estudante não encontrado." });
  }
};

exports.updateStudentAnswers = async (req, res) => {
  try {
    const { answerOne, answerTwo } = req.body;
    const studentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).send({ message: "Invalid student ID." });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { answerOne, answerTwo },
      { new: true }
    );

    if (!updatedStudent) {
      throw new Error("Student not found.");
    }

    res.status(200).send({
      message: "Student answers updated successfully.",
      student: {
        _id: updatedStudent._id,
        name: updatedStudent.name,
        pin: updatedStudent.pin,
        answerOne: updatedStudent.answerOne,
        answerTwo: updatedStudent.answerTwo,
      },
    });
  } catch (err) {
    console.error(err);
    if (err.message === "Student not found.") {
      res.status(404).send({ message: "Student not found." });
    } else {
      res.status(500).send({ message: "Error updating student answers." });
    }
  }
};

exports.findById = async (id) => {
  try {
    if (!id) {
      throw new Error("ID do estudante não pode ser nulo.");
    }

    const student = await Student.findById(id);
    if (!student) {
      throw new Error("Estudante não encontrado.");
    }

    return student;
  } catch (err) {
    throw new Error(err.message);
  }
};

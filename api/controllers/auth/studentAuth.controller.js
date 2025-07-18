const Student = require("./../../models/userSchema/student.model");
const Experiment = require("./../../models/experiment/experiment.model");
const mongoose = require("mongoose");

exports.createStudent = async (req, res) => {
  try {
    const { name, pin } = req.body;

    // Busca o experimento
    const experiment = await Experiment.findOne({ pin });
    if (!experiment) {
      return res.status(400).send({ message: "Invalid PIN." });
    }
    if (experiment.liberateResult) {
      return res
        .status(400)
        .send({ message: "Sala encerrada, resultado já liberado." });
    }

    let newSubmissions = [];
    if (experiment.title === "Variação de Água Corporal") {
      newSubmissions = [
        { questionText: "answerOne", answerText: null },
        { questionText: "answerTwo", answerText: null },
      ];
    }

    const student = new Student({
      name,
      pin,
      answers: newSubmissions,
    });

    await student.save();

    // --- LÓGICA WEBSOCKET: Notificar a entrada de novo aluno ---
    if (req.io) {
      // Busca a lista atualizada de alunos para esta sala
      const updatedStudents = await Student.find({ pin: pin });
      // Emite o evento 'student_update' para todos na sala com este PIN
      req.io.to(pin).emit("student_update", updatedStudents);
      console.log(
        `Socket.IO: Aluno ${name} entrou na sala ${pin}. Emitindo 'student_update'.`
      );
    }
    // --- FIM LÓGICA WEBSOCKET ---

    res.status(201).send({
      message: "Student created successfully.",
      student: {
        _id: student._id,
        name: student.name,
        pin: student.pin,
        title: experiment.title,
        answers: student.answers,
      },
    });
  } catch (err) {
    console.error(err);
    if (res.headersSent) {
      // Para evitar "Cannot set headers after they are sent to the client"
      return;
    }
    if (err.message === "Invalid PIN.") {
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
    const { studentId, answers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).send({ message: "Invalid student ID." });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send({ message: "Student not found." });
    }

    console.log("aquiii", student);

    // Atualiza as respostas baseadas no questionText
    answers.forEach(({ questionText, answerText }) => {
      const answerIndex = student.answers.findIndex(
        (a) => a.questionText === questionText
      );
      if (answerIndex !== -1) {
        student.answers[answerIndex].answerText = answerText;
      }
    });

    await student.save();

    if (req.io) {
      const roomStudents = await Student.find({ pin: student.pin });
      req.io.to(student.pin).emit("student_update", roomStudents);
      console.log(
        `Socket.IO: Respostas do aluno ${student.name} na sala ${student.pin} atualizadas. Emitindo 'student_update'.`
      );
    }

    res.status(200).send({
      message: "Student answers updated successfully.",
      student: {
        _id: student._id,
        name: student.name,
        pin: student.pin,
        answers: student.answers,
      },
    });
  } catch (err) {
    console.error(err);
    if (res.headersSent) {
      // Para evitar "Cannot set headers after they are sent to the client"
      return;
    }
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

const Experiment = require("./../../models/experiment/experiment.model");
const crypto = require("crypto");
const Student = require("@/controllers/auth/studentAuth.controller.js");

module.exports = {
  // Criar um novo experimento
  async create(req, res) {
    try {
      const randomBytes = crypto.randomBytes(2);
      const randomNum = parseInt(randomBytes.toString("hex"), 16);

      const { title, titleActivity, description } = req.body;

      const teacherId = req.params.id;

      const experiment = await Experiment.create({
        pin: ("0000" + randomNum).slice(-4),
        title,
        titleActivity,
        description,
        teacher: teacherId,
      });

      return res.status(201).json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error creating experiment" });
    }
  },

  // Busca todos os experimentos de um professor
  async getAllExperiments(req, res) {
    try {
      const teacherId = req.params.id;

      const experiments = await Experiment.find({ teacher: teacherId });

      return res.status(200).json({ experiments });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error fetching experiments" });
    }
  },

  // Busca um experimento com o pin e id do professor
  async getExperimentById(req, res) {
    try {
      const teacherId = req.params.teacherId;
      const experimentId = req.params.experimentId;

      const experiment = await Experiment.findOne({
        _id: experimentId,
        teacher: teacherId,
      });

      if (!experiment) {
        return res.status(404).json({ error: "Experiment not found" });
      }

      return res.status(200).json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error fetching experiment" });
    }
  },

  // busca um experimento apenas com o pin
  async getExperimentByPin(req, res) {
    try {
      const { pin } = req.params;

      const experiment = await Experiment.getExperimentByPin(pin);

      if (!experiment) {
        return res.status(404).json({ error: "Experiment not found" });
      }

      return res.json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error finding experiment" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      await Experiment.findByIdAndDelete(id);

      return res.status(204).send();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error deleting experiment" });
    }
  },

  // busca o resultado do experimento de água - Primeira questão
  async getExperimentOptionOne(req, res) {
    const data = require("./result_tables/0_420");
    res.json({ data });
  },

  // busca as opções do experimento de água - Primeira questão
  async getExperimentOptions(req, res) {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    try {
      const options = require("./options");

      const [optionsOne, optionsTwo] = options;

      const shuffledOptionsOne = shuffleArray([...optionsOne]);
      const shuffledOptionsTwo = shuffleArray([...optionsTwo]);

      res.json({
        optionsOne: shuffledOptionsOne,
        optionsTwo: shuffledOptionsTwo,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error fetching options" });
    }
  },

  // busca o grafico de um estudante do experimento de agua
  async getTotalGraphic(req, res) {
    const studentId = req.params.id;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    studentAnswersOne = student.answerOne;
    studentAnswersTwo = student.answerTwo;

    const tempo = require("./result_tables/time");
    const valor_corrigido = require("./result_tables/correctJsonValue");
    const valor_corrigido_80 = require("./result_tables/80correctJson");
    const valor_corrigido_20 = require("./result_tables/20correctJson");
    const valor_semCorrecao = require("./result_tables/noCorrectJson");

    let answerData;

    if (studentAnswersOne === "Hipotálamo" && studentAnswersTwo === "ADH") {
      answerData = valor_corrigido;
    } else if (studentAnswersOne === "Hipotálamo") {
      answerData = valor_corrigido_80;
    } else if (studentAnswersTwo === "ADH") {
      answerData = valor_corrigido_20;
    } else {
      answerData = valor_semCorrecao;
    }

    let notaDoAluno = 0;
    if (studentAnswersOne === "Hipotálamo" && studentAnswersTwo === "ADH") {
      notaDoAluno = 10;
    } else if (studentAnswersOne === "Hipotálamo") {
      notaDoAluno = 8;
    } else if (studentAnswersTwo === "ADH") {
      notaDoAluno = 2;
    } else {
      notaDoAluno = 0;
    }

    const data = {
      time: tempo,
      studentValue: answerData,
      expectedValue: valor_corrigido,
      nota: notaDoAluno,
    };

    return res.json({ data });
  },

  async getInicialGrahic(req, resp) {
    const tempo = require("./result_tables/time").default;
    const valor_inicial = require("./result_tables/initialJson");

    const data = {
      time: tempo,
      studentValue: valor_inicial,
      expectedValue: valor_inicial,
    };

    return resp.json({ data });
  },

  // Função que realiza o update da sala e altera o valor de liberateRoom para true
  async updateLiberateRoom(req, res) {
    try {
      const { id } = req.params;
      const { liberateRoom, pinRoom } = req.body;

      const experiment = await Experiment.findByIdAndUpdate(id, {
        liberateRoom,
      });

      console.log("atualizado");

      // --- LÓGICA WEBSOCKET: Notificar a entrada de novo aluno ---
      if (req.io) {
        // Busca a lista atualizada de alunos para esta sala
        const updatedExeriment = await Experiment.getExperimentByPin(pinRoom);

        // Emite o evento 'student_update' para todos na sala com este PIN
        req.io.to(pinRoom).emit("experiment_update", updatedExeriment);
        console.log(
          `Socket.IO: Experimento liberado na sala ${pinRoom}. Emitindo 'student_update'.`
        );
      }
      // --- FIM LÓGICA WEBSOCKET ---

      return res.status(200).json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error updating experiment" });
    }
  },

  async updateLiberateResult(req, res) {
    try {
      const { id } = req.params;
      const { liberateResult } = req.body;

      const experiment = await Experiment.findByIdAndUpdate(id, {
        liberateResult,
      });

      return res.status(200).json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error updating experiment" });
    }
  },
};

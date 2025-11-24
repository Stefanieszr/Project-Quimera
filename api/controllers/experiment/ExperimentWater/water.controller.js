const Experiment = require("@/models/experiment/experiment.model");
const Student = require("@/controllers/auth/studentAuth.controller.js");
const crypto = require("crypto");

module.exports = {
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

    const studentAnswersOne = student.answers.find(
      (a) => a.questionText === "answerOne"
    )?.answerText;
    const studentAnswersTwo = student.answers.find(
      (a) => a.questionText === "answerTwo"
    )?.answerText;

    const tempo = require("./result_tables/time");
    const valor_corrigido = require("./result_tables/correctJsonValue");
    const valor_corrigido_80 = require("./result_tables/80correctJson");
    const valor_corrigido_20 = require("./result_tables/20correctJson");
    const valor_semCorrecao = require("./result_tables/noCorrectJson");

    let answerData;
    let notaDoAluno = 0;
    let msg;

    if (studentAnswersOne === "Hipotálamo" && studentAnswersTwo === "ADH") {
      answerData = valor_corrigido;
      notaDoAluno = 10;
      msg = `Você acertou as duas respostas, ${studentAnswersOne} 80% e ${studentAnswersOne} 20%`;
    } else if (studentAnswersOne === "Hipotálamo") {
      answerData = valor_corrigido_80;
      notaDoAluno = 8;
      msg = `Você acertou a primeira resposta, ${studentAnswersOne} 80%`;
    } else if (studentAnswersTwo === "ADH") {
      answerData = valor_corrigido_20;
      notaDoAluno = 2;
      msg = `Você acertou a segunda resposta, ${studentAnswersOne} 80%`;
    } else {
      answerData = valor_semCorrecao;
      notaDoAluno = 0;
      msg = `Você não acertou nenhuma resposta.`;
    }

    const data = {
      time: tempo,
      studentValue: answerData,
      expectedValue: valor_corrigido,
      nota: notaDoAluno,
      mensagem: msg,
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
};

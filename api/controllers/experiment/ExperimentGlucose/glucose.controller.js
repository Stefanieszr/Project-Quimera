const Experiment = require("@/models/experiment/experiment.model");
const Student = require("@/controllers/auth/studentAuth.controller.js");
const crypto = require("crypto");

module.exports = {
  // busca as opções do experimento de água - Primeira questão
  async getExperimentSimulado(req, res) {
    try {
      const simulado = require("./simulado");
      res.json(simulado);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error fetching options" });
    }
  },
};

const Experiment = require("@/models/experiment/experiment.model");
const Student = require("@/controllers/auth/studentAuth.controller.js");
const crypto = require("crypto");

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

      return res.json(experiment);
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

  async updateExperiment(req, res) {
    try {
      const { id } = req.params;
      const { pinRoom, ...updateFields } = req.body;

      const experiment = await Experiment.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      // Emitir envento quando uma sala for atualizada
      if (req.io) {
        const updatedExperiment = await Experiment.getExperimentByPin(pinRoom);
        req.io.to(pinRoom).emit("experiment_update", updatedExperiment);
        console.log("Experimento atualizado");
      }

      return res.status(200).json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error updating experiment" });
    }
  },
};

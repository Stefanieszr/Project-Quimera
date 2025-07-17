const mongoose = require("mongoose"); //Mongoose é uma biblioteca do Node.js que facilita a interação com o MongoDB,

// Cria um novo schema que descreve como os documentos de "Experimento" devem ser estruturados dentro do MongoDB.
const ExperimentSchema = new mongoose.Schema({
  pin: {
    type: String,
    required: true, // é obrigatório
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  titleActivity: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  // O atributo liberateRoom é utilizado para liberar a sala de experimento
  liberateRoom: {
    type: Boolean,
    required: false,
    default: false,
  },
  liberateResult: {
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ExperimentSchema.statics.getExperimentByPin = async function (pin) {
  const experiment = await this.findOne({ pin });
  return experiment;
};

const Experiment = mongoose.model("Experiment", ExperimentSchema);

module.exports = Experiment;

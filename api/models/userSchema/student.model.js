const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    answerText: { type: String, required: false },
  },
  { _id: false }
);

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },

  // NOVO CAMPO: Array para armazenar submissões de experimentos
  answers: [answerSchema],
});

module.exports = mongoose.model("Student", studentSchema);

const express = require("express");
const ExperimentController = require("@/controllers/experiment/experiment.controller.js");
const ExperimentWaterController = require("@/controllers/experiment/ExperimentWater/water.controller.js");
const ExperimentGlucoseController = require("@/controllers/experiment/ExperimentGlucose/glucose.controller.js");

const routes = express.Router();

// ---------- POST ----------
routes.post("/teachers/:id/experiments", ExperimentController.create);

// ---------- GET ----------
routes.get("/students/:id/graphic", ExperimentWaterController.getTotalGraphic);
routes.get(
  "/students/initial-graphic",
  ExperimentWaterController.getInicialGrahic
);

routes.get("/experiments/pin/:pin", ExperimentController.getExperimentByPin);
routes.get(
  "/teachers/:teacherId/experiments/:experimentId",
  ExperimentController.getExperimentById
);
routes.get("/teachers/:id/experiments", ExperimentController.getAllExperiments);

routes.get(
  "/experiments/simulado",
  ExperimentGlucoseController.getExperimentSimulado
);
routes.get(
  "/experiments/options",
  ExperimentWaterController.getExperimentOptions
);
routes.get(
  "/experiments/optionOne",
  ExperimentWaterController.getExperimentOptionOne
);

// ---------- PUT ----------
routes.put(
  "/experiments/:id/update-experimet",
  ExperimentController.updateExperiment
);

// ---------- DELETE ----------
routes.delete("/experiments/:id", ExperimentController.delete);

module.exports = routes;

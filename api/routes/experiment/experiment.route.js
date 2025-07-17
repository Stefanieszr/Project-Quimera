const express = require("express");
const ExperimentController = require("../../controllers/experiment/experiment.controller.js");

const routes = express.Router();

// ---------- POST ----------
routes.post("/teachers/:id/experiments", ExperimentController.create);

// ---------- GET ----------
routes.get("/students/:id/graphic", ExperimentController.getTotalGraphic);
routes.get(
  "/students/:id/initial-graphic",
  ExperimentController.getInicialGrahic
);

routes.get("/experiments/pin/:pin", ExperimentController.getExperimentByPin);
routes.get(
  "/teachers/:teacherId/experiments/:experimentId",
  ExperimentController.getExperimentById
);
routes.get("/teachers/:id/experiments", ExperimentController.getAllExperiments);

routes.get("/experiments/options", ExperimentController.getExperimentOptions);
routes.get(
  "/experiments/optionOne",
  ExperimentController.getExperimentOptionOne
);

// ---------- PUT ----------
routes.put(
  "/experiments/:id/liberate-room",
  ExperimentController.updateLiberateRoom
);
routes.put(
  "/experiments/:id/liberate-result",
  ExperimentController.updateLiberateResult
);

// ---------- DELETE ----------
routes.delete("/experiments/:id", ExperimentController.delete);

module.exports = routes;

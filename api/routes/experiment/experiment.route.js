const express = require("express");
const jwt = require("jsonwebtoken");
const ExperimentController = require("../../controllers/experiment/experiment.controller.js");
const logger = require("@/logger/logger");

const routes = express.Router();

routes.post("/experiments/:teacherId", ExperimentController.create);

// Rota para liberar a sala de experimento
routes.put("/experiments/liberateRoom/:id", ExperimentController.updateLiberateRoom);

routes.delete("/experiments/:id", ExperimentController.delete);

routes.get("/experiments/pin/:pin", ExperimentController.findByPin);

routes.get("/experiments/getAnswer/:idStudent", ExperimentController.getGraphic);

routes.get("/experiments/getInicialAnswer/:idStudent", ExperimentController.getInicialGrahic);

routes.get("/experiments/:idStudent/graphic", ExperimentController.getStudentCreatedGraphic);

routes.get("/experiments/getOptions", ExperimentController.getOptions);

routes.get("/experiments/getPhaseOne", ExperimentController.getPhaseOne);

routes.get(
  "/experiments/:teacherId",
  ExperimentController.getExperimentsByTeacherId
);

routes.get(
  "/experiments/:teacherId/:experimentId",
  ExperimentController.getExperimentByTeacherAndExperimentId
);



module.exports = routes;

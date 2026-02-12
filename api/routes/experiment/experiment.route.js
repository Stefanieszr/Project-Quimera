const express = require("express");
const ExperimentController = require("@/controllers/experiment/experiment.controller.js");
const ExperimentWaterController = require("@/controllers/experiment/ExperimentWater/water.controller.js");
const ExperimentGlucoseController = require("@/controllers/experiment/ExperimentGlucose/glucose.controller.js");

const Joi = require("joi");
const routes = express.Router();

const validate = require("../../middleware/validate");
const {
  createExperimentSchema,
  updateExperimentSchema,
  experimentIdSchema,
  teacherIdSchema,
  pinSchema,
} = require("../../validation/experimentValidation");

const auth = require("../../middleware/auth");

// ---------- POST (BODY + PARAMS) ----------
routes.post(
  "/teachers/:id/experiments",
  auth,
  validate(teacherIdSchema, "params"),
  validate(createExperimentSchema, "body"),
  ExperimentController.create,
);

// ---------- GET (PARAMS) ----------
routes.get(
  "/students/:id/graphic",
  validate(experimentIdSchema, "params"),
  ExperimentWaterController.getTotalGraphic,
);

routes.get(
  "/students/initial-graphic",
  ExperimentWaterController.getInicialGrahic,
);

routes.get(
  "/experiments/pin/:pin",
  validate(pinSchema, "params"),
  ExperimentController.getExperimentByPin,
);

routes.get(
  "/teachers/:teacherId/experiments/:experimentId",
  auth,
  validate(
    Joi.object({
      teacherId: teacherIdSchema,
      experimentId: experimentIdSchema,
    }),
    "params",
  ),
  ExperimentController.getExperimentById,
);

routes.get(
  "/teachers/:id/experiments",
  auth,
  validate(teacherIdSchema, "params"),
  ExperimentController.getAllExperiments,
);

// ---------- GET (sem validação de entrada) ----------
routes.get(
  "/experiments/simulado",
  ExperimentGlucoseController.getExperimentSimulado,
);

routes.get(
  "/experiments/options",
  ExperimentWaterController.getExperimentOptions,
);

routes.get(
  "/experiments/optionOne",
  ExperimentWaterController.getExperimentOptionOne,
);

// ---------- PUT (PARAMS + BODY) ----------
routes.put(
  "/experiments/:id/update-experimet",
  auth,
  validate(experimentIdSchema, "params"),
  validate(updateExperimentSchema, "body"),
  ExperimentController.updateExperiment,
);

// ---------- DELETE (PARAMS) ----------
routes.delete(
  "/experiments/:id",
  auth,
  validate(experimentIdSchema, "params"),
  ExperimentController.delete,
);

module.exports = routes;

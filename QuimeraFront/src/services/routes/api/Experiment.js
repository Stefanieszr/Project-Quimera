import { api } from "../../api";

// ---------- POST ----------
function createExperiment(idTeacher, body) {
  return api.post(`/teachers/${idTeacher}/experiments`, body);
}

// ---------- GET ----------
async function getExperimentById(idTeacher, idExperiment) {
  return await api.get(`/teachers/${idTeacher}/experiments/${idExperiment}`);
}
async function getExperimentByPin(pin) {
  return await api.get(`/experiments/pin/${pin}`);
}
async function getAllExperiments(idTeacher) {
  return await api.get(`/teachers/${idTeacher}/experiments`);
}

async function getExperimentSimulado() {
  return await api.get(`/experiments/simulado`);
}
async function getExperimentOptions() {
  return await api.get(`/experiments/options`);
}
async function getExperimentOptionOne() {
  return await api.get(`/experiments/optionOne`);
}

async function getGraphic(id) {
  return await api.get(`/students/${id}/graphic`);
}
async function getInicialGraphic() {
  return await api.get(`/students/initial-graphic`);
}

// ---------- PUT ----------
async function updateExperiment(id, body) {
  return await api.put(`/experiments/${id}/update-experimet`, body);
}

// ---------- DELETE ----------
async function deleteExperiment(id) {
  return await api.delete(`experiments/${id}`);
}

export {
  getExperimentByPin,
  updateExperiment,
  createExperiment,
  getExperimentById,
  getAllExperiments,
  deleteExperiment,
  getExperimentSimulado,
  getExperimentOptions,
  getExperimentOptionOne,
  getGraphic,
  getInicialGraphic,
};

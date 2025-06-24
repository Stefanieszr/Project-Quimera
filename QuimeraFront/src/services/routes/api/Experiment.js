import { api } from "../../api";

function postExperiment(_idTeacher, body) {
  return api.post(`experiments/${_idTeacher}`, body);
}

async function findExperimentById(idTeacher, id) {
  return await api.get(`experiments/${idTeacher}/${id}`);
}

async function findExperiments(_idTeacher) {
  return await api.get(`experiments/${_idTeacher}`);
}

async function deleteExperiment(id) {
  return await api.delete(`experiments/${id}`);
}

async function getOptions() {
  return await api.get(`/experiments/getOptions`);
}

async function getPhaseOne() {
  return await api.get(`/experiments/getPhaseOne`);
}

async function getGraphic(id) {
  return await api.get(`/experiments/getAnswer/${id}`);
}

async function getInicialGraphic(id) {
  return await api.get(`/experiments/getInicialAnswer/${id}`);
}

async function getDataByPin(pin) {
  return await api.get(`/experiments/pin/${pin}`);
}

async function getCorrectGraphic(id) {
  return await api.get(`/experiments/correctGraphic/${id}`);
}

//rotas para todos os graficos de resultados

async function getTotalCorrectGraphic(id) {
  return await api.get(`/experiments/${id}/graphic`);
}

// rota para editar o liberateRoom e liberar a sala de experimento
async function liberateRoom(id, body) {
  return await api.put(`/experiments/liberateRoom/${id}`, body);
}

export {
  getDataByPin,
  getCorrectGraphic,
  postExperiment,
  findExperimentById,
  findExperiments,
  deleteExperiment,
  getOptions,
  getPhaseOne,
  getGraphic,
  getInicialGraphic,
  getTotalCorrectGraphic,
  liberateRoom,
};

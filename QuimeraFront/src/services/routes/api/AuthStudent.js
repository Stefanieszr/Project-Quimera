import { api } from "../../api";

async function createStudent(body) {
  return await api.post("student", body);
}

async function getStudentById(id) {
  return await api.get(`/student/by-id/${id}`);
}

async function getStudentByPin(pin) {
  return await api.get(`/student/by-pin/${pin}`);
}
async function updateStudent(body) {
  return await api.put(`/student/update`, body);
}

export { createStudent, getStudentByPin, getStudentById, updateStudent };

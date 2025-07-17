import { api } from "../../api";

async function createStudent(body) {
  return await api.post("student", body);
}

async function getStudentByPin(pin) {
  return await api.get(`student/${pin}`);
}
async function postAnswer(id, body) {
  return await api.post(`/student/answer/${id}`, body);
}
export { createStudent, getStudentByPin, postAnswer };

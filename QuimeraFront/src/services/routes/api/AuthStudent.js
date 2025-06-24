import { api } from "../../api";

async function registerStudent(body) {
  return await api.post("students", body);
}

async function getStudentByPin(pin) {
  return await api.get(`students/${pin}`);
}
async function postAnswer(id, body) {
  return await api.post(`/students/answer/${id}`, body);
}
export { registerStudent, getStudentByPin, postAnswer };

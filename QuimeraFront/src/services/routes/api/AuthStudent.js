import { api } from "../../api";

async function createStudent(body) {
  return await api.post("student", body);
}

async function getStudentByPin(pin) {
  return await api.get(`student/${pin}`);
}
async function updateStudent(body) {
  return await api.put(`/student/update`, body);
}
export { createStudent, getStudentByPin, updateStudent };

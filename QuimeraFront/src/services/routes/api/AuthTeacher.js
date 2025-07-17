import { api } from "../../api";

async function createTeacher(name, email, password) {
  const body = { name, email, password };
  return await api.post("createTeacher", body);
}

async function loginTeacher(email, password) {
  const body = { email, password };
  return await api.post("loginTeacher", body);
}

export { createTeacher, loginTeacher };

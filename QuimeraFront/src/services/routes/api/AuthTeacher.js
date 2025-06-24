import { api } from "../../api";

async function registerTeacher(name, email, password) {
  const body = { name, email, password };
  return await api.post("registerTeacher", body);
}

async function loginTeacher(email, password) {
  const body = { email, password };
  return await api.post("loginTeacher", body);
}

export { registerTeacher, loginTeacher };

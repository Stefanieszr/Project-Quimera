import { io } from "socket.io-client";

import { BASE_URL } from "./api";

let socket;

export function setupSocketConnection(pin) {
  if (!socket || !socket.connected) {
    socket = io(BASE_URL); // URL centralizada aqui!

    socket.on("connect", () => {
      console.log("Socket conectado com sucesso:", socket.id);
      socket.emit("join_room", pin);
    });
  }
}

export function listenForExperimentUpdate(callback) {
  if (socket) {
    console.log("experimento atualizado");
    socket.off("experiment_update");
    socket.on("experiment_update", (updatedExperiment) => {
      callback(updatedExperiment);
    });
  }
}

export function listenForStudent(callback) {
  if (socket) {
    console.log("alunooo atualizado");
    socket.off("student_update"); // Remove qualquer listener antigo
    socket.on("student_update", (updatedStudents) => {
      callback(updatedStudents);
    });
  }
  return () => {
    console.log("desconectado");
    socket.disconnect();
  };
}

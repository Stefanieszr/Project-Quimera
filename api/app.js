require("module-alias/register");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io"); // Importar o Server do Socket.IO

const studentRoutes = require("./routes/auth/student.route");
const teacherRoutes = require("./routes/auth/teacher.route");
const experimentsRoutes = require("./routes/experiment/experiment.route");

const app = express();
const server = http.createServer(app); // Criar um servidor HTTP a partir do seu app Express

// Configurar o Socket.IO e o CORS para WebSockets
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

// DB CONNECTION
const conn = require("./database/conn");
conn();

// Configuração das rotas Express
app.use(studentRoutes);
app.use(teacherRoutes);
app.use(experimentsRoutes);

// Lógica do Socket.IO para lidar com as conexões (opcional, mas bom para log)
io.on("connection", (socket) => {
  console.log(`Um cliente se conectou: ${socket.id}`);

  // Você pode ter eventos para o cliente "entrar" em uma sala específica (baseado no PIN do experimento)
  socket.on("join_room", (pin) => {
    socket.join(pin); // Adiciona o socket à "sala" com o ID do PIN
    console.log(`Cliente ${socket.id} entrou na sala: ${pin}`);
  });

  socket.on("disconnect", () => {
    console.log(`Um cliente se desconectou: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3010; // Usando a porta que você já definiu

// 8. O servidor HTTP (que inclui Express e Socket.IO) escuta na porta
server.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

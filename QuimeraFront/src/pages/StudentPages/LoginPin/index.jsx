import "./style.css";
import { Card, Input, Button } from "antd";
import LogoHA from "assets/logoHA.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { registerStudent } from "../../../../src/services/routes/api/AuthStudent";

export default function LoginPin() {
  const [pin, setPin] = React.useState("");
  // const [idStudent, setIdStudent] = React.useState("");
  const [name, setName] = React.useState("");
  const navigate = useNavigate();

  function validatePin(pin, name) {
    const pinRegex = /^\d{4}$/;
    if (!pinRegex.test(pin)) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "O PIN deve conter exatamente 4 números",
      });
      return false;
    }
    if (name.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "O nome do aluno deve ser preenchido",
      });
      return false;
    }
    return true;
  }
  function handleLogin() {
    if (validatePin(pin, name)) {
      const body = {
        name: name,
        pin: pin,
      };
      registerStudent(body)
        .then((response) => {
          const student = response.data.student;
          localStorage.setItem("idStudent", student._id);
          if (student.title.includes("Água")) {
            navigate(`/waitingroom/Water/${pin}`);
          } else if (student.title.includes("Glicose")) {
            navigate(`/waitingroom/Glucose/${pin}`);
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: err.response.data.message,
          });
        });
    }
  }

  return (
    <div className="container-LoginPin">
      <Card className="card-loginPin">
        <div className="content-loginPin">
          <img src={LogoHA} alt="Logo" className="logo-loginpin" />
          <Input
            placeholder="ROOM PIN"
            className="input-loginPin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={4}
          />
          <Input
            placeholder="STUDENT NAME"
            className="input-loginPin"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
          />
          <Button className="button-loginPin" onClick={handleLogin}>
            Enter the Room
          </Button>
          <span>
            Are you a teacher?
            <button
              onClick={() => navigate("/loginTeacher")}
              style={{
                background: "none",
                border: "none",
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Clique Aqui!
            </button>
          </span>
        </div>
      </Card>
    </div>
  );
}

import { Card, Input, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import styles from "./styles.module.css";

import LogoHA from "@/assets/logoHA.png";
import { createStudent } from "@/services/routes/api/AuthStudent";

export default function LoginPin() {
  const [pin, setPin] = React.useState("");
  // const [idStudent, setIdStudent] = React.useState("");
  const [name, setName] = React.useState("");
  const navigate = useNavigate();

  function handleLogin() {
    const body = {
      name: name,
      pin: pin,
    };
    createStudent(body)
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

  return (
    <div className={styles.containerLoginPin}>
      <Card className={styles.cardloginPin}>
        <div className={styles.contentloginPin}>
          <img src={LogoHA} alt="Logo" className={styles.logologinpin} />
          <Input
            placeholder="ROOM PIN"
            className={styles.inputloginPin}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={4}
          />
          <Input
            placeholder="STUDENT NAME"
            className={styles.inputloginPin}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
          />
          <Button className={styles.buttonloginPin} onClick={handleLogin}>
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

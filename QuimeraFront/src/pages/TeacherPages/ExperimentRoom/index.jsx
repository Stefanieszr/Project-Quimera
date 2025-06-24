import { Card, Button } from "antd";
import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "./styles.css";
import BaseAuth from "@/components/BaseAuth";
import { getStudentByPin } from "@/services/routes/api/AuthStudent";
import {
  findExperimentById,
  liberateRoom,
} from "@/services/routes/api/Experiment";

export default function ExperimentRoom() {
  const navigate = useNavigate();
  const { idValue, pinValue } = useParams();
  const [students, setStudents] = React.useState([]);
  const [responseExperiment, setResponseExperiment] = React.useState([]);
  const [buttonClicked, setButtonClicked] = React.useState(false);

  const handleGoBack = () => {
    Swal.fire({
      icon: "warning",
      title: "Tem certeza?",
      text: "Tem certeza que deseja sair da sala?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, sair!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/dashboard");
        localStorage.removeItem("buttonClicked");
      }
    });
  };

  const teacherId = localStorage.getItem("_idTeacher");
  React.useEffect(() => {
    const interval = setInterval(() => {
      getStudentByPin(pinValue)
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            console.log("Alunos não encontrados para esse pin.");
          }
        });
      findExperimentById(teacherId, idValue).then((response) => {
        setResponseExperiment(response.data.experiment);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [idValue, pinValue, teacherId]);

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "Warning",
      title: "Tem certeza?",
      text: "Tem certeza que deseja liberar o resultado aos alunos?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, liberar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Resultado liberado com sucesso!",
        });
        liberateRoom(idValue, { liberateRoom: true }).then((response) => {
          console.log("response liberateRoom:", response);
        });
        setButtonClicked(true);
      }
    });
  };

  return (
    <BaseAuth>
      <div className="colDivContent">
        <div className="btnDivBack">
          <Button onClick={handleGoBack} className="btnGoBack">
            <HiOutlineArrowLeft />
            Voltar
          </Button>
        </div>
        <Card className="card-login">
          <div className="divpinsala">
            <h3 className="pindasala">
              Room Pin: <b>{pinValue}</b>
            </h3>
          </div>
          <div className="divpinsala marginBottom">
            <label className="labelexperimento">
              Título do Experimento: <b>{responseExperiment.title}</b>
            </label>
          </div>
          <div className="divpinsala marginTop marginBottom">
            <b className="bAlunos">Alunos:</b>
          </div>
          <div className="divpinsalaCol">
            {students.map((student) => (
              <div key={student.id} className="marginBottomLess">
                <label>{student.name}</label>
              </div>
            ))}
          </div>
          <div className="divpinsala marginBottom">
            <Button
              className="button-login"
              onClick={showSuccessAlert}
              disabled={buttonClicked}
            >
              {buttonClicked ? "Liberando resultado" : "Liberar resultado"}
            </Button>
          </div>
        </Card>
      </div>
    </BaseAuth>
  );
}

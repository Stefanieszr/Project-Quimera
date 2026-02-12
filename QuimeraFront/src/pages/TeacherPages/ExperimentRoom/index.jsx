import { Card, Button } from "antd";
import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import styles from "./styles.module.css";

import BaseAuth from "@/components/BaseAuth";
import { getStudentByPin } from "@/services/routes/api/AuthStudent";
import {
  getExperimentById,
  createExperiment,
  updateExperiment,
} from "@/services/routes/api/Experiment";
import {
  setupSocketConnection,
  listenForStudent,
} from "@/services/socketService";

export default function ExperimentRoom() {
  const navigate = useNavigate();
  const { idValue, pinValue } = useParams();
  const [students, setStudents] = React.useState([]);
  const [experimentDetails, setExperimentDetails] = React.useState([]);
  const [buttonResult, setButtonResult] = React.useState(false);
  const [buttonExperiment, setButtonExperiment] = React.useState(false);
  const [buttonRemake, setButtonRemake] = React.useState(false);
  const teacherId = localStorage.getItem("_idTeacher");

  const confirmAction = (text, confirmText, actionFn) => {
    Swal.fire({
      icon: "warning",
      title: "Tem certeza?",
      text: text,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText,
    }).then((result) => {
      if (result.isConfirmed) {
        actionFn();
      }
    });
  };

  // Hook para buscar alunos em tempo real
  React.useEffect(() => {
    setupSocketConnection(pinValue);
    listenForStudent((updatedStudents) => {
      setStudents(updatedStudents);
    });
  }, [pinValue]);

  // Hook para buscar detalhes do experimento
  React.useEffect(() => {
    const fetchExperimentDetails = async () => {
      try {
        if (!pinValue || isNaN(Number(pinValue))) {
          return;
        }
        const response = await getExperimentById(teacherId, idValue);
        setExperimentDetails(response.data.experiment);

        const alunos = await getStudentByPin(pinValue);
        setStudents(alunos.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text:
            error.response?.data?.message || "Ocorreu um erro desconhecido.",
        });
      }
    };
    fetchExperimentDetails();
  }, [idValue, teacherId, pinValue]);

  const handleGoBack = () => {
    confirmAction("Tem certeza que deseja sair da sala?", "Sim, sair!", () => {
      navigate("/dashboard");
      localStorage.removeItem("buttonClicked");
    });
  };
  const showAlertResult = () => {
    confirmAction(
      "Tem certeza que deseja liberar o resultado aos alunos?",
      "Sim, liberar!",
      async () => {
        setButtonResult(true); // Desabilita o botão
        try {
          const body = {
            liberateResult: true,
            pinRoom: pinValue,
          };
          await updateExperiment(idValue, body);
          Swal.fire({
            icon: "success",
            title: "Resultado liberado com sucesso!",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Erro ao liberar resultado!",
            text:
              error.response?.data?.message || "Ocorreu um erro desconhecido.",
          });
        } finally {
          setButtonResult(false); // Reabilita o botão (para caso de erro, permitir nova tentativa)
        }
      },
    );
  };

  const showAlertExperiment = () => {
    confirmAction(
      "Tem certeza que deseja liberar o experimento aos alunos?",
      "Sim, liberar!",
      async () => {
        setButtonExperiment(true); // Desabilita o botão
        try {
          const body = {
            liberateRoom: true,
            pinRoom: pinValue,
          };
          const response = await updateExperiment(idValue, body);
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Experimento liberado com sucesso!",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Erro ao liberar experimento!",
            text:
              error.response?.data?.message || "Ocorreu um erro desconhecido.",
          });
        } finally {
          setButtonExperiment(false); // Reabilita o botão
        }
      },
    );
  };

  const showAlertRemake = () => {
    confirmAction(
      "Tem certeza que deseja refazer o experimento aos alunos?",
      "Sim, refazer!",
      async () => {
        setButtonRemake(true); // Desabilita o botão
        try {
          if (!experimentDetails) {
            Swal.fire({
              icon: "error",
              title: "Erro!",
              text: "Detalhes do experimento não carregados.",
            });
            return;
          }
          const body = {
            title: experimentDetails.title,
            titleActivity: `${experimentDetails.titleActivity} - 2`,
            description: experimentDetails.description,
          };
          const response = await createExperiment(
            experimentDetails.teacher,
            body
          );
          Swal.fire({
            icon: "success",
            title: "Experimento criado com sucesso!",
          }).finally(() => {
            navigate(
              `/experimentroom/${response.data.experiment._id}/${response.data.experiment.pin}`
            );
          });
        } catch (error) {
          console.error("Erro ao refazer experimento:", error);
          Swal.fire({
            icon: "error",
            title: "Erro ao refazer experimento!",
            text: "Tente novamente.",
          });
        } finally {
          setButtonRemake(false); // Reabilita o botão
        }
      }
    );
  };
  if (!experimentDetails) {
    return <BaseAuth>Carregando experimento...</BaseAuth>;
  }

  return (
    <BaseAuth>
      <div className={styles.colDivContent}>
        <div className={styles.btnDivBack}>
          <Button onClick={handleGoBack} className={styles.btnGoBack}>
            <HiOutlineArrowLeft />
            Voltar
          </Button>
        </div>
        <Card className={styles.cardRoom}>
          <div className={styles.divpinsala}>
            <h3 className={styles.pindasala}>
              Pin da Sala: <b>{pinValue}</b>
            </h3>
          </div>
          <div className={`${styles.divpinsala} ${styles.marginBottom}`}>
            <label className={styles.labelexperimento}>
              Título do Experimento: <b>{experimentDetails.title}</b>
            </label>
          </div>
          <div
            className={`${styles.divpinsala} ${styles.marginTop} ${styles.marginBottom}`}
          >
            <b className={styles.bAlunos}>Alunos:</b>
          </div>
          <div className={styles.divpinsalaCol}>
            {students.length === 0 ? (
              <span className={styles.marginBottomLess}>
                Nenhum aluno entrou na sala
              </span>
            ) : (
              students.map((student) => (
                <div key={student.id} className={styles.marginBottomLess}>
                  <label>{student.name}</label>
                </div>
              ))
            )}
          </div>
          <div className={`${styles.divButton}`}>
            <Button
              className={styles.buttonLogin}
              onClick={showAlertRemake}
              disabled={buttonRemake}
            >
              {buttonRemake ? "Reiniciando experimento" : "Refazer experimento"}
            </Button>
            <Button
              className={styles.buttonLogin}
              onClick={showAlertExperiment}
              disabled={buttonExperiment}
            >
              {buttonExperiment
                ? "Liberando experimento"
                : "Liberar experimento"}
            </Button>
            <Button
              className={styles.buttonLogin}
              onClick={showAlertResult}
              disabled={buttonResult}
            >
              {buttonResult ? "Liberando resultado" : "Liberar resultado"}
            </Button>
          </div>
        </Card>
      </div>
    </BaseAuth>
  );
}

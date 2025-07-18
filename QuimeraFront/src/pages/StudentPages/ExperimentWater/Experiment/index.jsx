import { Card } from "antd";
import React from "react";
import { MdOutlineBiotech } from "react-icons/md";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import styles from "./styles.module.css";

import Base from "@/components/BaseLayoutStudent";
import OptionSelector from "@/components/Experiment";
import { useExperiment } from "@/hooks/useExperiment";
import WaterfallChart from "@/pages/StudentPages/WaterfallChart";
import { updateStudent } from "@/services/routes/api/AuthStudent";

const Experiment = () => {
  const { pin } = useParams();
  const idStudent = localStorage.getItem("idStudent");

  // Hook personalizado que encapsula a lógica de dados do experimento
  const {
    options,
    graphic,
    inicialGraphic,
    experimentData,
    liberateRoomValue,
    fetchStudentGraphic,
  } = useExperiment(pin, idStudent);

  // Controle de visibilidade dos cards de opções OP1 e OP2
  const [showB1, setShowB1] = React.useState(false);
  const [showB2, setShowB2] = React.useState(false);

  // Armazena qual opção foi selecionada para OP1 e OP2 (por value)
  const [selectedOptionB1, setSelectedOptionB1] = React.useState("");
  const [selectedOptionB2, setSelectedOptionB2] = React.useState("");

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const getSelectedLabelB1 = () => {
    const selectedOption = options.optionsOne.find(
      (option) => option.value === selectedOptionB1
    );
    return selectedOption ? selectedOption.label : "Nenhuma";
  };
  const getSelectedLabelB2 = () => {
    const selectedOption = options.optionsTwo.find(
      (option) => option.value === selectedOptionB2
    );
    return selectedOption ? selectedOption.label : "Nenhuma";
  };

  const handleSubmitAnswers = async () => {
    const answerOne = options.optionsOne.find(
      (option) => option.value === selectedOptionB1
    );

    const answerTwo = options.optionsTwo.find(
      (option) => option.value === selectedOptionB2
    );

    const body = {
      studentId: idStudent,
      answers: [
        { questionText: "answerOne", answerText: answerOne.label },
        { questionText: "answerTwo", answerText: answerTwo.label },
      ],
    };

    await updateStudent(body);
    Swal.fire({
      icon: "success",
      title: "Resposta enviada com sucesso!",
      showConfirmButton: false,
      timer: 1500,
    });
    fetchStudentGraphic(idStudent);
    setIsButtonDisabled(true);
  };

  React.useEffect(() => {
    if (selectedOptionB1 && selectedOptionB2) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  }, [selectedOptionB1, selectedOptionB2]);

  return (
    <Base
      goTo={"/"}
      Icon={<MdOutlineBiotech />}
      goToName={`Sala do experimento: ${pin}`}
      titlepage={`${experimentData.title}`}
      descriptionPage={`${experimentData.description} Considerando o caso clínico, responda as perguntas a seguir.`}
      children={
        <div className={styles.divCol}>
          {liberateRoomValue && (
            <Card className={styles.notaCard}>
              <h3 className={styles.titleNotaCard}>
                SUA NOTA FOI:{" "}
                <b className={styles.pontosNotaCard}>
                  {graphic?.data?.nota} PONTOS
                </b>
              </h3>
            </Card>
          )}
          <div className={styles.divCards}>
            <Card className={styles.cardChartsExperiment}>
              <p className={styles.subtitleCardExperiment}>
                Informe OP1 e OP2 (Opções) para realizar o experimento
              </p>
              <div className={styles.contentChoicesCardExperiment}>
                <OptionSelector
                  label="OP1"
                  isVisible={showB1}
                  setIsVisible={setShowB1}
                  selectedValue={selectedOptionB1}
                  options={options.optionsOne}
                  onSelect={setSelectedOptionB1}
                  getSelectedLabel={getSelectedLabelB1}
                  isDisabled={liberateRoomValue}
                />
                <OptionSelector
                  label="OP2"
                  isVisible={showB2}
                  setIsVisible={setShowB2}
                  selectedValue={selectedOptionB2}
                  options={options.optionsTwo}
                  onSelect={setSelectedOptionB2}
                  getSelectedLabel={getSelectedLabelB2}
                  isDisabled={liberateRoomValue}
                />

                <div className={styles.contentB1Choices}>
                  <button
                    className={styles.btnRealizarExperimento}
                    disabled={isButtonDisabled}
                    onClick={handleSubmitAnswers}
                  >
                    {liberateRoomValue
                      ? "Experimento realizado"
                      : "Realizar experimento"}
                  </button>
                </div>
              </div>
            </Card>
            <Card className={styles.cardChartsExperiment}>
              {liberateRoomValue && <h3>{graphic?.data?.mensagem}</h3>}
              {!liberateRoomValue && (
                <h3>Aguardando resultado ser liberado...</h3>
              )}
              <div className={styles.contentChartCardExperiments}>
                {(liberateRoomValue && graphic?.data?.expectedValue) ||
                (!liberateRoomValue && inicialGraphic?.data?.expectedValue) ? (
                  <WaterfallChart
                    experimentData={
                      liberateRoomValue
                        ? graphic?.data.expectedValue
                        : inicialGraphic?.data.expectedValue
                    }
                    studentData={
                      liberateRoomValue
                        ? graphic?.data.studentValue
                        : inicialGraphic?.data.studentValue
                    }
                  />
                ) : (
                  <h3>Carregando gráfico...</h3>
                )}
              </div>
            </Card>
          </div>
        </div>
      }
    />
  );
};

export default Experiment;

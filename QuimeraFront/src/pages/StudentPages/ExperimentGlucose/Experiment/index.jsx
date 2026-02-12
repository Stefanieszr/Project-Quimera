import { Card, Carousel } from "antd";
import React, { useRef, useState, useEffect } from "react"; // Importe useState
import { MdOutlineBiotech } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceArea,
  Label,
} from "recharts";
import Swal from "sweetalert2";

import styles from "./styles.module.css";

import Dog from "@/components/animation/DogWaiting/Dog";
import Base from "@/components/BaseLayoutStudent";
import CardChecked from "@/components/CardChecked";
import {
  getStudentById,
  updateStudent,
} from "@/services/routes/api/AuthStudent";
import {
  getExperimentByPin,
  getExperimentSimulado,
} from "@/services/routes/api/Experiment";
import {
  setupSocketConnection,
  listenForExperimentUpdate,
} from "@/services/socketService";

const ExperimentTemperature = () => {
  const { pin } = useParams();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [experimentData, setExperimentData] = useState([]);
  const [simulado, setSimulado] = useState([]);
  const [student, setStudent] = useState(null);
  const [score, setScore] = useState(null);
  const carouselRef = useRef(null);
  const idStudent = localStorage.getItem("idStudent");

  const data = [
    { tempo: 0, glicemia: 90 },
    { tempo: 1, glicemia: 95 },
    { tempo: 2, glicemia: 120 },
    { tempo: 3, glicemia: 160 },
    { tempo: 4, glicemia: 200 },
    { tempo: 5, glicemia: 180 },
    { tempo: 6, glicemia: 140 },
    { tempo: 7, glicemia: 110 },
    { tempo: 8, glicemia: 115 },
    { tempo: 9, glicemia: 150 },
    { tempo: 10, glicemia: 190 },
  ];

  React.useEffect(() => {
    const fetchExperimentDetails = async () => {
      try {
        // Busca os dados do experimentos
        const experiment = await getExperimentByPin(pin);
        setExperimentData(experiment.data);

        const simulado = await getExperimentSimulado();
        setSimulado(simulado.data);

        const responseStudent = await getStudentById(idStudent);
        setStudent(responseStudent.data);
        const answers = responseStudent.data.answers;
        if (answers.length > 1) {
          carouselRef.current.goTo(answers.length);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text:
            error.response?.data?.message ||
            "Ocorreu um erro desconhecido ao tentar criar um novo experimento.",
        });
      }
    };
    fetchExperimentDetails();
  }, [pin, idStudent]);

  // Hook para buscar alteração no experimento em tempo real
  useEffect(() => {
    setupSocketConnection(pin);
    listenForExperimentUpdate((updatedExperiment) => {
      setExperimentData(updatedExperiment);
    });
  }, [pin]);

  // Recalcula a nota quando resultado for liberado
  useEffect(() => {
    if (experimentData.liberateResult && student) {
      let total = simulado.length;
      let correct = 0;

      student.answers.forEach((ans) => {
        simulado.forEach((s) => {
          if (s.id === ans.questionText) {
            console.log(ans.answerText, s.Resposta);
            if (s.Resposta === ans.answerText) {
              correct++;
            }
          }
          return;
        });
      });

      setScore(((correct / total) * 10).toFixed(1)); // nota de 0 a 10
    }
  }, [experimentData, simulado, student]);

  // Função para lidar com a seleção de uma alternativa
  const handleOptionSelect = (questionIndex, selectedAlternative) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionIndex]: selectedAlternative, // Armazena a alternativa selecionada para a pergunta específica
    }));
  };

  const submitAnswers = async () => {
    try {
      const body = {
        studentId: idStudent,
        answers: Object.entries(selectedOptions).map(
          ([questionText, answerText]) => ({
            questionText,
            answerText,
          }),
        ),
      };
      await updateStudent(body);
      Swal.fire({
        icon: "success",
        title: "Resposta enviada com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Função para avançar para o próximo slide
  const goToNext = () => {
    // Verifica se é o ultimo slide
    let indice = currentSlideIndex + 1;
    if (indice === simulado.length) {
      // setLastSlide(true);
      // Envia a resposta
      submitAnswers();
    }

    // Verifica se a pergunta atual foi respondida
    if (selectedOptions[currentSlideIndex]) {
      // Se existe uma opção para o índice atual
      if (carouselRef.current) {
        carouselRef.current.next();
      }
    }
  };

  // Callback que é disparado após a mudança de slide no Carousel
  const onSlideChange = (current) => {
    setCurrentSlideIndex(current); // Atualiza o índice do slide atual
  };

  // Verifica se a pergunta atual tem uma alternativa selecionada
  const isCurrentQuestionAnswered = selectedOptions[currentSlideIndex];

  return (
    <Base
      goTo={"/"}
      Icon={<MdOutlineBiotech />}
      goToName={`Sala do experimento: ${pin}`}
      titlepage={`${experimentData.title}`}
      descriptionPage={`${experimentData.description} Considerando o caso clínico, responda as perguntas a seguir.`}
      children={
        <Card className={styles.cardChartsExperiment}>
          <Carousel
            ref={carouselRef}
            arrows={false}
            dots={false}
            infinite={false}
            // Adiciona o callback afterChange para atualizar o slide atual
            afterChange={onSlideChange}
          >
            {simulado.map((quest, idx) => (
              <div key={idx} className={styles.cardContainer}>
                {/* <p className={styles.pergunta}>{quest.Pergunta}</p> */}
                <p>
                  Você está partindo de uma glicemia plasmática
                  fisiológica/normal, mas a seguir o animal vai se alimentar
                  (regularmente) de sua ração de boa qualidade. Defina o que
                  aconteceu a partir daí. Selecione a opção correta no que se
                  refere à glicemia bem como seu controle hormonal representado
                  nas situações 1, 2 e 3.
                </p>
                <section>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                      data={data}
                      margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="tempo"
                        label={{
                          value: "Tempo",
                          position: "insideBottom",
                          offset: -10,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Glicemia",
                          angle: -90,
                          position: "insideLeft",
                          offset: 10,
                        }}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="glicemia"
                        stroke="#000"
                        strokeWidth={3}
                        dot={false}
                      />

                      {/* Pontos de referência */}
                      <ReferenceDot
                        x={1}
                        y={80}
                        r={15}
                        label={{
                          value: "1",
                          fill: "white",
                        }}
                        stroke="white"
                        fill="#46cb37"
                      />
                      <ReferenceDot
                        x={6}
                        y={80}
                        r={15}
                        label={{
                          value: "2",
                          fill: "white",
                        }}
                        stroke="white"
                        fill="#46cb37"
                      />
                      <ReferenceDot
                        x={9}
                        y={80}
                        r={15}
                        label={{
                          value: "3",
                          fill: "white",
                        }}
                        stroke="white"
                        fill="#46cb37"
                      />

                      {/* Área de estresse */}
                      <ReferenceArea
                        x1={8}
                        x2={9}
                        y1={120}
                        y2={140}
                        fill="rgba(33, 150, 243, 0.5)"
                      >
                        <Label
                          value="STRESS"
                          position="insideTop"
                          fill="white"
                        />
                      </ReferenceArea>
                    </LineChart>
                  </ResponsiveContainer>
                </section>
                <div className={styles.cardChoices}>
                  <button className={styles.buttonExperiment}>
                    Selecione a opção correta: {quest.Pergunta}
                  </button>
                  <div className={styles.minHeight}>
                    {quest.Alternativas.map((item, index) => (
                      <div key={index}>
                        <CardChecked
                          // Passa o índice da pergunta e a alternativa para a função de seleção
                          handleClick={() => handleOptionSelect(quest.id, item)}
                          // Verifica se a alternativa atual é a selecionada para esta pergunta
                          isClicked={selectedOptions[quest.id] === item}
                        >
                          {item}
                        </CardChecked>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.contentChoices}>
                  <button
                    className={styles.btnRealizarExperimento}
                    onClick={goToNext}
                    disabled={!isCurrentQuestionAnswered}
                  >
                    Próximo
                  </button>
                </div>
              </div>
            ))}

            <div className={styles.WaitingResult}>
              {experimentData.liberateResult ? (
                <>
                  <h2>Resultado Liberado!</h2>
                  <p>Sua nota foi:</p>
                  <h1 className={styles.score}>{score ?? "0.0"}</h1>
                </>
              ) : (
                <>
                  <Dog />
                  <h3>Aguardando o professor liberar o resultado...</h3>
                </>
              )}
            </div>
          </Carousel>
        </Card>
      }
    />
  );
};

export default ExperimentTemperature;

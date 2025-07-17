import { Card, Carousel } from "antd";
import React, { useRef, useState } from "react"; // Importe useState
import { MdOutlineBiotech } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getExperimentByPin } from "services/routes/api/Experiment";

import styles from "./styles.module.css";

import Base from "@/components/BaseLayoutStudent";
import CardChecked from "@/components/CardChecked";

const ExperimentTemperature = () => {
  const { pin } = useParams();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [experimentData, setExperimentData] = useState([]);
  const [lastSlide, setLastSlide] = useState(false);
  const carouselRef = useRef(null);

  React.useEffect(() => {
    // Busca os dados do experimentos
    getExperimentByPin(pin).then((response) => {
      setExperimentData(response.data.experiment);
    });
  }, [pin]);

  // Função para lidar com a seleção de uma alternativa
  const handleOptionSelect = (questionIndex, selectedAlternative) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionIndex]: selectedAlternative, // Armazena a alternativa selecionada para a pergunta específica
    }));
  };

  // Função para avançar para o próximo slide
  const goToNext = () => {
    // Verifica se é o ultimo slide
    let indice = currentSlideIndex + 1;
    if (indice === simulado.length) {
      setLastSlide(true);
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
                <p className={styles.pergunta}>{quest.Pergunta}</p>
                <div className={styles.cardChoices}>
                  <button className={styles.buttonExperiment}>
                    Escolha uma alternativa
                  </button>
                  <div className={styles.minHeight}>
                    {quest.Alternativas.map((item, index) => (
                      <div key={index}>
                        <CardChecked
                          // Passa o índice da pergunta e a alternativa para a função de seleção
                          handleClick={() => handleOptionSelect(idx, item)}
                          // Verifica se a alternativa atual é a selecionada para esta pergunta
                          isClicked={selectedOptions[idx] === item}
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
            {lastSlide && (
              <div className={styles.cardContainer}>
                <p className={styles.pergunta}>
                  Sua resposta foi enviada, aguarde a liberação do resultado...
                </p>
              </div>
            )}
          </Carousel>
        </Card>
      }
    />
  );
};

const simulado = [
  {
    Pergunta:
      "1. Após a alimentação, especialmente quando baseada em carboidratos, ocorre um aumento na quantidade de glicose no sangue do animal. Qual é o principal hormônio liberado e seu órgão responsável, em resposta a esse aumento?",
    RespostaCorreta: "homonio tal",
    Alternativas: [
      "hormonio a",
      "hormonio b",
      "hormonio c",
      "hormonio tal",
      "hormonio d",
    ],
  },
  {
    Pergunta:
      "2. Considerando o tempo decorrido desde a última refeição (Jejum), ou a própria atividade física natural do animal. Qual será a resposta fisiológica do animal, sem nenhuma patogenia?",
    RespostaCorreta: "homonio tall", // Corrigi aqui para bater com as alternativas
    Alternativas: [
      "hormonio aa",
      "hormonio bb",
      "hormonio cc",
      "hormonio tall",
      "hormonio dd",
    ],
  },
  {
    Pergunta:
      "3. Pipoca experimentou um nível intenso de estresse devido à ida ao hospital e ao exame físico realizado. Como consequência, houve um aumento significativo em sua glicemia. O que justifica esse aumento na glicemia e qual substância é responsável por promovê-lo?",
    RespostaCorreta: "homonio tal",
    Alternativas: [
      "hormonio a",
      "hormonio b",
      "hormonio c",
      "hormonio tal",
      "hormonio d",
    ],
  },
];

export default ExperimentTemperature;

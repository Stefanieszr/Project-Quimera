import { useEffect, useState } from "react";

import {
  getExperimentOptions,
  getGraphic,
  getExperimentByPin,
  getInicialGraphic,
} from "@/services/routes/api/Experiment";
import {
  setupSocketConnection,
  listenForExperimentUpdate,
} from "@/services/socketService";

export const useExperiment = (pin, idStudent) => {
  const [options, setOptions] = useState({ optionsOne: [], optionsTwo: [] });
  const [graphic, setGraphic] = useState({});
  const [inicialGraphic, setInicialGraphic] = useState({});
  const [experimentData, setExperimentData] = useState({});
  const [liberateRoomValue, setLiberateRoomValue] = useState(false);

  // Pega dados iniciais do experimento
  useEffect(() => {
    const fetchExperimentDetails = async () => {
      try {
        if (!pin) return;

        const [experimentOptions, experiment, graphicInicial] =
          await Promise.all([
            getExperimentOptions(),
            getExperimentByPin(pin),
            getInicialGraphic(),
          ]);

        setOptions({
          optionsOne: experimentOptions.data.optionsOne,
          optionsTwo: experimentOptions.data.optionsTwo,
        });

        setExperimentData(experiment.data);
        setLiberateRoomValue(experiment.data.liberateResult);
        setInicialGraphic(graphicInicial.data);
      } catch (e) {
        console.error("Erro ao buscar dados do experimento:", e);
      }
    };

    fetchExperimentDetails();
  }, [pin]);

  // Escuta atualizações em tempo real do experimento
  useEffect(() => {
    if (!pin) return;

    setupSocketConnection(pin);

    listenForExperimentUpdate((updatedExperiment) => {
      setLiberateRoomValue(updatedExperiment.liberateResult);
      setExperimentData(updatedExperiment);
    });
  }, [pin]);

  // Busca gráfico do aluno
  const fetchStudentGraphic = async (idStudent) => {
    if (!idStudent) return;
    try {
      const response = await getGraphic(idStudent);
      setGraphic(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar gráfico do aluno:", error);
    }
  };

  useEffect(() => {
    fetchStudentGraphic(idStudent);
  }, [idStudent]);

  return {
    options,
    graphic,
    inicialGraphic,
    experimentData,
    liberateRoomValue,
    fetchStudentGraphic,
  };
};

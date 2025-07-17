import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles.module.css";

import Dog from "@/components/animation/DogWaiting/Dog";
import BaseAuth from "@/components/BaseAuth";
import {
  setupSocketConnection,
  listenForExperimentUpdate,
} from "@/services/socketService";

const WaitingRoom = () => {
  const { pin } = useParams();
  const { tipo } = useParams();
  const navigate = useNavigate();

  // Hook para buscar alteração no experimento em tempo real
  React.useEffect(() => {
    setupSocketConnection(pin);
    listenForExperimentUpdate((updatedExperiment) => {
      console.log(updatedExperiment);
      if (updatedExperiment.liberateRoom) {
        if (tipo === "Water") {
          navigate(`/introductionwater/${pin}`);
        } else if (tipo === "Glucose") {
          navigate(`/introductionGlucose/${pin}`);
        }
      }
    });
  }, [pin, navigate, tipo]);

  return (
    <BaseAuth>
      <div className={styles.titlewaitingDiv}>
        <Dog />
        <h3>Aguardando o professor liberar a sala de experimento...</h3>
      </div>
    </BaseAuth>
  );
};
export default WaitingRoom;

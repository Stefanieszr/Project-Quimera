import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import Dog from "../../../components/animation/DogWaiting/Dog";
import BaseAuth from "../../../components/BaseAuth";

const WaitingRoom = () => {
  const { pin } = useParams();
  const { tipo } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tipo === "Water") navigate(`/introductionwater/${pin}`);
      else if (tipo === "Glucose") navigate(`/introductionGlucose/${pin}`);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [tipo, navigate, pin]);

  return (
    <BaseAuth>
      <div className="titlewaitingDiv">
        <Dog />
        <h3>Aguardando o professor liberar a sala de experimento...</h3>
      </div>
    </BaseAuth>
  );
};
export default WaitingRoom;

import "./styles.css";
import { Row, Col, Card, Button } from "antd";
import Cachorro from "assets/cachorro.png";
import Base from "components/BaseLayoutStudent";
import { MdOutlineBiotech } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
// import Gato1 from "../../../gato1.jpg";
// import Gato2 from "../../../gato2.jpg";
const ClinicCaseTemperature = () => {
  const { pin } = useParams();
  const navigate = useNavigate();
  const storedName = localStorage.getItem("name");
  const navigateToExperiment = () => {
    navigate(`/experimentGlucose/${pin}`);
  };
  return (
    <Base
      goTo={"/"}
      Icon={<MdOutlineBiotech />}
      goToName={"Clinical Case"}
      titlepage={`Caso clínico do experimento: Sala ${pin}`}
      nameofuser={storedName}
      children={
        <Card className="cardCCWater">
          <Row gutter={[32, 22]}>
            <Col xs={24} xl={12}>
              <h1 className="titlesCCWater">Animal: Pipoca – Quimera I </h1>
              <span className="expCCWater">
                Explicação: O animal foi levado à clínica veterinária com queixa
                de baixo ganho de peso, apesar de estar recebendo uma
                alimentação de boa qualidade. Durante a consulta, foi observada
                uma glicemia de 56 mg/dL, indicando um quadro de Diabetes
                Mellitus, condição que exige acompanhamento veterinário
                contínuo. Além disso, foram identificados cuidados necessários
                quanto à alimentação e à prática de exercícios físicos, uma vez
                que atividades extenuantes podem levar a quedas perigosas nos
                níveis de glicose.{" "}
              </span>
              <h2 className="titlesCCWater">Symptoms</h2>
              <span className="expCCWater bold">
                Os principais sintomas observados ou que podem ser associados a
                esse quadro são:
              </span>
              <ul className="itemsCCWater">
                <li>Perda de peso, mesmo com alimentação adequada</li>
                <li>Fraqueza ou cansaço</li>
                <li>Tremores ou letargia</li>
                <li>Aumento na ingestão de água</li>
                <li>Aumento na frequência urinária</li>
              </ul>
              <h2 className="titlesCCWater">Causes</h2>
              <span className="expCCWater bold">
                As principais causas associadas ao desenvolvimento do Diabetes
                Mellitus podem incluir:
              </span>
              <ul className="itemsCCWater">
                <li>
                  Disfunção ou destruição das células pancreáticas produtoras de
                  insulina
                </li>
                <li>Predisposição genética</li>
                <li>Alterações hormonais ou metabólicas</li>
                <li>Alimentação inadequada em fases anteriores</li>
                <li>Sedentarismo ou manejo incorreto da atividade física</li>
              </ul>
            </Col>
            <Col xs={24} xl={12}>
              <div className="imgcatsDiv">
                <img
                  src={Cachorro}
                  alt="Imagem de um cachorro"
                  className="imgDog"
                />
              </div>
            </Col>
          </Row>
          <div className="divButtonIniciate">
            <h1 className="titleIniciate">Pronto para iniciar o tratamento?</h1>
            <span className="descCCWater">
              A redução dos níveis de glicose no sangue desencadeará um controle
              homeostático rigoroso no organismo do animal{" "}
            </span>
            <Button
              className="btnIniciate"
              type="primary"
              onClick={navigateToExperiment}
            >
              Iniciar tratamento
            </Button>
          </div>
        </Card>
      }
    />
  );
};

export default ClinicCaseTemperature;

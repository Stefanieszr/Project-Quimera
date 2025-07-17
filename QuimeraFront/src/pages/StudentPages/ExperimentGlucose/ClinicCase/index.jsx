import { Row, Col, Card, Button } from "antd";
import { MdOutlineBiotech } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles.module.css";

import Cachorro from "@/assets/cachorro.png";
import Base from "@/components/BaseLayoutStudent";

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
      goToName={`Caso clínico do experimento: Sala ${pin}`}
      titlepage={`Animal: Pipoca – Quimera I `}
      nameofuser={storedName}
      children={
        <Card className={styles.cardCCWater}>
          <Row gutter={[32, 22]}>
            <Col xs={24} xl={12}>
              <span className={styles.expCCWater}>
                Pipoca, um cachorro, foi levado à clínica veterinária com queixa
                de baixo ganho de peso, apesar de estar recebendo uma
                alimentação de boa qualidade. Durante a consulta, foi observada
                uma glicemia de 56 mg/dL, indicando um quadro de Diabetes
                Mellitus, condição que exige acompanhamento veterinário
                contínuo. Além disso, foram identificados cuidados necessários
                quanto à alimentação e à prática de exercícios físicos, uma vez
                que atividades extenuantes podem levar a quedas perigosas nos
                níveis de glicose.{" "}
              </span>
              <h2 className={styles.titlesCCWater}>Sintomas</h2>
              <ul className={styles.itemsCCWater}>
                <li>Perda de peso, mesmo com alimentação adequada</li>
                <li>Fraqueza ou cansaço</li>
                <li>Tremores ou letargia</li>
                <li>Aumento na ingestão de água</li>
                <li>Aumento na frequência urinária</li>
              </ul>
              <h2 className={styles.titlesCCWater}>Causas</h2>
              <ul className={styles.itemsCCWater}>
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
              <div className={styles.imgDogDiv}>
                <img
                  src={Cachorro}
                  alt="Imagem de um cachorro"
                  className={styles.imgDog}
                />
              </div>
            </Col>
          </Row>
          <div className={styles.divButtonIniciate}>
            <h1 className={styles.titleIniciate}>
              Pronto para iniciar o tratamento?
            </h1>
            <span className={styles.descCCWater}>
              A redução dos níveis de glicose no sangue desencadeará um controle
              homeostático rigoroso no organismo do animal{" "}
            </span>
            <Button
              className={styles.btnIniciate}
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

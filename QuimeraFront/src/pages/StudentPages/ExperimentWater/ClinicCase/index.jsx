import { Row, Col, Card, Button } from "antd";
import { MdOutlineBiotech } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles.module.css";

import Gato1 from "@/assets/gato1.jpg";
import Gato2 from "@/assets/gato2.jpg";
import Base from "@/components/BaseLayoutStudent";

const ClinicCaseWater = () => {
  const { pin } = useParams();
  const navigate = useNavigate();
  const storedName = localStorage.getItem("name");
  const navigateToExperiment = () => {
    navigate(`/experiment/${pin}`);
  };
  return (
    <Base
      goTo={"/"}
      Icon={<MdOutlineBiotech />}
      goToName={`Caso clínico do experimento: Sala ${pin}`}
      titlepage={`Animal: Quimera I`}
      nameofuser={storedName}
      children={
        <Card className={styles.cardCCWater}>
          <Row gutter={[32, 22]}>
            <Col xs={24} xl={12}>
              <span className={styles.expCCWater}>
                Problemas renais são muito comuns em gatos. Nessa condição, um
                sintoma muito importante que devemos monitorar é a desidratação.
                Ao manter o animal em clínicas veterinárias para diversos
                procedimentos, frequentemente observamos essa situação perigosa.{" "}
              </span>

              <h2 className={`${styles.expCCWater} ${styles.bold}`}>
                Os principais sintomas de desidratação neste animal são:
              </h2>
              <ul className={styles.itemsCCWater}>
                <li>Pele enrugada</li>
                <li>Ofegar</li>
                <li>Aumento da frequência cardíaca</li>
                <li>Olhos fundos</li>
                <li>Dificuldade para urinar</li>
              </ul>
              <h2 className={`${styles.expCCWater} ${styles.bold}`}>
                As principais causas são:
              </h2>
              <ul className={styles.itemsCCWater}>
                <li>Ingestão insuficiente (por vários motivos)</li>
                <li>Vômitos e/ou diarreia</li>
                <li>Queimaduras, insolação e diversos tipos de patologias</li>
              </ul>
            </Col>
            <Col xs={24} xl={12}>
              <div className={styles.imgCatsDiv}>
                <img src={Gato1} alt="gato1" className={styles.imgCats} />
                <img src={Gato2} alt="gato2" className={styles.imgCats} />
              </div>
            </Col>
          </Row>
          <div className={styles.divButtonIniciate}>
            <h1 className={styles.titleIniciate}>
              Pronto para iniciar o tratamento?
            </h1>
            <span className={styles.descCCWater}>
              O limiar da sede desencadeará um controle homeostático rigoroso no
              corpo do animal.{" "}
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

export default ClinicCaseWater;

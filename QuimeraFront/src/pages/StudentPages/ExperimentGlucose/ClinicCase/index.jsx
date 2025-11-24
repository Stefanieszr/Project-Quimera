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
              <section className={styles.sectionIntro}>
                <p className={styles.expCCWater}>
                  Pipoca, um cão de raça labrador, foi levado à sua clínica
                  veterinária por Manuel, seu tutor que adotou há 5 meses. Este
                  animal, um macho de 8 meses de idade, com todas as vacinas em
                  dia, não apresenta o peso compatível com a idade, apesar de se
                  alimentar com rações de ótima qualidade.
                </p>
                <p className={styles.expCCWater}>
                  Durante a consulta, você realiza dosagens glicêmicas
                  plasmáticas, e os valores sempre superam 280 mg/dL. Sabendo
                  que os valores normais devem se manter entre 65 - 118 mg/dL,
                  você estabelece como diagnóstico preliminar:
                  <b> Diabetes Mellitus</b>.
                </p>
                <p className={styles.expCCWater}>
                  Esta patologia geralmente apresenta quadro crônico, portanto
                  Pipoca deverá ser acompanhados indefinidamente, sempre sob sua
                  supervisão. Controle da glicose plasmática é um dos parâmetros
                  mais bem conhecidos da Fisiologia Animal.
                </p>

                <div className={styles.sectionIntro}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Glicemia</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Pipoca</td>
                        <td>280+ (mg/dL)</td>
                      </tr>
                      <tr>
                        <td>Valor Normal</td>
                        <td>65 - 118 (mg/dL)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Seção de recomendações */}
              <section className={styles.sectionIntro}>
                <h3>Você deve orientar o tutor sobre:</h3>

                <ul className={styles.itemsCC}>
                  <li>
                    Atividades físicas realizadas pelo animal (exercícios,
                    especialmente extenuantes, e tipos de estresse físico).
                  </li>
                  <li>
                    Alimentação do cão, especialmente ingestão de carboidratos.
                  </li>
                  <li>
                    Endocrinologia relacionada, ou seja, os hormônios envolvidos
                    no controle da glicemia.
                  </li>
                </ul>
              </section>

              {/* Seção de análise e discussão */}
              <section className={styles.sectionIntro}>
                <h3>Análise e Discussão</h3>
                <p className={styles.textSpan}>
                  Discuta em grupo como os hormônios (insulina, glucagon,
                  adrenalina, cortisol) atuam na regulação da glicemia, e quais
                  medidas práticas podem ser recomendadas para esse animal,
                  considerando dieta, exercícios e manejo do estresse.
                </p>
              </section>
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

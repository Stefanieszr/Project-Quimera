import { Card, Button } from "antd";
import Base from "components/BaseLayoutStudent";
import { AiOutlineExperiment } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { MdOutlineBiotech } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles.module.css";

const IntroductionTemperature = () => {
  const { pin } = useParams();
  const navigate = useNavigate();
  const storedName = localStorage.getItem("name");
  const navigateToClinicCase = () => {
    navigate(`/cliniccaseGlucose/${pin}`);
  };
  const navigateToExperiment = () => {
    navigate(`/experimentGlucose/${pin}`);
  };
  return (
    <Base
      goTo={"/"}
      Icon={<MdOutlineBiotech />}
      goToName={"Introduction to Matter"}
      titlepage={`Introdução da matéria da termorregulação: ${pin}, `}
      nameofuser={storedName}
      children={
        <Card className={styles.cardCCWater}>
          <div className={styles.divTextsintro}>
            <h1 className={styles.titlesCCWater}>
              VARIAÇÃO DA GLICEMIA para “QUIMERA”
            </h1>
            <span className={styles.expCCWater}>
              A manutenção de parâmetros fisiológicos dentro de limites bem
              definidos é essencial para a sobrevivência dos animais. Um dos
              parâmetros mais cruciais é a concentração de glicose no sangue,
              sendo outros exemplos: temperatura corporal, concentração de água,
              eletrólitos (Na⁺, K⁺), pH, entre outros.<br></br>A glicose é a
              principal fonte de energia para a maioria das células do
              organismo. Assim, manter seus níveis dentro de uma faixa adequada
              é vital para garantir o funcionamento celular, especialmente de
              tecidos altamente dependentes de glicose, como o cérebro. O
              equilíbrio glicêmico é resultado de mecanismos biológicos que
              atuam constantemente, ajustando a captação, o armazenamento, a
              produção e o consumo de glicose de acordo com as demandas do
              organismo.
            </span>
            <h1 className={styles.titlesCCWater}>Especificando para: </h1>
            <ul className={styles.itemsCCWater}>
              <li>
                <strong>AUMENTO DA GLICEMIA (Hiperglicemia):</strong> Pode
                ocorrer após a ingestão de alimentos ricos em carboidratos,
                quando a glicose é absorvida pelo trato gastrointestinal e
                liberada na corrente sanguínea. Para evitar que os níveis se
                elevem de forma prejudicial, o pâncreas libera insulina,
                hormônio que estimula a captação de glicose pelas células
                (especialmente musculares e adiposas) e promove seu
                armazenamento na forma de glicogênio, principalmente no fígado e
                nos músculos.
              </li>
              <li>
                <strong>REDUÇÃO DA GLICEMIA (Hipoglicemia):</strong> Pode
                ocorrer em situações de jejum prolongado, exercício intenso ou
                em estados de estresse agudo. Nestes casos, o organismo ativa
                mecanismos de liberação de glicose na circulação, como a quebra
                do glicogênio hepático (glicogenólise) e a produção de glicose a
                partir de outras moléculas (gliconeogênese), processos
                estimulados por hormônios como o glucagon, adrenalina e
                cortisol.
              </li>
            </ul>
            <span className={styles.expCCWater}>
              O controle da glicemia é dinâmico e sensível a uma variedade de
              fatores internos e externos. Por exemplo, durante o exercício
              físico, o músculo consome mais glicose, levando à redução dos
              níveis sanguíneos. Para compensar, o fígado aumenta a liberação de
              glicose. Por outro lado, após uma refeição, há um aumento na
              glicemia, rapidamente regulado pela ação da insulina.
            </span>
            <br />
            <br />
            <span className={styles.expCCWater}>
              Quando os mecanismos de controle falham, surgem distúrbios
              metabólicos importantes. Na hiperglicemia crônica, como ocorre no
              diabetes mellitus, há riscos de danos aos vasos sanguíneos, nervos
              e órgãos. Na hipoglicemia severa, há risco imediato de
              comprometimento da função cerebral, podendo levar a desmaios,
              convulsões e, em casos extremos, à morte.
            </span>
            <br />
            <br />
            <span className={styles.expCCWater}>
              Além dos mecanismos fisiológicos, comportamentos também
              influenciam a regulação glicêmica, como a escolha dos alimentos,
              os horários das refeições, o nível de atividade física e até o
              controle do estresse. Esses fatores, associados às características
              de cada espécie, idade, estado fisiológico e condição ambiental,
              modulam o equilíbrio da glicose no organismo.
            </span>
          </div>
          <div className={styles.divButtonIntro}>
            <h1 className={styles.titleIntro}>
              Do you want to study the clinical case before starting or jumping
              into the experiment?
            </h1>
            <div className={styles.divButtonsIntro}>
              <Button
                className={`${styles.btnIntro} ${styles.Yellow}`}
                type="primary"
                onClick={navigateToClinicCase}
              >
                <BsBook />
                Study clinical case
              </Button>
              <span className={styles.titleIntro}> Or </span>
              <Button
                className={`${styles.btnIntro} ${styles.Orange}`}
                type="primary"
                onClick={navigateToExperiment}
              >
                <AiOutlineExperiment />
                Start the experiment
              </Button>
            </div>
          </div>
        </Card>
      }
    />
  );
};
export default IntroductionTemperature;

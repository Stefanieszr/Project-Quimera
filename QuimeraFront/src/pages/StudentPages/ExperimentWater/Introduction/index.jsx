import { Card, Button } from "antd";
import Base from "components/BaseLayoutStudent";
import { AiOutlineExperiment } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { MdOutlineBiotech } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles.module.css";

const IntroductionWater = () => {
  const { pin } = useParams();
  const navigate = useNavigate();
  const storedName = localStorage.getItem("name");
  const navigateToClinicCase = () => {
    navigate(`/cliniccasewater/${pin}`);
  };
  const navigateToExperiment = () => {
    navigate(`/experiment/${pin}`);
  };
  return (
    <Base
      goTo={"/"}
      Icon={<MdOutlineBiotech />}
      goToName={`Introdução a matéria: Sala ${pin}`}
      titlepage={`ÁGUA para “QUIMERA”`}
      nameofuser={storedName}
      children={
        <Card className={styles.cardIntroduction}>
          <div className={styles.divTextsintro}>
            <span className={styles.textSpan}>
              A manutenção de parâmetros, com limites bem definidos, é uma
              característica fundamental para a possibilidade da vida. Um dos
              mais relevantes desses parâmetros é o controle da ÁGUA no
              organismo dos animais, sendo outros exemplos: Na+, Ca++,
              Temperatura, Concentrações Hormonais, Glicose, etc. <br />O volume
              total de água de um animal permanece relativamente constante ao
              longo do dia. O ganho e a perda (diários e naturais) de água
              variam continuamente dentro desses limites mencionados
              anteriormente.
            </span>
            <h1 className={styles.titlesCC}>Especificando para: </h1>
            <ul className={styles.itemsCC}>
              <li>
                <strong>GANHO:</strong> A ingestão de água na forma líquida +
                água presente nos alimentos + água proveniente do metabolismo
                celular.
              </li>
              <li>
                <strong>PERDA:</strong> Ocorre na forma de Urina + Suor +
                Respiração + Fezes + Leite.
              </li>
            </ul>
            <span className={styles.textSpan}>
              Tanto o ganho quanto a perda de água do corpo do animal são
              contínuos, com episódios mais significativos e outros menos, por
              exemplo: ao urinar, o animal elimina uma quantidade significativa
              de água de uma só vez; por outro lado, a perda pela respiração não
              ocorre de uma só vez, mas sim continuamente, variando de acordo
              com diversos fatores ambientais. O ganho ocorre da mesma forma,
              com a ingestão de água natural em quantidade significativa de uma
              só vez, e a perda metabólica não é tão específica.
            </span>
            <br />
            <br />
            <span className={styles.textSpan}>
              Quando a perda atinge níveis significativos, mecanismos de
              ingestão são acionados, justamente pela sensação de sede, mas
              outros mecanismos concomitantes também serão promovidos, por
              exemplo, com a concentração de urina sendo acentuada, reduzindo,
              portanto, o volume de água eliminado. Essa situação será contínua
              para qualquer animal, com o desafio da DESIDRATAÇÃO ameaçando a
              vida permanentemente.
            </span>
            <br />
            <br />
            <span className={styles.textSpan}>
              Assim que a desidratação se inicia, o animal buscará água para
              beber. Isso varia dependendo de vários aspectos, como: espécie,
              estado fisiológico do indivíduo, idade, temperatura e humidade do
              ambiente, etc.
              <br />
              <br />
              <strong>Outro ponto importante</strong>, relacionada à perda de
              água, é a alteração dos eletrólitos presentes no organismo animal,
              mas este tópico será objeto de outra atividade. Os mecanismos
              relacionados ao controle de eletrólitos estão intimamente
              relacionados ao controle da água.
            </span>
          </div>
          <div className={styles.divButtonIntro}>
            <h1 className={styles.titleIntro}>
              Você quer estudar o caso clínico antes de começar ou mergulhar no
              experimento?
            </h1>
            <div className={styles.divButtonsIntro}>
              <Button
                className={`${styles.btnIntro} ${styles.Yellow}`}
                type="primary"
                onClick={navigateToClinicCase}
              >
                <BsBook />
                Estudar o caso clínico
              </Button>
              <span className={styles.titleIntro}> Or </span>
              <Button
                className={`${styles.btnIntro} ${styles.Orange}`}
                type="primary"
                onClick={navigateToExperiment}
              >
                <AiOutlineExperiment />
                Começar o experimento
              </Button>
            </div>
          </div>
        </Card>
      }
    />
  );
};
export default IntroductionWater;
